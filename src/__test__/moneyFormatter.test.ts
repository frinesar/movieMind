import { formatMoney } from "../helpers/moneyFormatter";

describe("formatMoney", () => {
  test("should format valid numbers correctly", () => {
    expect(formatMoney(1000)).toBe("1 000");
    expect(formatMoney(1000000)).toBe("1 000 000");
    expect(formatMoney(123456789)).toBe("123 456 789");
  });

  test("should format valid string numbers", () => {
    expect(formatMoney("1000")).toBe("1 000");
    expect(formatMoney("5000000")).toBe("5 000 000");
    expect(formatMoney("987654321")).toBe("987 654 321");
  });

  test("should remove leading zeros", () => {
    expect(formatMoney("0001000")).toBe("1 000");
    expect(formatMoney("00000123")).toBe("123");
    expect(formatMoney("0000000")).toBe("0");
  });

  test("should handle edge cases", () => {
    expect(formatMoney(0)).toBe("0");
    expect(formatMoney(9)).toBe("9");
    expect(formatMoney(99)).toBe("99");
    expect(formatMoney(999)).toBe("999");
  });

  test("should throw error for invalid inputs", () => {
    expect(() => formatMoney("abc")).toThrow(
      "Invalid input: must be a valid number"
    );
    expect(() => formatMoney("")).toThrow(
      "Invalid input: must be a valid number"
    );
    expect(() => formatMoney(null as any)).toThrow(
      "Invalid input: must be a valid number"
    );
    expect(() => formatMoney(undefined as any)).toThrow(
      "Invalid input: must be a valid number"
    );
  });
});
