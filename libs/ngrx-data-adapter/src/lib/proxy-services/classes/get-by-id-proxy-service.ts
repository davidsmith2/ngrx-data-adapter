import { UrlToEntityProxyService } from "../interfaces/url-to-entity-proxy-service.interface";

export abstract class GetByIdProxyService<T> implements UrlToEntityProxyService<T> {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): T;
}