
import { getRule } from "../../src/rules";
import { valuesDontPassHandler } from "../helpers";

test("array rule", () => {
  const arrayRule = getRule("array");
  const handler = arrayRule.handler;

  expect(handler({ value: [] })).toEqual({ passes: true });
  expect(handler({ value: [1, 2, 3] })).toEqual({ passes: true });
  valuesDontPassHandler(handler, [42, 42.123, "", null, {}, false, undefined]);
});
