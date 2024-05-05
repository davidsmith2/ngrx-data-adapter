import { OperationHandler } from "./operation-handler";
import { EntityOperationHandler } from "../interfaces/entity-operation-handler.interface";
import { ReadOperationHandler } from "../interfaces/read-operation-handler.interface";

export abstract class GetByKeyOperationHandler<T> extends OperationHandler<T> implements EntityOperationHandler<T>, ReadOperationHandler<T> {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): T;
}