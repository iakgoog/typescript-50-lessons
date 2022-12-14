/**
 * Thinking in Types
 */

/**
 * Promisify
 */

declare function loadFile(
  fileName: string,
  cb: (result: string) => void
);

const loadFilePromise = promisify(loadFile)

loadFilePromise('./chapter7.md')
  .then(result => result.toUpperCase())

declare function promisify<
  Fun extends FunctionWithCallback
>(fun: Fun): PromisifiedFunction<Fun>;

// type FunctionWithCallback = 
//   (
//     (
//       arg1: any,
//       cb: (result: any) => any
//     ) => any
//   ) |
//   (
//     (
//       arg1: any,
//       arg2: any,
//       cb: (result: any) => any
//     ) => any
//   ) |
//   (
//     (
//       arg1: any,
//       arg2: any,
//       arg3: any,
//       cb: (result: any) => any
//     ) => any
//   )

type PersonProps = [string, number]

const [name, age]: PersonProps = ['Stefan', 37]

declare function hello(name: string, msg: string): void;

// declare function hello(...args: [string, string]): void;

type FunctionWithCallback<T extends any[] = any[]> = (...t: [...T, (...args: any) => any]) => any;

type PromisifiedFunction<T> = (...args: InferArguments<T>) => Promise<InferResults<T>>

type InferArguments<T> = T extends (...t: [...infer R, (...args: any) => any]) => any ? R : never

type InferResults<T> = T extends (...t: [...infer T, (res: infer R) => any]) => any ? R : never

declare function addAsync(
  x: number,
  y: number,
  cb: (result: number) => void
);

const addProm = promisify(addAsync);
addProm(1, 2).then(x => x)

function promisify<
  Fun extends FunctionWithCallback
>(f: Fun): PromisifiedFunction<Fun> {
  return function(...args: InferArguments<Fun>) {
    return new Promise((resolve) => {
      function callback(result: InferResults<Fun>) {
        resolve(result)
      }
      args.push(callback);
      f.call(null, ...args)
    })
  }
}

/**
 * JSONify
 */

class Serializer<T> {

  serialize(inp: T): string {
    return JSON.stringify(inp)
  }

  deserialize(inp: string): JSONified<T> {
    return JSON.parse(inp)
  }

}

type Widget = {
  toJSON(): {
    kind: 'Widget',
    date: Date
  }
}

type Item = {
  text: string;
  count: number;
  choice: 'yes' | 'no' | null;
  func: () => void;
  nested: {
    isSaved: boolean;
    data: [1, undefined, 2];
  }
  widget: Widget;
  children?: Item[]
}

/**
 * JSONified Values
 */

type JSONified<T> = JSONifiedValue<T extends { toJSON(): infer U } ? U : T>;

type JSONifiedValue<T> = 
  T extends string | number | boolean | null ? T :
  T extends Function ? never :
  T extends object ? JSONifiedObject<T> :
  T extends Array<infer U> ? JSONifiedArray<U> :
  never;

type JSONifiedObject<T> = {
  [P in keyof T]: JSONified<T[P]>
}

type UndefinedAsNull<T> = T extends undefined ? null : T;

type JSONifiedArray<T> = Array<UndefinedAsNull<JSONified<T>>>

const itemSerializer = new Serializer<Item>()

const serialization = itemSerializer.serialize(anItem)

const obj = itemSerializer.deserialize(serialization)

/**
 * Service Definitions
 */

/**
 * Dynamic Definitions
 */

const serviceDefinition = {
  open: { filename: String },
  insert: { pos: Number, text: String },
  delete: { pos: Number, len: Number },
  close: {},
}

/**
 * Typing Service Definitions
 */

declare function createService<
  S extends ServiceDefinition
>(
  serviceDef: S,
  handler: RequestHandler<S>,
): ServiceObject<S>

type ServiceDefinition = {
  [x: string]: MethodDefinition;
};

type MethodDefinition = {
  [x: string]: StringConstructor | NumberConstructor;
};

type RequestHandler<
  T extends ServiceDefinition
> = (req: RequestObject<T>) => boolean;

/**
 * The Request Object
 */

type RequestObject<T extends ServiceDefinition> = {
  [P in keyof T]: {
    message: P;
    payload: RequestPayload<T[P]>;
  }
}[keyof T];

type RequestPayload<T extends MethodDefinition> = 
  {} extends T
    ? undefined
    : { [P in keyof T]: TypeFromConstructor<T[P]> };

type TypeFromConstructor<T> = 
  T extends StringConstructor
    ? string
    : T extends NumberConstructor
      ? number
      : any;

/*
{
  req: {
    message: "open",
    payload: {
      filename: string;
    };
  } | {
    message: "insert",
    payload: {
      pos: number;
      text: string;
    }
  } | {
    message: "delete",
    payload: {
      pos: number;
      len: number;
    }
  } | {
    message: "close",
    payload: undefined;
  }
}
*/

/**
 * The Service Object
 */

type ServiceObject<T extends ServiceDefinition> = {
  [P in keyof T]: ServiceMethod<T[P]>
}

type ServiceMethod<T extends MethodDefinition> = 
  {} extends T
    ? () => boolean
    : (payload: RequestPayload<T>) => boolean;

/**
 * Implementing createService
 */

function createService<S extends ServiceDefinition>(
  serviceDef: S,
  handler: RequestHandler<S>,
): ServiceObject<S> {
  const service: Record<string, Function> = {};
  for (const name in serviceDef) {
    service[name] = (payload: any) => handler({
      message: name,
      payload
    });
  }
  return service as ServiceObject<S>;
}

const service = createService(
  serviceDefinition,
  req => {
    switch (req.message) {
      case 'open':
        // Do something
        break;
      case 'insert':
        // Do something
        break;
      default:
        break;
    }
    return true;
  }
);

service.open({ filename: 'text.txt' });

service.close();

/**
 * DOM JSX Engine, Part 1
 */
function DOMcreateElement<T extends string>(
  element: T, properties: Props<T>, ...children: PossibleChildren[]
): HTMLElement
function DOMcreateElement<F extends Fun2>(
  element: F, properties: Props<F>, ...children: PossibleChildren[]
): HTMLElement
function DOMcreateElement(
  element: any, properties: any, ...children: PossibleChildren[]
): HTMLElement {
  if (typeof element === 'function') {
    return element({
      ...nonNull(properties, {}),
      children
    })
  }

  return DOMparseNode(
    element,
    properties,
    children,
  );
}

// function nonNull(val, fallback) {
//   return Boolean(val) ? val : fallback
// }
function nonNull<T, U>(val: T, fallback: U) {
  return Boolean(val) ? val : fallback;
}

type PossibleChildren = HTMLElement | Text | string

type Fun2 = (...args: any[]) => any;

type AllElementsKeys = keyof HTMLElementTagNameMap

type CreatedElement<T> = T extends AllElementsKeys ? HTMLElementTagNameMap[T] : HTMLElement

type Props<T> = T extends Fun2
  ? Parameters<T>[0]
  : T extends string 
    ? Partial<CreatedElement<T>>
    : never;

function DOMparseNode<T extends string>(element: T, properties: Props<T>, children: PossibleChildren[]) {
  const el = Object.assign(
    document.createElement(element),
    properties
  );
  DOMparseChildren(children).forEach(child => {
    el.appendChild(child);
  });
  return el;
}

function DOMparseChildren(children: PossibleChildren[]) {
  return children.map(child => {
    if (typeof child === 'string') {
      return document.createTextNode(child);
    }
    return child;
  })
}

const Button = ({ msg }) => {
  return (
    <button onclick={() => alert(msg)}>
      <strong>Click me</strong>
    </button>
  )
}

const el = (
  <div>
    <h1 className="what">Hello World</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur
      adipisicing elit. Quae sed consectetur
      placeat veritatis
      illo vitae quos aut unde doloribus, minima
      eveniet et
      eius voluptatibus minus aperiam
      sequi asperiores, odio ad?
    </p>
    <Button msg='Yay' />
    <Button msg='Nay' />
  </div>
)

document.body.appendChild(el);

/**
 * DOM JSX Engine, Part 2
 */

/**
 * Typing the Factory
 */

/**
 * Typing JSX
 */

declare namespace JSX {
  type OurIntricsicElements = {
    [P in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[P]>
  }

  interface IntricsicElements extends OurIntricsicElements {}

  interface Element extends HTMLElement {}
}

/**
 * Extending Object, Part 1
 */

function print(msg: any) {
  if (typeof msg === 'string') {
    console.log(msg.toUpperCase())
  } else if (typeof msg === 'number') {
    console.log(msg.toFixed(2))
  }
}

/**
 * Checking Object Properties
 */

if (typeof obj === 'object' && 'prop' in obj) {
  console.assert(typeof obj.prop !== 'undefined')
}

if (typeof obj === 'object' && obj.hasOwnProperty('prop')) {
  console.assert(typeof obj.prop !== 'undefined')
}

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X, prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

if (typeof person === 'object' && hasOwnProperty(person, 'name') && typeof person.name === 'string') {
  console.assert(typeof person.name !== 'undefined')
}

/**
 * Extending lib.d.ts
 */

interface Object {
  hasOwnProperty<X extends {}, Y extends PropertyKey>(this: X, prop: Y): this is X & Record<Y, unknown>
}

/**
 * Extending the Object Constructor
 */

const obj2 = {
  name: 'Stefan',
  age: 38
}

Object.keys(obj).map(key => {
  console.log(obj[key])
})

// Static parts --> constructor interface
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.create = function(name, age) {
  return new Person(name, age)
}

// Dynamic parts --> instance interface
Person.prototype.toString = function() {
  return `My name is ${this.name} and I'm ${this.age} years old`
}

// A utility type
type ReturnKeys<O> = 
  O extends number
  ? []
  : O extends Array<any> | string
    ? string[] 
    : O extends object
      ? Array<keyof O>
      : never

// Extending the interface
interface ObjectConstructor {
  keys<O>(obj: O): ReturnKeys<O>
}

/**
 * Extending Object, Part 2
 */

const storage2 = {
  currentValue: 0
}

Object.defineProperty(storage2, 'maxValue', {
  value: 9001,
  writable: false
})

console.log(storage2.maxValue)

storage2.maxValue = 2

console.log(storage2.maxValue)

/**
 * Assertion Signatures
 */

// function assertIsNum(val: any) {
//   if (typeof val != 'number') {
//     throw new AssertionError('Not a number!');
//   }
// }

function multiply(x, y) {
  assertIsNum(x);
  assertIsNum(y);

  return x * y;
}

function assertIsNum(val: any): asserts val is number {
  if (typeof val != 'number') {
    throw new AssertionError('Not a number!');
  }
}

/**
 * Custom defineProperty
 */

function defineProperty<
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor
>(obj: Obj, prop: Key, val: PDesc): asserts obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val);
}

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor
> = Desc extends { 
  writable: any,
  set(val: any): any
}
  ? never
  : Desc extends {
    writable: any,
    get(): any
  }
    ? never
    : Desc extends {
      writable: false
    }
      ? Readonly<InferValue<Prop, Desc>>
      : Desc extends {
        writable: true
      }
        ? InferValue<Prop, Desc>
        : Readonly<InferValue<Prop, Desc>>

type InferValue<Prop extends PropertyKey, Desc> =
  Desc extends {
    get(): any,
    value: any
  }
    ? never
    : Desc extends {
      value: infer T
    }
      ? Record<Prop, T>
      : Desc extends {
        get(): infer T
      }
        ? Record<Prop, T>
        : never;

/**
 * Moving It to the Object Constructor
 */

interface ObjectConstructor {
  defineProperty<
    Obj extends object,
    Key extends PropertyKey,
    PDesc extends PropertyDescriptor
  >(obj: Obj, prop: Key, val: PDesc): asserts obj is Obj & DefineProperty<Key, PDesc>;
}

const storage3 = {
  currentValue: 0
}

Object.defineProperty(storage3, 'maxValue', {
  writable: false,
  value: 9001
})

storage3.maxValue
storage3.maxValue = 2

const storageName = 'My Storage'
defineProperty(storage3, 'name', {
  get() {
    return storageName
  }
})

storage3.name

Object.defineProperty(storage3, 'broken', {
  get() {
    return storageName
  },
  value: 4000
})

storage3
