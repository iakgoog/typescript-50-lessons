/**
 * Conditional Types
 */

/**
 * If This, Then That
 */

type Customer = {
  customerId: number;
  firstName: string;
  lastName: string;
};

const customer = {
  customerId: 1,
  firstName: 'Stefan',
  lastName: 'Baumgartner',
};

type Product = {
  productId: number;
  title: string;
  price: number;
};

const product = {
  productId: 22,
  title: 'Form Design Patterns',
  price: 29,
};

type Order = {
  orderId: number;
  customer: Customer;
  products: Product[];
  date: Date;
};

// function fetchOrder(customer: Customer): Order[];
// function fetchOrder(product: Product): Order[];
// function fetchOrder(orderId: number): Order;
// function fetchOrder(param: Customer | Product): Order[];
// function fetchOrder(param: Customer | number): Order[] | Order;
// function fetchOrder(param: Product | number): Order[] | Order;
// function fetchOrder(param: Customer | Product | number): Order[] | Order;
// function fetchOrder<Param extends FetchParams>(
//   param: Param
// ): FetchReturn<Param>

// fetchOrder(customer);
// fetchOrder(product);
// fetchOrder(2);

// declare const ambigous: Customer | number;

// fetchOrder(ambigous); // It's any

// declare;
// x: any;

// fetchOrder(x);

/**
 * Enter Conditional Types
 */

// type Conditional<T> = T extends U ? A : B

type FetchParams = number | Customer | Product;

type FetchReturn<Param extends FetchParams> = Param extends Customer
  ? Order[]
  : Param extends Product
    ? Order[]
    : Order;

/**
 * Combining Function Overloads and Conditional Types
 */

type Callback<Res> = (result: Res) => void;

function fetchOrder<Par extends FetchParams>(
  inp: Par
): Promise<FetchReturn<Par>>;

function fetchOrder<Par extends FetchParams>(
  inp: Par,
  fun: Callback<FetchReturn<Par>>
): void;

/**
 * Tuple Types for Function Heads
 */

function doSomething(...rest) {
  return rest[0] + rest[1];
}

doSomething('Java', 'Script');

function fetchOrder<Par extends FetchParams>(
  ...args: [Par, Callback<FetchReturn<Par>>]
): void;

function fetchOrder<Par extends FetchParams>(
  ...args: [Par]
): Promise<FetchReturn<Par>>;

type FetchCb<T extends FetchParams> = Callback<FetchReturn<T>>;

type AsyncResult<FHead, Par extends FetchParams> = FHead extends [
  Par,
  FetchCb<Par>
]
  ? void
  : FHead extends [Par]
    ? Promise<FetchReturn<Par>>
    : never;

function fetchOrder<Par extends FetchParams, FHead>(
  ...args: FHead
): AsyncResult<FileSystemHandle, Par>;

/**
 * Function Overloads Are Fine
 */

// Version 1
function fetchOrder<Par extends FetchParams>(
  inp: Par
): Promise<FetchReturn<Par>>;

// Version 2
function fetchOrder<Par extends FetchParams>(
  inp: Par,
  fun: Callback<FetchReturn<Par>>
): void;

// The implementation
function fetchOrder<Par extends FetchParams>(
  inp: Par,
  fun?: Callback<FetchReturn<Par>>
): Promise<FetchReturn<Par>> | void {
  const res = fetch(`/backend?inp=${JSON.stringify(inp)}`)
                .then(res => res.json())

  if (fun) {
    res.then(result => {
      fun(result)
    })
  } else {
    return res
  }
}

/**
 * Distributive
 */

type FetchParams = number
  | Customer
  | Product

type FetchReturn<Param extends FetchParams> =
  Param extends Customer
  ? Order[]
  : Param extends Product
    ? Order[]
    : Order

type FetchByCustomer = FetchReturn<Customer>

/**
 * Distributive over Unions
 */

type FetchByProductOrId = FetchReturn<Product | number>
// type FetchByProductOrId = Order[] | Order

// type FetchByProductOrId = (
//   Product extends Customer
//     ? Order[]
//     : Product extends Product
//       ? Order[]
//       : Order
// ) | (
//   number extends Customer
//     ? Order[]
//     : number extends Product
//       ? Order[]
//       : Order
// )

type FetchByProductOrId2 = FetchReturn<Product | Customer | number>

// type FetchByProductOrId2 = (
//   Product extends Customer
//     ? Order[]
//     : Product extends Product
//       ? Order[]
//       : Order
// ) | (
//   Customer extends Customer
//     ? Order[]
//     : Customer extends Product
//       ? Order[]
//       : Order
// ) | (
//   number extends Customer
//     ? Order[]
//     : number extends Product
//       ? Order[]
//       : Order
// )

/**
 * Naked Types
 */

type FetchReturn2<Param extends FetchParams> = 
  [Param] extends [Customer]
    ? Order[]
    : [Param] extends [Product]
      ? Order[]
      : Order

type FetchByCustomer2 = FetchReturn2<Customer>

// type FetchByCustomer2 = 
//   [Customer] extends [Customer]
//     ? Order[]
//     : [Customer] extends [Product]
//       ? Order[]
//       : Order

type FetchByCustomerOrId = FetchReturn2<Customer | number>
// type FetchByCustomerOrId = Order

// type FetchByCustomerOrId = 
//   // This is false!
//   [Customer | number] extends [Customer]
//     ? Order[]
//     // This is obviously also false
//     : [Customer | number] extends [Product]
//       ? Order[]
//       // So we resolve to this
//       : Order

type FetchReturn3<Param extends FetchParams> = 
  [Param] extends [Customer]
    ? Order[]
    : [Param] extends [Product]
      ? Order[]
      : [Param] extends [number]
        ? Order
        : never

/**
 * Filtering with never
 */

/**
 * The Model
 */

type Medium = {
  id: number,
  title: string,
  artist: string,
}

type TrackInfo = {
  duration: number,
  tracks: number
}

type CD = Medium & TrackInfo & {
  kind: 'cd'
}

type LP = Medium & {
  sides: {
    a: TrackInfo,
    b: TrackInfo
  },
  kind: 'lp'
}

type AllMedia = CD | LP
type MediaKinds = AllMedia['kind']

/**
 * Select Branches of Unions
 */

// declare function createMedium(kind, info): AllMedia

// declare function createMedium(kind: MediaKinds, info): AllMedia

declare function createMedium<Kin extends MediaKinds>(
  kind: Kin, info
): SelectBranch<AllMedia, Kin>

type SelectBranch<Branch, Kin> = Branch extends { kind: Kin } ? Branch : never;

type SelectCD = SelectBranch<AllMedia, 'cd'>

/**
 * Extract
 */

type MyExtract<A, B> = A extends B ? A : never

type SelectLP = MyExtract<AllMedia, { kind: 'lp' }>

/**
 * Composing Helper Types
 */

// declare function createMedium2<Kin extends MediaKinds>(kind: Kin, info): SelectBranch<AllMedia, Kin>

/**
 * Exclude
 */

type CDInfo = {
  title: string,
  description: string,
  tracks: number,
  duration: number
}

type LPInfo = {
  title: string,
  description: string,
  sides: {
    a: {
      tracks: number,
      duraton: number
    },
    b: {
      tracks: number,
      duration: number
    }
  }
}

type Removeable = 'kind' | 'id'

type Remove<A, B> = A extends B ? never : A

type CDKeys = keyof CDInfo

// type CDKeys = 'id' | 'description' | 'title' | 'kind' | 'tracks' | 'duration'

type CDInfoKeys = Remove<CDKeys, Removeable>
// Equal to
type CDInfoKeys2 = Remove<'id' | 'description' | 'title' | 'kind' | 'tracks' | 'duration' , 'id' | 'kind'>
// Equal to
type CDInfoKeys3 = 
  Remove<'id', 'id' | 'kind'> |
  Remove<'description', 'id' | 'kind'> |
  Remove<'title', 'id' | 'kind'> |
  Remove<'kind', 'id' | 'kind'> |
  Remove<'tracks', 'id' | 'kind'> |
  Remove<'duration', 'id' | 'kind'>
// Equal to
type CDInfoKeys4 =
  ('id' extends 'id' | 'kind' ? never : 'id') |
  ('description' extends 'id' | 'kind' ? never : 'description') |
  ('title' extends 'id' | 'kind' ? never : 'title') |
  ('kind' extends 'id' | 'kind' ? never : 'kind') |
  ('tracks' extends 'id' | 'kind' ? never : 'tracks') |
  ('duration' extends 'id' | 'kind' ? never : 'duration')
// Equal to
type CDInfoKeys5 = never | 'description' | 'title' | never | 'tracks' | 'duration'
// Equal to
type CDInfoKeys6 = 'description' | 'title' | 'tracks' | 'duration'

/**
 * Omit
 */

type CDInfo2 = Pick<CD, Exclude<keyof CD, 'kind' | 'id'>>

type CDInfo3 = Omit<CD, 'kind' | 'id'>

type RemoveableKeys = 'kind' | 'id'
type GetInfo<Med> = Omit<Med, RemoveableKeys>

declare function createMedium2<
  Kin extends MediaKinds
>(
  kind: Kin,
  info: GetInfo<SelectBranch<AllMedia, Kin>>
): SelectBranch<AllMedia, Kin>

/**
 * The infer Keyword
 */

let userId = 0

function createUser(name, roles) {
  return {
    userId: userId++,
    name,
    roles,
    createAt: new Date()
  }
}

function createUser2(
  name: string,
  role: 'admin' | 'maintenance' | 'shipping',
  isActive: boolean
) {
  return {
    userId: userId++,
    name,
    role,
    isActive,
    createdAt: new Date()
  }
}

/**
 * Infer the Return Type
 */

const user = createUser2('Stefan', 'shipping', true)

/*
type User = {
  userId: number,
  name: string,
  role: 'admin' | 'maintenance' | 'shipping',
  isActive: boolean,
  createdAt: Date
}
*/

type User = typeof user

type GetReturn<Fun> = Fun extends (...args: any[]) => any ? Fun : never

type Fun = GetReturn<typeof createUser2>

type GetReturn2<Fun> = Fun extends (...args: any[]) => infer R ? R : never

type User2 = GetReturn2<typeof createUser2>

/**
 * Helper Types
 */

type Unpack<T> = T extends Promise<infer Res> ? Res : never
type UnpackConcrete = Unpack<Promise<number>>

type Flatten<T> = T extends Array<infer Vals> ? Vals : never
type FlattenConcrete = Flatten<Customer[]>

type Parameters2<T> = T extends (...args: infer Param) => any ? Param : never
type ParametersConcrete = Parameters2<typeof createUser2>

// • InstanceType. Gets the type of the created instance of the class’s constructor function.
// • ThisParameterType. If you use callback functions that bind this, you can get the bound type in return.
// • OmitThisParameterType. Uses infer to return a function signature without the this type. This is handy if
// your app doesn’t care about the bound this type and needs to be more flexible in passing functions.

/**
 * Working with null
 */

declare function fetchOrderList(input: Customer | Product): Promise<Order[]>

/**
 * NonNullable
 */

declare function listOrders(Order[] | null): void
declare function listOrders2(Order[]): void

declare function isAvailable<Obj>(obj: Obj): obj is NonNullable<Obj>

type MyNonNullable<T> = T extends null | undefined ? never : T

function isAvailable<Obj>(obj: Obj): obj is NonNullable<Obj> {
  return typeof obj !== 'undefined' && obj !== null
}

const orders = await fetchOrderList(customer)
if (isAvailable(orders)) {
  listOrders(orders)
}
