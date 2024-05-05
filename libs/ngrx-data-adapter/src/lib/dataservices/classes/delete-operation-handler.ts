import { OperationHandler } from "./operation-handler";

export abstract class DeleteOperationHandler<T> extends OperationHandler<T> {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): string|number;
}
