import { InjectionToken } from "@angular/core";
import { AdapterConfig } from "../interfaces/adapter-config.interface";

/**
 * @deprecated
 */
export const ADAPTER_CONFIG_TOKEN: InjectionToken<AdapterConfig> = new InjectionToken<AdapterConfig>('ADAPTER_CONFIG_TOKEN');

