import type { Registry as ServiceRegistry } from '@ember/service';
import type { FullName } from '@ember/owner';

declare module '@ember/owner' {
  export default interface Owner {
    lookup<Name extends keyof ServiceRegistry & string>(
      fullName: FullName<'service', Name>
    ): InstanceType<ServiceRegistry[Name]>;

    factoryFor<Name extends keyof ServiceRegistry & string>(
      fullName: FullName<'service', Name>
    ): FactoryManager<InstanceType<ServiceRegistry[Name]>>;
  }
}
