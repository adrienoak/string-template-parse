import { describe, expect, it } from "vitest";
import { makeRepetition } from "./repetition";
import { makeSearch } from "./search";
import { makeTemplateDivider } from "./template-divider";

describe("make search", () => {
  it("should work with parens", () => {
    const divider = makeTemplateDivider("parens");
    const repetition = makeRepetition(divider);

    const result = makeSearch(repetition);

    expect(result.source).toBe(`${repetition[0]}(.*?)${repetition[1]}`);
  });

  it("should work with parens", () => {
    const divider = makeTemplateDivider("square");
    const repetition = makeRepetition(divider);

    const result = makeSearch(repetition);

    expect(result.source).toBe(`${repetition[0]}(.*?)${repetition[1]}`);
  });

  it("should work with parens", () => {
    const divider = makeTemplateDivider();
    const repetition = makeRepetition(divider);

    const result = makeSearch(repetition);

    expect(result.source).toBe(`${repetition[0]}(.*?)${repetition[1]}`);
  });

  it("should work with parens", () => {
    const divider = makeTemplateDivider("curlies");
    const repetition = makeRepetition(divider);

    const result = makeSearch(repetition);

    expect(result.source).toBe(`${repetition[0]}(.*?)${repetition[1]}`);
  });

  it("should work with parens", () => {
    //    @ts-expect-error
    const divider = makeTemplateDivider("l;askdghfsdlkghj");
    const repetition = makeRepetition(divider);

    const result = makeSearch(repetition);

    expect(result.source).toBe(`${repetition[0]}(.*?)${repetition[1]}`);
  });
});
