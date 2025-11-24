import { AppContext } from "@/contex/app-context";
import { JwtPayload } from "@/types/auth.types";
import {
  JwtCategoryPayload,
  PickCategoryID,
  PickCreateCategory,
} from "@/types/category.types";
import prisma from "prisma/client";

class CategoryController {
  public async createCategory(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const cate = c.body as PickCreateCategory;

      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          404
        );
      }
      if (!cate.description || !cate.title) {
        return c.json?.(
          {
            status: 400,
            message: "body is required",
          },
          400
        );
      }

      const category = await prisma.category.create({
        data: {
          title: cate.title,
          description: cate.description,
          userId: jwtUser.id,
        },
      });

      return c.json?.(
        {
          status: 201,
          message: "succes create category",
          data: category,
        },
        201
      );
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
  public async getCategory(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "akun not found",
          },
          404
        );
      }
      const category = await prisma.category.findMany({
        where: {
          userId: jwtUser.id,
        },
      });

      if (!category) {
        return c.json?.(
          {
            status: 400,
            message: "category is empty",
          },
          400
        );
      }

      return c.json?.(
        {
          status: 200,
          message: "succesfully get category",
          data: category,
        },
        200
      );
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
  public async getCategoryById(c: AppContext) {
    try {
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
      if (!cate) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }
      const category = await prisma.category.findUnique({
        where: {
          id: cate.id,
          userId: jwtUser.id,
        },
      });

      if (!category) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      }
      return c.json?.(
        {
          status: 200,
          message: "succesfully get categoryByID",
          data: category,
        },
        200
      );
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
  public async deleteCategory(c: AppContext) {
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
      const category = await prisma.category.deleteMany({
        where: {
          userId: jwtUser.id,
        },
      });

      if (!category) {
        return c.json?.(
          {
            status: 400,
            message: "server internal error",
          },
          400
        );
      }

      return c.json?.(
        {
          status: 200,
          message: "succesfully delete all Category",
          data: category,
        },
        200
      );
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
  public async deleteCategoryById(c: AppContext) {
    try {
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
      const category = await prisma.category.delete({
        where: {
          id: cate.id,
          userId: jwtUser.id,
        },
      });
      return c.json?.(
        {
          status: 200,
          message: "succesfully delete category by id",
          data: category,
        },
        200
      );
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
  public async updateCategory(c: AppContext) {
    try {
      const jwtUser = c.user as JwtPayload;
      const cateParams = c.params as PickCategoryID;
      const cateBody = c.body as PickCreateCategory;

      if (!jwtUser) {
        return c.json?.(
          {
            status: 404,
            message: "user not found",
          },
          400
        );
      }
      if (!cateParams.id) {
        return c.json?.(
          {
            status: 400,
            message: "params is required",
          },
          400
        );
      }
      const category = await prisma.category.update({
        where: {
          id: cateParams.id,
          userId: jwtUser.id,
        },
        data: {
          ...cateBody,
        },
      });
      if (!category) {
        return c.json?.(
          {
            status: 403,
            message: "unauthorized",
          },
          403
        );
      }
      return c.json?.(
        {
          status: 200,
          message: "succesfully update category",
          data: category,
        },
        200
      );
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
}

export default new CategoryController();
