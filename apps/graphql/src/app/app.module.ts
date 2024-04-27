import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';
import { UserResolver } from './user/user.resolver';
import { CompanyResolver } from './company/company.resolver';
import { AddressResolver } from './address/address.resolver';
import { AddressService } from './address/address.service';
import { PermissionResolver } from './permissions/permissions.resolver';
import { PermissionService } from './permissions/permission.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver
    })
  ],
  controllers: [],
  providers: [
    UserResolver,
    UserService,
    CompanyResolver,
    CompanyService,
    AddressResolver,
    AddressService,
    PermissionResolver,
    PermissionService
  ]
})
export class AppModule {}
