import { Business } from "../business";

export abstract class IBusinessService {
  abstract getInfo(businessId: string): Promise<Business>;
}
