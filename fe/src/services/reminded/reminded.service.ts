import { TResponse } from "@/pkg/react-query/mutation-wrapper.type";
import { FormCreateReminder } from "@/types/form/reminded.form";
import AxiosClient from "@/utils/axios.client";

class RemindedApi {
  async create(payload: FormCreateReminder): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/reminded/", payload);
    return res.data;
  }
  async deleteById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/reminded/${id}`);
    return res.data;
  }
  async update(
    payload: FormCreateReminder,
    id: string
  ): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/reminded/${id}`, payload);
    return res.data;
  }
  async delete(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete("/api/reminded/");
    return res.data;
  }
  async get(): Promise<TResponse<any>> {
    const res = await AxiosClient.get("/api/reminded/");
    return res.data;
  }
}

export default RemindedApi;
