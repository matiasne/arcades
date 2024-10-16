import { Machine } from "../machine";

export abstract class IMachineService {
  abstract getInfo(machineId: string): Promise<Machine>;
}
