export interface IAccessToken {
  token: string;
  status: "idle" | "pending" | "fulfilled" | "rejected";
}
