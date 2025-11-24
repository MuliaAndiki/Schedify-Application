import { TResponse } from "@/pkg/react-query/mutation-wrapper.type";
import {
  FormCreateTask,
  PickTaskCategoryId,
  PickTaskId,
} from "@/types/form/task.form";
import AxiosClient from "@/utils/axios.client";

class TaskApi {
  async createTask(
    payload: FormCreateTask,
    id: string
  ): Promise<TResponse<any>> {
    const res = await AxiosClient.post(`/api/task/${id}`, payload);
    return res.data;
  }
  async getTask(): Promise<TResponse<any>> {
    const res = await AxiosClient.get("/api/task/");
    return res.data;
  }
  async getTaskById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.get(`/api/task/${id}`);
    return res.data;
  }
  async deleteTask(): Promise<TResponse<any>> {
    const res = await AxiosClient.delete("/api/task/");
    return res.data;
  }
  async deleteTaskById(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.delete(`/api/task/${id}`);
    return res.data;
  }
  async updateTask(
    payload: FormCreateTask,
    id: string
  ): Promise<TResponse<any>> {
    const res = AxiosClient.put(`/api/task/${id}`, payload);
    return (await res).data;
  }
  async doneTask(id: string): Promise<TResponse<any>> {
    const res = await AxiosClient.post(`/api/task/done/${id}`);
    return res.data;
  }
}

export default TaskApi;
