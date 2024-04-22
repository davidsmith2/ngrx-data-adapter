import { HttpMethods } from "@ngrx/data";
import { OperationHandlerOptions } from "../interfaces/operation-handler-options.interface";

export abstract class OperationHandler<T> {
  constructor(readonly options: OperationHandlerOptions) { }
  abstract matchRequest(url: string, method: HttpMethods): boolean;
  abstract modifyRequest(request: T|Array<T>|string): unknown;
  abstract modifyResponse(response: unknown): T|Array<T>;
}
