import { UrlToKeyProxyService } from "../interfaces/url-to-key-proxy-service.interface";

export abstract class DeleteProxyService implements UrlToKeyProxyService {
  abstract modifyRequest(request: string): string;
  abstract modifyResponse(response: unknown): string|number;
}
