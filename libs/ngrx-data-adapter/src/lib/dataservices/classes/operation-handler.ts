import { OperationHandlerOptions } from "../interfaces/operation-handler-options.interface";

export abstract class OperationHandler<T> {
  constructor(readonly options: OperationHandlerOptions) { }
  abstract modifyRequest(request: unknown): unknown;
  abstract modifyResponse(response: unknown): unknown;
}
