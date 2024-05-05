export interface ReadOperationHandler<T> {
  modifyRequest(url: string): string;
  modifyResponse(response: unknown): T|Array<T>;
}
