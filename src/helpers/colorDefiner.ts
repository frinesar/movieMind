export default function defineColor(points: number): string {
  return points >= 8 ? "excellent" : points >= 6 ? "average" : "bad";
}
