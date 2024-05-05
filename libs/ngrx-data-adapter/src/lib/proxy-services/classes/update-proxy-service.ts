import { EntityToEntityProxyService } from "../interfaces/entity-to-entity-proxy-service.interface";

export abstract class UpdateProxyService<T> implements EntityToEntityProxyService<T> {
  abstract modifyRequest(request: T): unknown;
  abstract modifyResponse(response: unknown): T;
}
