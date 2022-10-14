import Service, { inject, service } from '@ember/service';
import EmberObject from '@ember/object';

class FirstSvc extends Service {
  foo = 'bar';
  first() {
    return '';
  }
}
const SecondSvc = Service.extend({
  foo: 'bar',
  second() {
    return '';
  },
});

declare module '@ember/service' {
  interface Registry {
    first: typeof FirstSvc;
    second: typeof SecondSvc;
  }
}

class Foo extends EmberObject {
  @inject declare foo: FirstSvc;
  @inject('first') declare baz: FirstSvc;
  @inject declare bar: FirstSvc;
}

class FooService extends EmberObject {
  @service declare foo: FirstSvc;
  @service('first') declare baz: FirstSvc;
  @service declare bar: FirstSvc;
}

import type Owner from '@ember/owner';
import { expectTypeOf } from 'expect-type';
declare let owner: Owner;
expectTypeOf(owner.lookup('service:first')).toEqualTypeOf<FirstSvc>();

let fm = owner.factoryFor('service:first');
fm.create({ foo: 'blah' });
