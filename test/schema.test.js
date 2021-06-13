import { parseSchema } from "../src/schema";
import { Right } from "funky-lib";

test("schema", () => {
  const parsed = parseSchema({ "query": "string" });
  expect(parsed instanceof Right).toEqual(true);
});
