export interface IAuth {
  id: string;
  email: string;
  fullName: string;
  password: string;
  token: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  otp: string;
  expOtp: Date;
  photoUrl: string;
  isVerify: boolean;
}

export interface ICategory {
  id: string;
  title: string;
  userId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITask {
  id: string;
  userID: string;
  categoryID: string;
  todo: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
  isDone: boolean;
  category: ICategory;
}

export interface IReminder {
  id: string;
  taskID: string;
  reminded: string;
  createdAt: string;
  updatedAt: string;
}
