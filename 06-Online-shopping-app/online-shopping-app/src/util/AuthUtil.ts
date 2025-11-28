export class AuthUtil {
  private static TOKEN_KEY =
    import.meta.env.VITE_AUTH_TOKEN_KEY || "auth_token";

  public static isLoggedIn(): boolean {
    return !!localStorage.getItem(AuthUtil.TOKEN_KEY);
  }

  public static getToken(): string {
    return localStorage.getItem(AuthUtil.TOKEN_KEY) || "";
  }

  public static logout(): void {
    localStorage.removeItem(AuthUtil.TOKEN_KEY);
  }
}
