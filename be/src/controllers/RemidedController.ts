import { AppContext } from "@/contex/app-context";
import { JwtPayload } from "@/types/auth.types";
import { PIckCreateReminder, PickReminderID } from "@/types/reminder.type";
import { PickTaskID } from "@/types/task.types";
import prisma from "prisma/client";

class RemindedController {
  public async createReminder(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const remind = c.body as PIckCreateReminder;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!remind.reminded) {
        return c.json?.(
          {
            status: 400,
            message: "body is required",
          },
          400
        );
      }

      const task = await prisma.task.findUnique({
        where: {
          id: remind.taskID,
        },
      });

      let newReminder = task?.endAt;
      if (!newReminder) {
        return c.json?.(
          {
            status: 400,
            message: "dealine in task in not found",
          },
          400
        );
      }
      if (remind.reminded > newReminder) {
        return c.json?.(
          {
            status: 400,
            message: "reminded tidak boleh dari tanggal deadline",
          },
          400
        );
      }
      const reminded = await prisma.reminder.create({
        data: {
          reminded: newReminder,
          taskId: remind.taskID,
        },
      });
      return c.json?.({
        status: 201,
        message: "reminded is create",
        data: reminded,
      });
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          error: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  //   public async deleteReminder(c:AppContext){
  //     try {
  //         const jwtUser = c.user as JwtPayload
  //         if(!jwtUser){
  //             return c.json?.({
  //                 status:404,
  //                 message:"user not found"

  //             },404)
  //         }
  //         const reminded = await prisma.reminder.deleteMany({
  //             where:{

  //             }
  //         })
  //     } catch (error) {
  //         console.error(error)
  //         return c.json?.({
  //             status:500,
  //             message:"server internal error",
  //             error:error instanceof Error?error.message: error
  //         },500)
  //     }
  //   }
  public async deleteRemindedById(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const remen = c.params as PickReminderID;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!remen) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }
      const reminded = await prisma.reminder.delete({
        where: {
          id: remen.id,
        },
      });
      if (!reminded) {
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
            message: "succesfully delete reminded",
            data: reminded,
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
          error: error instanceof Error ? error.message : error,
        },
        500
      );
    }
  }
  public async updateReminded(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const remenBody = c.body as PIckCreateReminder;
      const remenParams = c.params as PickReminderID;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!remenBody.reminded || !remenBody.taskID) {
        return c.json?.(
          {
            status: 400,
            message: "body is required",
          },
          400
        );
      }
      if (!remenParams) {
        return c.json?.({
          status: 400,
          message: "params is requreid",
        });
      }
      const remended = await prisma.reminder.update({
        where: {
          id: remenParams.id,
          taskId: remenBody.taskID,
        },
        data: {
          ...remenBody,
        },
      });
      if (!remended) {
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
          message: "succesfully update reminded",
          data: remended,
        });
      }
    } catch (error) {
      console.error(error);
      return c.json?.(
        {
          status: 500,
          message: "server internal error",
          error: error instanceof Error ? error.message : error,
        },
        500
      );
    }
    // setup
  }
  //   public async getReminded(c:AppContext){
  //     try {
  //         const jwtUser = c.user as JwtPayload
  //         if(!jwtUser){
  //             return c.json?.({
  //                 status:404,
  //                 message:"user not found"

  //             },400)
  //         }
  //         const reminded = await prisma.reminder.findUnique({
  //             where:{
  //                 use
  //             }
  //         })
  //     } catch (error) {
  //          console.error(error);
  //       return c.json?.(
  //         {
  //           status: 500,
  //           message: "server internal error",
  //           error: error instanceof Error ? error.message : error,
  //         },
  //         500
  //       );
  //     }
  //   }
}

export default new RemindedController();
