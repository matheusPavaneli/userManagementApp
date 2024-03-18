export default interface ITokenPayload {
  email: string;
  exp: number;
  iat: number;
  id: number;
  twoStep: boolean;
  username: string;
}
