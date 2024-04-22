import { RemoteOperationOptions } from "../interfaces/remote-operation-options.interface";

/**
 * @deprecated
 */
export class RemoteOperationRegistry {
  private static items: Map<string, RemoteOperationOptions> = new Map();
  private constructor() {
    throw new Error("RemoteOperationRegistry may not be instantiated")
  }
  static addItem(id: string, options: RemoteOperationOptions): void {
    if (!RemoteOperationRegistry.hasItem(id)) {
      RemoteOperationRegistry.items.set(id, options);
    }
  }
  static getItem(id: string): RemoteOperationOptions {
    return RemoteOperationRegistry.items.get(id);
  }
  private static hasItem(id: string): boolean {
    return RemoteOperationRegistry.items.has(id);
  }
}
