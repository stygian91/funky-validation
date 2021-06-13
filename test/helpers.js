import * as F from "funky-lib";

export const doesntPass = F.pipe(
  F.of,
  F.both(F.hasPath("error"), F.propEq("passes", false))
);

export const handlerDoesntPass = F.curry((handler, value) =>
  doesntPass(handler({ value }))
);

export const valuesDontPassHandler = (handler, values) => {
  const currHandlerDoesntPass = handlerDoesntPass(handler);
  F.forEach((value) => {
    expect(currHandlerDoesntPass(value)).toEqual(true);
  }, values);
}
