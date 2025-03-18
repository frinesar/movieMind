import { formatTime } from "../helpers/timeFormatter";

describe("formatTime", () => {
  test("should format minutes correctly", () => {
    expect(formatTime(125)).toBe("2h 5m");
    expect(formatTime(60)).toBe("1h 0m");
    expect(formatTime(45)).toBe("0h 45m");
    expect(formatTime(0)).toBe("0h 0m");
    expect(formatTime(15)).toBe("0h 15m");
  });

  test("should handle edge cases", () => {
    expect(formatTime(59)).toBe("0h 59m");
    expect(formatTime(120)).toBe("2h 0m");
    expect(formatTime(1)).toBe("0h 1m");
  });

  test("should handle large numbers", () => {
    expect(formatTime(3000)).toBe("50h 0m");
  });
});
