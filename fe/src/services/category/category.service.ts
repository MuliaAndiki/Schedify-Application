import { TResponse } from "@/pkg/react-query/mutation-wrapper.type";
import { FormCreateCategory, PickCategoryID } from "@/types/form/category.form";
import AxiosClient from "@/utils/axios.client";

class CategoryApi {
  async create(payload: FormCreateCategory): Promise<TResponse<any>> {
    const res = await AxiosClient.post("/api/category/", payload);
    return res.data;
  }
  async get(): Promise<TResponse<any>> {
    const res = await AxiosClient.get("/api/category/");
    return res.data;
  }
  async getByID(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`api/category/${id}`);
    return res.data;
  }
  async delete(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete("/api/category/");
    return res.data;
  }
  async deleteById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/category/${id}`);
    return res.data;
  }
  async update(
    payload: FormCreateCategory,
    id: string
  ): Promise<TResponse<any>> {
    const res = await AxiosClient.put(`/api/category/${id}`, payload);
    return res.data;
  }
}

export default CategoryApi;
