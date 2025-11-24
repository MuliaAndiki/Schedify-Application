import { AppContext } from "@/contex/app-context";
import TaskController from "@/controllers/TaskController";
import { verifyToken } from "@/middlewares/auth";
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
    this.taskRouter.post(
      "/:id",
      (c: AppContext) => TaskController.createTask(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.taskRouter.get("/", (c: AppContext) => TaskController.getTask(c), {
      beforeHandle: [verifyToken().beforeHandle],
    });
    this.taskRouter.get(
      "/:id",
      (c: AppContext) => TaskController.getTaskByID(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.taskRouter.delete(
      "/",
      (c: AppContext) => TaskController.deleteTask(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.taskRouter.delete(
      "/:id",
      (c: AppContext) => TaskController.deleteTaskByID(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.taskRouter.put(
      "/:id",
      (c: AppContext) => TaskController.updateTask(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.taskRouter.post(
      "/done/:id",
      (c: AppContext) => TaskController.doneTask(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
  }
}

export default new TaskRouter().taskRouter;
