import { IUserService } from "../domain/abstracts/user.service";
import { User } from "../domain/user";
import http from "../lib/strapi-api";

export function useUser(): IUserService {
  return {
    async getUserInfo(): Promise<User | null> {
      const res = await http.get("/api/users");
      if (!res) return null;
      return res.data?.response;
    },
    async getScoreboard({
      leagueId,
    }: {
      leagueId: string;
    }): Promise<User[] | null> {
      return null;
    },
    async getScore({ leagueId }: { leagueId: string }): Promise<number> {
      return null;
    },
    async deleteUser(): Promise<void> {},
    async updateUser({
      id,
      name,
      username,
      isEmailPrivate,
    }: {
      id: string;
      name: string;
      username: string;
      isEmailPrivate: boolean;
    }): Promise<{ user: User | null; uniqueUsername: boolean } | null> {
      return null;
    },
    async resetPassword({ email }: { email: string }): Promise<boolean> {
      return null;
    },
  };
}
