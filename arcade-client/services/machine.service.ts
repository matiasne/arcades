import { IMachineService } from "../domain/abstracts/machine.service";
import { Machine } from "../domain/machine";
import http from "../lib/strapi-api";

export function useMachine(): IMachineService {
  return {
    async getInfo(machineId: string): Promise<Machine> {
      try {
        const url = `/api/machine`;
        const response = await http.get(url, {
          params: {
            populate: "*",
            "filters[id][$eq]": machineId,
          },
        });

        return response.data?.data[0] || null;
      } catch (error) {
        console.error("Failed to fetch research machine", error);
        return null;
      }
    },
  };
}
