import { IUserService } from "../../domain/abstracts/user.service";
import { useUser } from "../../services/user.service";

export function useGetUserInfo() {
  const users: IUserService = useUser();

  const { getUserInfo } = users;

  return { getUserInfo };
}
