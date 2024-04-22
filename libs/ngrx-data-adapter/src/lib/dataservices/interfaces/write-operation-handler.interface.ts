export interface WriteOperationHandler<T> {
  modifyRequest(entity: T): unknown;
}
