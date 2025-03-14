import type { InternalOwner } from '@ember/-internals/owner';
import EngineInstance from '@ember/engine/instance';
import type EmberObject from '@ember/object';
import { expectTypeOf } from 'expect-type';

expectTypeOf<EngineInstance>().toMatchTypeOf<EmberObject>();
expectTypeOf<EngineInstance>().toMatchTypeOf<InternalOwner>();

// Good enough for tests
let owner = {} as InternalOwner;
let instance = new EngineInstance(owner);

expectTypeOf(instance.boot()).resolves.toEqualTypeOf<EngineInstance>();

let bootOptions = {
  isBrowser: true,
  shouldRender: false,
  document: window.document,
  rootElement: '#ember-application',
  location: 'history',
};

instance.boot(bootOptions);

instance.boot({ isBrowser: true });

// @ts-expect-error Incorrect type
instance.boot({ isBrowser: 1 });
// @ts-expect-error Incorrect type
instance.boot({ shouldRender: 1 });
// @ts-expect-error Incorrect type
instance.boot({ document: window });
// @ts-expect-error Incorrect type
instance.boot({ rootElement: 1 });
// @ts-expect-error Incorrect type
instance.boot({ location: 1 });
