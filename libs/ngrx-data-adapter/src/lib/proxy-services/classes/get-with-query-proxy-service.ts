import { UrlToEntitiesProxyService } from "../interfaces/url-to-entities-proxy-service.interface";

export abstract class GetWithQueryProxyService<T> implements UrlToEntitiesProxyService<T> {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): Array<T>;
}
