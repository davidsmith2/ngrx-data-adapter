import { Args, Query, Resolver, Int } from "@nestjs/graphql";
import { PermissionType } from "./permission.types";
import { PermissionService } from "./permission.service";

@Resolver(() => PermissionType)
export class PermissionResolver {
  constructor(private permissionService: PermissionService) {}

  @Query(() => PermissionType)
  async selectOne_permission(@Args('id', { type: () => Int }) id: number): Promise<PermissionType> {
    return this.permissionService.getByKey(id);
  }

  @Query(() => [PermissionType!]!)
  async selectAll_permissions(): Promise<Array<PermissionType>> {
    return this.permissionService.getAll();
  }

}