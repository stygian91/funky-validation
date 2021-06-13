import { getRule } from "../../src/rules";
import { valuesDontPassHandler } from "../helpers";

test("float", () => {
  const floatRule = getRule("float");
  const handler = floatRule.handler;

  expect(handler({ value: 42.123 })).toEqual({ passes: true });
  valuesDontPassHandler(handler, [42, "", null, [], {}, false, undefined]);
});
