function addVAT(price: number, vat: number = 0.2): number {
  return price * (1 + vat)
}

const vatPrice = addVAT(30, 0.2)
const vatPriceWithDefault = addVAT(30)

// const vatPriceErrors = addVAT(30, 'a string!')
// const vatPriceAlsoWrong = addVAT('Hi, friends!')

let deliveryAddress: string[] = []

deliveryAddress.push('421')

// deliveryAddress.push(2000)

function selectDeliveryAddress(addressOrIndex: unknown): string {
  if (typeof addressOrIndex === 'number' && addressOrIndex < deliveryAddress.length) {
    return deliveryAddress[addressOrIndex]
  } else if (typeof addressOrIndex === 'string') {
    return addressOrIndex
  }
  return ''
}

// Oh no! This is totally OK in TypeScript, but
// myFavouriteAddress is now string, even though we just
// return true? This is going to blow up in runtime!
// const myFavouriteAddress = selectDeliveryAddress(true)

type Article = {
  title: string;
  price: number;
  vat: number;
  stock: number;
  description: string;
}

const book = {
  title: 'Form Design Patterns by Adam Silver',
  price: 32.77,
  vat: 0.19,
  stock: 1000,
  description: 'A practical book on accessibility and forms',
}

const movie: Article = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
}

const movBackup = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}

const newMovie: Article = movBackup

type ShopItem = {
  title: string,
  price: number,
  vat: number,
  stock: number,
  description: string,
  rating: number
}

const shopitem = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}

const anotherMovie: Article = shopitem

// function createArticleElement(article: Article): string {
function createArticleElement(
  article: { title: string, price: number, vat: number }
): string {
  const title = article.title
  const price = addVAT(article.price, article.vat)
  return `<h2>Bur ${title} for ${price}</h2>`
}

createArticleElement(shopitem)

createArticleElement(anotherMovie)
