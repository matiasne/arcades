import { IBusinessService } from "../domain/abstracts/business.service";
import { Business } from "../domain/business";
import http from "../lib/strapi-api";

export function useBusiness(): IBusinessService {
  return {
    async getInfo(businessId: string): Promise<Business> {
      try {
        const url = `/api/business`;
        const response = await http.get(url, {
          params: {
            populate: "*",
            "filters[id][$eq]": businessId,
          },
        });

        return response.data?.data[0] || null;
      } catch (error) {
        console.error("Failed to fetch research categories", error);
        return null;
      }
    },
  };
}
