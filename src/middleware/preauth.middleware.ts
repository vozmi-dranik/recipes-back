import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { environment } from 'src/config/environment.config';
import { Request, Response } from 'express';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private _app;

  constructor(private readonly _userService: UserService) {
    this._app = firebase.initializeApp({
      credential: firebase.credential.cert(environment.firebaseServiceAccount),
      databaseURL: environment.firebaseApp.databaseUrl
    });
  }

  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    const excludedRoutes = ['/login', '/register', '/graphql'];
    if (excludedRoutes.includes(req.originalUrl)) {
      return next();
    }

    if (token) {
      try {
        const decodedToken = await this._app.verifyIdToken(token.replace('Bearer ', ''));
        const user = await this._userService.getUserByEmail(decodedToken.email);
        if (!user) {
          await this._userService.createUser({
            email: decodedToken.email,
          });
        }
        req['user'] = { email: decodedToken.email };
        next();
      } catch (error) {
        this.denyAccess(res);
      }
    } else {
      this.denyAccess(res);
    }
  }

  private denyAccess(res: Response) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .send({ message: 'Unauthorized access' });
  }
}
