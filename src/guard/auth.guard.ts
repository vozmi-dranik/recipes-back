import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as firebase from 'firebase-admin';
import { environment } from 'src/config/environment.config';
import { UserService } from 'src/modules/user/user.service';
import { Request } from 'express';
import { AuthenticationError } from '@nestjs/apollo';

@Injectable()
export class AuthGuard implements CanActivate {
  private _app: firebase.app.App;

  constructor(private readonly _userService: UserService) {
    this._app = firebase.initializeApp({
      credential: firebase.credential.cert({ ...environment.firebaseServiceAccount }),
      databaseURL: environment.firebaseApp.databaseUrl,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const token = req.headers.authorization;

    if (token) {
      try {
        const decodedToken = await this._app.auth().verifyIdToken(token.replace('Bearer ', ''))
        const user = await this._userService.getUserByEmail(decodedToken.email);
        console.log(user, 'user');
        if (!user) {
          await this._userService.createUser({ email: decodedToken.email });
        }
        req['user'] = { email: decodedToken.email };
        return true;
      } catch (error) {
        throw new AuthenticationError('Unauthorized access');
      }
    } else {
      throw new AuthenticationError('Unauthorized access');
    }
  }
}
