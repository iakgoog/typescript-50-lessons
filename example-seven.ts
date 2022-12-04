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
