import { handlerDoesntPass } from "./helpers";

test("handlerDoesntPass", () => {
  const handler = ({ value }) => value ? { passes: true } : { passes: false, error: "some error" };
  const handler2 = ({ value }) => value ? { passes: true } : { passes: false };

  expect(handlerDoesntPass(handler, true)).toEqual(false);
  expect(handlerDoesntPass(handler, false)).toEqual(true);

  expect(handlerDoesntPass(handler2, true)).toEqual(false);
  expect(handlerDoesntPass(handler2, false)).toEqual(false);
});
