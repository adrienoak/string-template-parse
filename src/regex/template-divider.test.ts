import { describe, expect, it } from "vitest";
import { makeTemplateDivider } from "./template-divider";

describe("template divider", () => {
  it("should give curlies if incorrect input", () => {
    const input = "Dani";

    // @ts-expect-error
    const result = makeTemplateDivider(input);

    expect(result).toEqual(["{", "}"]);
  });

  it("should give curlies if no divider is set", () => {
    const result = makeTemplateDivider();

    expect(result).toEqual(["{", "}"]);
  });

  it("should give curlies if input is curlies", () => {
    const result = makeTemplateDivider("curlies");

    expect(result).toEqual(["{", "}"]);
  });

  it("should tive escaped parens when divider is parens", () => {
    const result = makeTemplateDivider("parens");

    expect(result).toEqual(["\\(", "\\)"]);
  });

  it("should tive escaped parens when divider is parens", () => {
    const result = makeTemplateDivider("square");

    expect(result).toEqual(["\\[", "\\]"]);
  });
});
