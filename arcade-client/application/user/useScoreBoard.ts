import { IUserScoreService } from "../../domain/abstracts/user-score.service";
import { useUserScore } from "../../services/user-score.service";

export function useScoreBoard() {
  const userScore: IUserScoreService = useUserScore();

  const { getScoreBoard } = userScore;

  return { getScoreBoard };
}
