export class UserUtil {
  private static storageKey: string =
    import.meta.env.VITE_STORAGE_KEY ?? "token"; // fallback

  public static isAuthenticated(): boolean {
    return !!sessionStorage.getItem(UserUtil.storageKey);
  }

  public static getStorageKey(): string | null {
    return sessionStorage.getItem(UserUtil.storageKey);
  }

  public static removeToken(): void {
    sessionStorage.removeItem(UserUtil.storageKey);
  }

  public static saveToken(token: string): void {
    sessionStorage.setItem(UserUtil.storageKey, token);
  }
}
