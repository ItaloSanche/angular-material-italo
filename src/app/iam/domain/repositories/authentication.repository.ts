import { SignInRequest } from '../model/sign-in.request';

export abstract class AuthenticationRepository {
  abstract signIn(request: SignInRequest): Promise<boolean>;
}
