import { Args, Query, Resolver, Mutation, Int } from "@nestjs/graphql";
import { UpsertUserInput, UserType } from './user.types';
import { UserService } from "./user.service";

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserType)
  async addOne_user(@Args('user', { type: () => UpsertUserInput }) user: UpsertUserInput): Promise<UserType> {
    return this.userService.add(user);
  }

  @Mutation(() => UserType)
  async deleteOne_user(@Args('id', { type: () => Int }) id: number): Promise<UserType> {
    return this.userService.delete(id);
  }

  @Mutation(() => UserType)
  async updateOne_user(@Args('user', { type: () => UpsertUserInput }) user: UpsertUserInput): Promise<UserType> {
    return this.userService.update(user);
  }

  @Mutation(() => UserType)
  async upsertOne_user(
    @Args('id', { type: () => Int, nullable: true }) id: number,
    @Args('user', { type: () => UpsertUserInput }) user: UpsertUserInput
  ): Promise<UserType> {
    return this.userService.upsert(id, user);
  }

  @Query(() => UserType)
  async selectOne_user(@Args('id', { type: () => Int }) id: number): Promise<UserType> {
    return this.userService.getByKey(id);
  }

  @Query(() => [UserType!]!)
  async selectAll_users(@Args('firstName', { type: () => String, nullable: true }) firstName: string): Promise<Array<UserType>> {
    if (firstName) {
      return this.userService.getWithQuery(firstName);
    } else {
      return this.userService.getAll();
    }
  }

}