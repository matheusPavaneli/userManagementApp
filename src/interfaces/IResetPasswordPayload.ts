export default interface IResetPasswordPayload {
  password: string;
  confirmPassword: string;
  token: string;
}
