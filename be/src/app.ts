import Elysia from "elysia";
import cors from "@elysiajs/cors";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import taskRoutes from "./routes/taskRoutes";
import remindedRouter from "./routes/remindedRouter";

class App {
  public app: Elysia;

  constructor() {
    this.app = new Elysia();
    this.middlewares();
    this.routes();
  }
  private routes(): void {
    this.app.get("/", () => "Hello Elysia! Bun js");
  }
  private middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.group("/api", (api) =>
      api
        .use(authRoutes)
        .use(categoryRoutes)
        .use(taskRoutes)
        .use(remindedRouter)
    );
  }
}

export default new App().app;
