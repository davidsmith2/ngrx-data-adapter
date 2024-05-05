import { AddProxyService } from "../../proxy-services/classes/add-proxy-service";
import { DeleteProxyService } from "../../proxy-services/classes/delete-proxy-service";
import { GetAllProxyService } from "../../proxy-services/classes/get-all-proxy-service";
import { GetByIdProxyService } from "../../proxy-services/classes/get-by-id-proxy-service";
import { GetWithQueryProxyService } from "../../proxy-services/classes/get-with-query-proxy-service";
import { UpdateProxyService } from "../../proxy-services/classes/update-proxy-service";
import { UpsertProxyService } from "../../proxy-services/classes/upsert-proxy-service";

export interface AdapterProxyServicesConfig {
  add: AddProxyService<unknown>;
  delete: DeleteProxyService;
  getAll: GetAllProxyService<unknown>;
  getById: GetByIdProxyService<unknown>;
  getWithQuery: GetWithQueryProxyService<unknown>;
  update: UpdateProxyService<unknown>;
  upsert: UpsertProxyService<unknown>;
}
