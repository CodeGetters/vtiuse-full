import { describe, expect, it } from "vitest";

describe("tests", () => {
  it("should works", () => {
    expect(1 + 1).toEqual(2);
  });
});

describe("test", () => {
  it("1+1", () => {
    expect(1 + 1).toBe(2);
  });
});
