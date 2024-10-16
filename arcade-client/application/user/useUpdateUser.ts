import { IUserService } from "../../domain/abstracts/user.service";
import { useUser } from "../../services/user.service";

export function useUpdateUser() {
  const users: IUserService = useUser();

  const { updateUser } = users;

  return { updateUser };
}
