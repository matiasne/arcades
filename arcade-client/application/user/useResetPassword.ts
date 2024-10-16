import { IUserService } from "../../domain/abstracts/user.service";
import { useUser } from "../../services/user.service";

export function useResetPassword() {
  const users: IUserService = useUser();

  const { resetPassword } = users;

  return { resetPassword };
}
