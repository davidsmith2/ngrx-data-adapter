export interface EntitiesOperationHandler<T> {
  modifyResponse(response: unknown): Array<T>;
}
