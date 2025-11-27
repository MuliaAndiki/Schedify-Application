import AuthApi from "./auth/auth.service";
import CategoryApi from "./category/category.service";
import RemindedApi from "./reminded/reminded.service";
import TaskApi from "./task/task.service";
class Api {
  static Auth = new AuthApi();
  static Category = new CategoryApi();
  static Task = new TaskApi();
  static Reminded = new RemindedApi();
}

export default Api;
