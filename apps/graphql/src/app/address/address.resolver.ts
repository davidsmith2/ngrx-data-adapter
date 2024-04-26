import { Args, Query, Resolver } from "@nestjs/graphql";
import { AddressType } from "./address.types";
import { AddressService } from "./address.service";

@Resolver(() => AddressType)
export class AddressResolver {
  constructor(private addressService: AddressService) {}
  
  @Query(() => [AddressType!]!)
  async selectAll_addresses(): Promise<Array<AddressType>> {
    return this.addressService.findAddresses();
  }

  @Query(() => AddressType)
  async selectOne_address(@Args('id', { type: () => Number }) id: number): Promise<AddressType> {
    return this.addressService.findAddressById(id);
  }

}
