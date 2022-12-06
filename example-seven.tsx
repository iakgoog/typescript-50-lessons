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

function DOMcreateElement(
  element, properties, ...children
) {
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

function nonNull(val, fallback) {
  return Boolean(val) ? val : fallback
}

function DOMparseNode(element, properties, children) {
  const el = Object.assign(
    document.createElement(element),
    properties
  );
  DOMparseChildren(children).forEach(child => {
    el.appendChild(child);
  });
  return el;
}

function DOMparseChildren(children) {
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
