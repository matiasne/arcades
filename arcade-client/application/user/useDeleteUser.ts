import { IUserService } from "../../domain/abstracts/user.service";
import { useUser } from "../../services/user.service";

export function useDeleteUser() {
  const users: IUserService = useUser();

  const { deleteUser } = users;

  return { deleteUser };
}
