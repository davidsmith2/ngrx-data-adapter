import { Injectable } from "@angular/core";
import { ENTITY_SELECTOR } from "ngrx-entity-relationship";
import { toGraphQL, toMutation, toQuery } from "ngrx-entity-relationship/graphql";

@Injectable()
export class GraphQLQueryService {
  constructor() { }
  toGraphQL(query: string, selector: ENTITY_SELECTOR): string;
  toGraphQL(query: string, params: any, selector: ENTITY_SELECTOR): string;
  toGraphQL(query: string, paramsOrSelector: any|ENTITY_SELECTOR, selector?: ENTITY_SELECTOR): string {
    if (selector) {
      return toGraphQL(query, paramsOrSelector as any, selector);
    } else {
      return toGraphQL(query, paramsOrSelector as ENTITY_SELECTOR);
    }
  }
  toQuery(variables: any, toGraphQL: string): string;
  toQuery(toGraphQL: string): string;
  toQuery(variablesOrToGraphQL: any|string, toGraphQL?: string): string {
    if (variablesOrToGraphQL) {
      return toQuery(variablesOrToGraphQL, toGraphQL);
    } else {
      return toQuery(toGraphQL);
    }
  }
  toMutation(toGraphQL: string): string;
  toMutation(variables: any, toGraphQL: string): string;
  toMutation(variablesOrToGraphQL: any|string, toGraphQL?: string): string {
    if (variablesOrToGraphQL) {
      return toMutation(variablesOrToGraphQL, toGraphQL);
    } else {
      return toMutation(toGraphQL);
    }
  }
}