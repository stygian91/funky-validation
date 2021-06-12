/**
 * External dependencies:
 */
import * as F from "funky-lib";

/**
 * Internal dependencies:
 */
import { isArray, isString, isNumber } from "../types";

const valueSatisfies = F.propSatisfies(F.__, "value");

const wrapResult = F.assoc("passes", F.__, {});

const maybeAddError = F.curry2((error, value) =>
  F.when(F.propEq("passes", false), F.assoc("error", error), value)
);

export const compareVal =
  (compFn, label) =>
  ({ value, params, name }) => {
    const param = parseInt(params[0]);
    const comp = compFn(param);
    const compSize = F.pipe(F.size, comp);

    const handle = (comparator, error) =>
      F.pipe(comparator, wrapResult, maybeAddError(error));

    return F.cond(
      [
        [
          isArray,
          handle(
            compSize,
            `The ${label} length of the array '${name}' must be ${param}.`
          ),
        ],
        [
          isString,
          handle(
            compSize,
            `The ${label} length of the string '${name}' must be ${param}.`
          ),
        ],
        [
          isNumber,
          handle(
            comp,
            `The ${label} value of the number '${name}' must be ${param}.`
          ),
        ],
        [
          F.T,
          F.always({
            passes: false,
            error: `Cannot determine ${label} value for '${name}'. The field must be of type array, string or number.`,
          }),
        ],
      ],
      value
    );
  };

export const ruleHandler = (condition, errorGen) => (args) => {
  const passes = valueSatisfies(condition, args);
  const error = errorGen(args);

  return maybeAddError(error, wrapResult(passes));
};

export const errorGen =
  (type) =>
  ({ name }) =>
    `The field '${name}' must be ${type}.`;
