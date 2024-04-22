import { OperationHandler } from "./operation-handler";
import { EntityOperationHandler } from "../interfaces/entity-operation-handler.interface";
import { WriteOperationHandler } from "../interfaces/write-operation-handler.interface";

export abstract class UpsertOperationHandler<T> extends OperationHandler<T> implements EntityOperationHandler<T>, WriteOperationHandler<T> {
  abstract modifyRequest(request: T): unknown;
  abstract modifyResponse(response: unknown): T;
}
