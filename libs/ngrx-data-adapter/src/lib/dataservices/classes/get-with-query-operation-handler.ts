import { OperationHandler } from "./operation-handler";
import { EntitiesOperationHandler } from "../interfaces/entities-operation-handler.interface";
import { ReadOperationHandler } from "../interfaces/read-operation-handler.interface";

export abstract class GetWithQueryOperationHandler<T> extends OperationHandler<T> implements EntitiesOperationHandler<T>, ReadOperationHandler<T> {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): Array<T>;
}
