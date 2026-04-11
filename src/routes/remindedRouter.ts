import { AppContext } from "@/contex/app-context";
import RemidedController from "@/controllers/RemidedController";
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
    this.remindedRoutes.post("/", (c: AppContext) =>
      RemidedController.createReminder(c),
    );
    this.remindedRoutes.delete("/:id", (c: AppContext) =>
      RemidedController.deleteRemindedById(c),
    );
    this.remindedRoutes.put("/:id", (c: AppContext) =>
      RemidedController.updateReminded(c),
    );
    this.remindedRoutes.delete("/", (c: AppContext) =>
      RemidedController.deleteReminder(c),
    );
    this.remindedRoutes.get("/", (c: AppContext) =>
      RemidedController.getReminded(c),
    );
  }
}

export default new RemindedRoutes().remindedRoutes;
