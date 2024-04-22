import { RemoteOperationRegistry } from '../classes/remote-operation-registry';
import { RemoteOperationOptions } from '../interfaces/remote-operation-options.interface';

const noop = (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
  return descriptor;
};

const yesop = (options: RemoteOperationOptions) => {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    console.debug('Adding options to RemoteOperationRegistry...', options);
    RemoteOperationRegistry.addItem(options.requestId, options);
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      return originalMethod.apply(this, args);
    };
    return descriptor;
  }
};

/**
 * @deprecated
 */
export function RemoteOperation(options: RemoteOperationOptions): (_target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  console.debug('Trying to decorate remote operation...');
  if (!options) {
    console.warn('No options provided to RemoteOperation decorator. Returning noop...', options);
    return noop;
  }
  console.debug('Options provided to RemoteOperation decorator. Continuing...');
  return yesop(options);
}
