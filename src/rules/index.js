/**
 * External dependencies:
 */
import * as F from "funky-lib";

/**
 * Internal dependencies:
 */
import { compareVal, ruleHandler, errorGen } from "./helpers";
import { isNumeric, isObject, isArray, isInt, isFloat, isString } from "../types";

export const getRules = () => ({
  min: {
    handler: compareVal(F.gte, "minimum"),
    relation: "and",
  },

  max: {
    handler: compareVal(F.lte, "maximum"),
    relation: "and",
  },

  numeric: {
    handler: ruleHandler(isNumeric, errorGen("numeric")),
    relation: "and",
  },

  object: {
    handler: ruleHandler(isObject, errorGen("an object")),
    relation: "and",
  },

  array: {
    handler: ruleHandler(isArray, errorGen("an array")),
    relation: "and",
  },

  integer: {
    handler: ruleHandler(isInt, errorGen("an integer")),
    relation: "and",
  },

  float: {
    handler: ruleHandler(isFloat, errorGen("a float")),
    relation: "and",
  },

  string: {
    handler: ruleHandler(isString, errorGen("a string")),
    relation: "and",
  },

  nullable: {
    handler: ruleHandler(F.isNil, errorGen("null")),
    relation: "or",
  },
});

export const getRule = (name) => F.path(name, getRules());
