export const isInt = (maybeInt) => Number.isInteger(maybeInt);

export const isFloat = (maybeFloat) => isNumber(maybeFloat) && !isInt(maybeFloat);

export const isNumber = (maybeNum) => typeof maybeNum === "number";

export const isNumeric = (maybeNum) => !isNaN(parseFloat(maybeNum));

export const isString = (maybeStr) => typeof maybeStr === "string";

export const isObject = (maybeObj) => typeof maybeObj === "object";

export const isArray = (maybeArr) => Array.isArray(maybeArr);
