/**
 * getAll, getWithQuery
 */
export interface UrlToEntitiesProxyService<T> {
  modifyRequest(request: string): string;
  modifyResponse(response: unknown): Array<T>;
}