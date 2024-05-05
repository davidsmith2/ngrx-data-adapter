/**
 * getByKey
 */
export interface UrlToEntityProxyService<T> {
  modifyRequest(request: string): string;
  modifyResponse(response: unknown): T;
}