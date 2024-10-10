import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from 'src/modules/user/user.service';
import { Prisma } from '@prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Query('users')
  async getAllUsers() {
    return this._userService.getAllUsers();
  }

  @Mutation('createUser')
  async createUser(@Args('userData') data: Prisma.UserCreateInput) {
    return this._userService.createUser(data);
  }
}
