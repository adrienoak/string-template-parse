import fc from "fast-check";
import { afterAll, describe, expect, it } from "vitest";
import { contentParser } from "./main";

const RE_WHITESPACE = /\s/;

const onlyChars = fc
  .string({ minLength: 1 })
  .filter((t) => /^[A-Za-z]*$/.test(t));

describe("content parser", () => {
  it("whould return exactly the same thing if no map is passed", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {};

        const input = `Hello, { { { ${str}}}}`;

        expect(contentParser(input, map, { number: 3 })).toBe(input);
      })
    );
  });

  it("should work with spaces between brackets and var", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, { { {   ${str}    } 	}  }`;

        expect(contentParser(input, map, { number: 3 })).toBe("Hello, world");
      })
    );
  });

  it("should work with only two spaces", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, { { {${str}} 	}  }`;

        expect(contentParser(input, map, { number: 3 })).toBe("Hello, world");
      })
    );
  });

  it("should work with only two spaces and empty spaces", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, { { {${str}} 	\n}  }`;

        expect(contentParser(input, map, { number: 3 })).toBe(input);
      })
    );
  });

  it("should ignore if different divider is used", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, [ [ [${str}] 	\n]  ]`;

        expect(
          contentParser(input, map, { number: 3, divider: "parens" })
        ).toBe(input);
      })
    );
  });

  it("should not catch stranded values", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, { {${str}}  }`;

        expect(contentParser(input, map)).toBe(`Hello, world`);
      })
    );
  });

  it("should work with only square brackets", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, [ [ [${str}] 	]  ]`;

        expect(
          contentParser(input, map, { number: 3, divider: "square" })
        ).toBe("Hello, world");
      })
    );
  });

  it("should work with only parens", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, ( ( (${str}) 	)  )`;

        expect(
          contentParser(input, map, { number: 3, divider: "parens" })
        ).toBe("Hello, world");
      })
    );
  });

  it("should work with only parens", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `Hello, (((${str})))`;

        expect(
          contentParser(input, map, { divider: "parens", eager: false })
        ).toBe(`Hello, (world)`);
      })
    );
  });

  it("should remove all occurences", () => {
    fc.assert(
      fc.property(onlyChars, (str) => {
        const map = {
          [str]: "world",
        };

        const input = `{{${str}}}-{{${str}}}`;

        expect(contentParser(input, map)).toBe(`world-world`);
      })
    );
  });

  // it("should remove only the last occurence", () => {
  //   // var str = "tro.lo.lo.lo.lo.lo.zip",
  //   //   replacement = "@2x.";
  //   // str = str.replace(/\.([^.]*)$/, replacement + "($1)");
  //   // const str2 = "{{ola}}-{{ola}}";
  //   // console.log("HERE: ", str2.replace(/{{ola}}([^.]*)$/g, "$1"));
  //   // console.log("str:", str);
  //   let myRegex = /({{hello}})(?!.*\1)/;
  //   let matches =
  //     "the {{hello}} is {{total}}. you get it? the {{total}} is -> total";
  //   console.log(matches.replace(myRegex, "12"));

  //   // fc.assert(
  //   //   fc.property(onlyChars, (str) => {
  //   //     const map = {
  //   //       [str]: "world",
  //   //     };

  //   //     const input = `{{${str}}}-{{${str}}}`;
  //   //     // const reg = new RegExp(`{{${str}}}(?=[^{{${str}}}])`);
  //   //     // console.log("reg:", reg);
  //   //     // console.log(input.replace(reg, "AAAAAAAH"));
  //   //     const str2 = "tro.lo.lo.lo.lo.zip";
  //   //     const reg = /\.([^.]+)$/;
  //   //     // const reg = /\.(?=[^.]*$)/;
  //   //     console.log(str2.replace(reg, "@2x.$1"));
  //   //     // str = str.replace(/\.(?=[^.]*$)/, "@2x.");
  //   //     // Matches a literal dot and then asserts ((?=) is positive lookahead) that no other character up to the end of the string is a dot. The replacement should include the one dot that was matched, unless you want to remove it.

  //   //     expect(contentParser(input, map, { onlyLast: true })).toBe(
  //   //       `{{${str}}}-world`
  //   //     );
  //   //   })
  //   // );
  // });
});
