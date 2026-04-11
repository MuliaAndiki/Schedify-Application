export interface IAuth {
  id: string;
  email: string;
  fullName: string;
  password: string;
  token?: string;
  role: string;
  photoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  otp?: string;
  expOtp?: Date;
  isVerify?: boolean;
}

export type JwtPayload = Pick<
  IAuth,
  "id" | "email" | "role" | "fullName" | "token"
>;
export type PickRegister = Pick<
  IAuth,
  "email" | "fullName" | "password" | "role"
>;
export type PickLogin = Pick<IAuth, "email" | "password">;
export type PickID = Pick<IAuth, "id">;
export type PickForgotPasswordEmail = Pick<IAuth, "email">;
export type PickVerify = Pick<IAuth, "email" | "otp">;
export type PickSendOtp = Pick<IAuth, "email">;
export type PickResetPassword = Pick<IAuth, "email" | "password">;
export type PickUpdateProfile = Pick<IAuth, "email" | "fullName" | "photoUrl">;
