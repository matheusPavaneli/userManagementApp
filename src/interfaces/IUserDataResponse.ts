export default interface IUserDataResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    password: string;
    twoStep: boolean;
  };
  token: string;
  twoStepQRCodeUrl: string;
  imageUrl: string;
}
