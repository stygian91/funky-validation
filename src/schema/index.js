/**
 * External dependencies:
 */
import * as F from "funky-lib";

/**
 * Internal dependencies:
 */
import { getRule } from "../rules";
import { isString } from "../types";

const splitRules = F.pipe(F.split("|"), F.filter(F.complement(F.isEmpty)));

const parseRules = (rules) => {
  if (!isString(rules)) {
    return new F.Left("The rules should be defined as a string.");
  }

  const ruleArr = F.map(parseRule, splitRules(rules));
  const invalidRule = F.find(F.propSatisfies(F.isNil, "handler"), ruleArr);
  if (invalidRule) {
    return new F.Left(`No handler found for rule ${invalidRule.name}.`);
  }

  return F.Either.of(ruleArr);
};

const parseRule = (rule) => {
  let [name, params] = F.split(":", rule);
  const { relation, handler } = getRule(name);

  params = F.split(",", F.defaultTo("", params));

  return {
    name,
    handler,
    params,
    relation,
  };
};

export const parseSchema = (schema) => {
  const ruleObj = F.map((rules) => parseRules(rules).join(), schema);
  const foundLeft = F.find((rules) => rules instanceof F.Left, ruleObj);
  return F.isNil(foundLeft) ? F.Either.of(ruleObj) : foundLeft;
};

export const runSchema = (parsedSchema, data) =>
  F.map((rules, dataPath) => {
    const ruleGroups = F.groupBy(F.prop("relation"), rules);
    const getGroup = F.pathOr([], F.__, ruleGroups);
    const andRules = getGroup("and");
    const orRules = getGroup("or");
    const value = F.path(dataPath, data);

    const rulesPass = (rules, logicFn, initialValue) =>
      F.reduce(
        (acc, rule) => {
          const res = rule.handler({
            name: dataPath,
            value,
            params: rule.params,
          });

          return F.evolve(
            {
              passes: logicFn(F.__, res.passes),
              error: F.when(
                (error) =>
                  F.isEmpty(error) &&
                  !F.isNil(res.error) &&
                  !F.isEmpty(res.error),
                F.always(res.error)
              ),
            },
            acc
          );
        },
        { passes: initialValue, error: "" },
        rules
      );

    const orsPass = rulesPass(orRules, F.or, false);
    const andsPass = rulesPass(andRules, F.and, true);
    const passes = F.or(orsPass.passes, andsPass.passes);

    return {
      passes,
      error: F.when(
        F.always(passes),
        F.always(""),
        F.propOr("", "error", andsPass)
      ),
    };
  }, parsedSchema);
