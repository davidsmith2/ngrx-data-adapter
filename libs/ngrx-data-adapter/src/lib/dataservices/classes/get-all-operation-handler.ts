import { OperationHandler } from "./operation-handler";
import { EntitiesOperationHandler } from "../interfaces/entities-operation-handler.interface";
import { ReadOperationHandler } from "../interfaces/read-operation-handler.interface";

export abstract class GetAllOperationHandler<T> extends OperationHandler<T> implements EntitiesOperationHandler<T>, ReadOperationHandler {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): Array<T>;
}
