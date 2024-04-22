import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { UserService } from './user/user.service';
import { CompanyService } from './company/company.service';
import { UserResolver } from './user/user.resolver';
import { CompanyResolver } from './company/company.resolver';

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
    CompanyService
  ]
})
export class AppModule {}
