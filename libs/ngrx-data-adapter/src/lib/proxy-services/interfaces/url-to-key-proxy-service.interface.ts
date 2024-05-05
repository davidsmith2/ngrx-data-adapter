/**
 * delete
 */
export interface UrlToKeyProxyService {
  modifyRequest(request: string): string;
  modifyResponse(response: unknown): string|number;
}