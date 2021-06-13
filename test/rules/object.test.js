import { getRule } from "../../src/rules";
import { valuesDontPassHandler } from "../helpers";

test("object rule", () => {
  const objectRule = getRule('object');
  const handler = objectRule.handler;

  expect(handler({ value: {} })).toEqual({ passes: true });
  expect(handler({ value: [] })).toEqual({ passes: true });
  expect(handler({ value: null })).toEqual({ passes: true });
  valuesDontPassHandler(handler, [42.123, 42, '', false, undefined]);
});
