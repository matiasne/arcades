import { IBusinessService } from "../../domain/abstracts/business.service";
import { useBusisness } from "../../services/business.service";

export function useGetInfoBusiness() {
  const business: IBusinessService = useBusisness();

  const { getInfo } = business;

  return { getInfo };
}
