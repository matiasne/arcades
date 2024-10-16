import { IUserService } from "../../domain/abstracts/user.service";
import { useUser } from "../../services/user.service";

export function useScore() {
  const users: IUserService = useUser();

  const { getScore } = users;

  return { getScore };
}
