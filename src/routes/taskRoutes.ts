import { AppContext } from "@/contex/app-context";
import TaskController from "@/controllers/TaskController";
import Elysia from "elysia";

class TaskRouter {
  public taskRouter;
  constructor() {
    this.taskRouter = new Elysia({ prefix: "/task" }).derive(() => ({
      json(data: any, status = 200) {
        return new Response(JSON.stringify(data), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      },
    }));
    this.routes();
  }
  private routes() {
    this.taskRouter.post("/:id", (c: AppContext) =>
      TaskController.createTask(c),
    );
    this.taskRouter.get("/", (c: AppContext) => TaskController.getTask(c));
    this.taskRouter.get("/:id", (c: AppContext) =>
      TaskController.getTaskByID(c),
    );
    this.taskRouter.delete("/", (c: AppContext) =>
      TaskController.deleteTask(c),
    );
    this.taskRouter.delete("/:id", (c: AppContext) =>
      TaskController.deleteTaskByID(c),
    );
    this.taskRouter.put("/:id", (c: AppContext) =>
      TaskController.updateTask(c),
    );
    this.taskRouter.post("/done/:id", (c: AppContext) =>
      TaskController.doneTask(c),
    );
  }
}

export default new TaskRouter().taskRouter;
