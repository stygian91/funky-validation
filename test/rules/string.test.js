import { getRule } from "../../src/rules";
import { valuesDontPassHandler } from "../helpers";

test("string rule", () => {
  const stringRule = getRule("string");
  const handler = stringRule.handler;

  expect(handler({ value: "a string" })).toEqual({ passes: true });
  valuesDontPassHandler(handler, [null, {}, [], 42, false, undefined])
});
