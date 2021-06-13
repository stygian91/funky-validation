
import { getRule } from "../../src/rules";
import { valuesDontPassHandler } from "../helpers";

test("numeric rule", () => {
  const numericRule = getRule('numeric');
  const handler = numericRule.handler;

  expect(handler({ value: 42 })).toEqual({ passes: true });
  expect(handler({ value: "42" })).toEqual({ passes: true });
  expect(handler({ value: 42.123 })).toEqual({ passes: true });
  expect(handler({ value: "42.123" })).toEqual({ passes: true });
  valuesDontPassHandler(handler, ['', [], {}, null, false, undefined]);
});
