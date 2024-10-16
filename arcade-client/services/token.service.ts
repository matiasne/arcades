import { ITokenService } from "../domain/abstracts/token.service";

export function useToken(): ITokenService {
  return {
    async deleteToken(): Promise<any> {
      localStorage.removeItem("token");
    },
    async setToken(token: string): Promise<any> {
      localStorage.setItem("token", token);
      return token;
    },
    async getToken(): Promise<any> {
      return localStorage.getItem("token");
    },
  };
}
