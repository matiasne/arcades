import { ITeamService } from "../../domain/abstracts/team.service";
import { ITokenService } from "../../domain/abstracts/token.service";
import { useToken } from "../../services/token.service";

export function useDeleteToken() {
  const tokenService: ITokenService = useToken();

  const { deleteToken } = tokenService;

  return { deleteToken };
}
