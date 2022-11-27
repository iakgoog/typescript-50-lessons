/**
 * Conditional Types
 */

/**
 * If This, Then That
 */

type Customer = {
  customerId: number,
  firstName: string,
  lastName: string
}

const customer = {
  customerId: 1,
  firstName: 'Stefan',
  lastName: 'Baumgartner'
}

type Product = {
  productId: number,
  title: string,
  price: number
}

const product = {
  productId: 22,
  title: 'Form Design Patterns',
  price: 29
}

type Order = {
  orderId: number,
  customer: Customer,
  products: Product[],
  date: Date
}

function fetchOrder(customer: Customer): Order[]
function fetchOrder(product: Product): Order[]
function fetchOrder(orderId: number): Order
function fetchOrder(param: Customer | Product): Order[]
function fetchOrder(param: Customer | number): Order[] | Order
function fetchOrder(param: Product | number): Order[] | Order
function fetchOrder(param: Customer | Product | number): Order[] | Order {
  
}

fetchOrder(customer)
fetchOrder(2)

declare const ambigous: Customer | number

fetchOrder(ambigous) // It's any


