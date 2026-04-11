import { AppContext } from "@/contex/app-context";
import { JwtPayload } from "@/types/auth.types";
import { PickCategoryID } from "@/types/category.types";
import { PickCreateTask, PickTaskID } from "@/types/task.types";
import prisma from "prisma/client";

class TaskController {
  public async createTask(c: AppContext) {
    try {
      const tas = c.body as PickCreateTask;
      const jwtUser = c.user as JwtPayload;
      const cate = c.params as PickCategoryID;

      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!cate.id) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }
      if (!tas.todo || !tas.endAt) {
        return c.json?.(
          {
            status: 400,
            message: "body is required",
          },
          400
        );
      }

      const task = await prisma.task.create({
        data: {
          todo: tas.todo,
          endAt: tas.endAt,
          userId: jwtUser.id,
          categoryId: cate.id,
        },
      });
      if (!task) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      } else {
        return c.json?.(
          {
            status: 201,
            message: "successfully create task",
            data: task,
          },
          201
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async getTask(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      const task = await prisma.task.findMany({
        where: {
          userId: jwtUser.id,
        },
        include: {
          category: {},
        },
      });
      if (!task) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      } else {
        return c.json?.(
          {
            status: 200,
            message: "succesfully get Task",
            data: task,
          },
          200
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async getTaskByID(c: AppContext) {
    try {
      const tas = c.params as PickTaskID;
      const jwtUser = c.user as JwtPayload;

      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!tas.id) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }
      const task = await prisma.task.findUnique({
        where: {
          id: tas.id,
          userId: jwtUser.id,
        },
      });
      if (!task) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      } else {
        return c.json?.(
          {
            status: 200,
            message: "succesfully get task by id",
            data: task,
          },
          200
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async deleteTask(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      const task = await prisma.task.deleteMany({
        where: {
          userId: jwtUser.id,
        },
      });
      if (!task) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      } else {
        return c.json?.(
          {
            status: 200,
            message: "succesfully delete task",
            data: task,
          },
          200
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async deleteTaskByID(c: AppContext) {
    try {
      const tas = c.params as PickTaskID;
      const jwtUser = c.user as JwtPayload;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!tas) {
        return c.json?.(
          {
            statu: 400,
            message: "params is required",
          },
          400
        );
      }
      const task = await prisma.task.delete({
        where: {
          id: tas.id,
          userId: jwtUser.id,
        },
      });
      if (!task) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      } else {
        return c.json?.(
          {
            status: 200,
            message: "succesfully delete task by id",
            data: task,
          },
          200
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async updateTask(c: AppContext) {
    try {
      const tasBody = c.body as PickCreateTask;
      const jwtUser = c.user as JwtPayload;
      const tasParams = c.params as PickTaskID;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!tasParams) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }

      const task = await prisma.task.update({
        where: {
          id: tasParams.id,
          userId: jwtUser.id,
        },
        data: {
          ...tasBody,
        },
      });
      if (!task) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      } else {
        return c.json?.({
          status: 200,
          message: "succesfully update Task",
          data: task,
        });
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async doneTask(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const tasParams = c.params as PickTaskID;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!tasParams) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }
      const task = await prisma.task.update({
        where: {
          id: tasParams.id,
          userId: jwtUser.id,
        },
        data: {
          isDone: true,
        },
      });

      if (!task) {
        return c.json?.(
          {
            status: 403,
            message: "unxpred",
          },
          403
        );
      } else {
        return c.json?.(
          {
            status: 200,
            message: "task done",
            data: task,
          },
          200
        );
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          data: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
}

export default new TaskController();
