export interface WriteOperationHandler<T> {
  modifyRequest(request: T|string|number): unknown;
  modifyResponse(response: unknown): T|string|number;
}
