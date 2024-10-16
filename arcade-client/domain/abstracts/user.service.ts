import { User } from "../user";

export abstract class IUserService {
  abstract getUserInfo(): Promise<User>;
  abstract getScoreboard({ leagueId }: { leagueId: string }): Promise<User[]>;
  abstract getScore({ leagueId }: { leagueId: string }): Promise<number>;
  abstract deleteUser(): Promise<void>;
  abstract updateUser({
    id,
    name,
    username,
  }: {
    id: string;
    name: string;
    username: string;
    isEmailPrivate: boolean;
  }): Promise<{ user: User | null; uniqueUsername: boolean } | null>;
  abstract resetPassword({ email }: { email: string }): Promise<boolean>;
}
