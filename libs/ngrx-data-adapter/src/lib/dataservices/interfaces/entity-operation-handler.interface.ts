export interface EntityOperationHandler<T> {
  modifyResponse(response: unknown): T;
}
