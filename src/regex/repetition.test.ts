import { describe, expect, it } from "vitest";
import { makeRepetition } from "./repetition";

describe.only("repetition regex", () => {
  it("should work correctly given the curly braces with custom number", () => {
    const inputWithCurlies = ["{", "}"];

    const result = makeRepetition(inputWithCurlies, 3);

    expect(result).toEqual(["{[ \t]*{[ \t]*{[ \t]*", "[ \t]*}[ \t]*}[ \t]*}"]);
  });

  it("should work correctly given the curly braces with custom number", () => {
    const inputWithCurlies = ["{", "}"];

    const result = makeRepetition(inputWithCurlies);

    expect(result).toEqual(["{[ \t]*{[ \t]*", "[ \t]*}[ \t]*}"]);
  });

  it("should work correctly given the parens with custom number", () => {
    const inputWithCurlies = ["\\(", "\\)"];

    const result = makeRepetition(inputWithCurlies, 3);

    expect(result).toEqual([
      "\\([ \t]*\\([ \t]*\\([ \t]*",
      "[ \t]*\\)[ \t]*\\)[ \t]*\\)",
    ]);
  });

  it("should work correctly given the parens with custom number", () => {
    const inputWithCurlies = ["\\(", "\\)"];

    const result = makeRepetition(inputWithCurlies);

    expect(result).toEqual(["\\([ \t]*\\([ \t]*", "[ \t]*\\)[ \t]*\\)"]);
  });

  it("should work correctly given the square brackets with custom number", () => {
    const inputWithCurlies = ["\\[", "\\]"];

    const result = makeRepetition(inputWithCurlies, 3);

    expect(result).toEqual([
      "\\[[ \t]*\\[[ \t]*\\[[ \t]*",
      "[ \t]*\\][ \t]*\\][ \t]*\\]",
    ]);
  });

  it("should work correctly given the square brackets with custom number", () => {
    const inputWithCurlies = ["\\[", "\\]"];

    const result = makeRepetition(inputWithCurlies);

    expect(result).toEqual(["\\[[ \t]*\\[[ \t]*", "[ \t]*\\][ \t]*\\]"]);
  });
});
