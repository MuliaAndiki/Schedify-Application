import { AppContext } from "@/contex/app-context";
import RemidedController from "@/controllers/RemidedController";
import { verifyToken } from "@/middlewares/auth";
import Elysia from "elysia";

class RemindedRoutes {
  public remindedRoutes;
  constructor() {
    this.remindedRoutes = new Elysia({ prefix: "/reminded" }).derive(() => ({
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
    this.remindedRoutes.post(
      "/",
      (c: AppContext) => RemidedController.createReminder(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.remindedRoutes.delete(
      "/:id",
      (c: AppContext) => RemidedController.deleteRemindedById(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.remindedRoutes.put(
      "/:id",
      (c: AppContext) => RemidedController.updateReminded(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.remindedRoutes.delete(
      "/",
      (c: AppContext) => RemidedController.deleteReminder(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
    this.remindedRoutes.get(
      "/",
      (c: AppContext) => RemidedController.getReminded(c),
      {
        beforeHandle: [verifyToken().beforeHandle],
      }
    );
  }
}

export default new RemindedRoutes().remindedRoutes;
