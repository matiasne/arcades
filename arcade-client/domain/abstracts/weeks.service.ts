import { Week } from "../week";

export abstract class IWeekService {
  abstract getCurrentSeasonWeeks(): Promise<Week[]>;
}
