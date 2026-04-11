import { AppContext } from "@/contex/app-context";
import CategoryController from "@/controllers/CategoryController";
import Elysia from "elysia";

class CategoryRoutes {
  public categoryRoutes;

  constructor() {
    this.categoryRoutes = new Elysia({ prefix: "/category" }).derive(() => ({
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
    this.categoryRoutes.post("/", (c: AppContext) =>
      CategoryController.createCategory(c),
    );
    this.categoryRoutes.get("/", (c: AppContext) =>
      CategoryController.getCategory(c),
    );
    this.categoryRoutes.get("/:id", (c: AppContext) =>
      CategoryController.getCategoryById(c),
    );
    this.categoryRoutes.delete("/", (c: AppContext) =>
      CategoryController.deleteCategory(c),
    );
    this.categoryRoutes.delete("/:id", (c: AppContext) =>
      CategoryController.deleteCategoryById(c),
    );
    this.categoryRoutes.put("/:id", (c: AppContext) =>
      CategoryController.updateCategory(c),
    );
  }
}

export default new CategoryRoutes().categoryRoutes;
