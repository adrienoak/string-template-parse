import { describe, expect, it } from "vitest";
import { noBehindEager } from "./no-behind-eager";
import { makeTemplateDivider } from "./template-divider";

describe("nothing behind", () => {
  it("should work without passing curlies", () => {
    const input = makeTemplateDivider();

    const result = noBehindEager(input);

    expect(result).toEqual([`\(?<!{)`, `\(?!})`]);
  });

  it("should work with bad input", () => {
    const input = makeTemplateDivider();

    // @ts-expect-error
    const result = noBehindEager(input, "Banana");

    expect(result).toEqual([`\(?<!{)`, `\(?!})`]);
  });

  it("should work with curlies", () => {
    const input = makeTemplateDivider();

    const result = noBehindEager(input, "curlies");

    expect(result).toEqual([`\(?<!{)`, `\(?!})`]);
  });

  it("should work with parens", () => {
    const input = makeTemplateDivider("parens");

    const result = noBehindEager(input, "parens");

    expect(result).toEqual([`\(?<!\\()`, `\(?!\\))`]);
  });

  it("should work with square", () => {
    const input = makeTemplateDivider("square");

    const result = noBehindEager(input, "square");

    expect(result).toEqual([`\(?<!\\[)`, `\(?!\\])`]);
  });
});
