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
