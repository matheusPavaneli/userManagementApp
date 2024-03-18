export default interface IUserState {
  isLogged: boolean;
  isLoading: boolean;
  success: boolean;
  message: string;
  twoStep: boolean;
  twoFactorChecked: boolean;
  token: string;
  twoStepQRCodeUrl: string;
  imageUrl: string;
  csrfToken: string;
}
