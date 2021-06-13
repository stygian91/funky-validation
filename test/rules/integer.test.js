import { getRule } from "../../src/rules";
import { valuesDontPassHandler } from "../helpers";

test("integer rule", () => {
  const integerRule = getRule('integer');
  const handler = integerRule.handler;

  expect(handler({ value: 42 })).toEqual({ passes: true });
  valuesDontPassHandler(handler, [42.123, '', [], {}, null, false, undefined]);
});
