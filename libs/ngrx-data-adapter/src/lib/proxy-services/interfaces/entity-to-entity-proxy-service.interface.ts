/**
 * add, update, upsert
 */
export interface EntityToEntityProxyService<T> {
  modifyRequest(request: T): unknown;
  modifyResponse(response: unknown): T;
}