function addVAT(price: number, vat: number = 0.2): number {
  return price * (1 + vat);
}

const vatPrice = addVAT(30, 0.2);
const vatPriceWithDefault = addVAT(30);

// const vatPriceErrors = addVAT(30, 'a string!')
// const vatPriceAlsoWrong = addVAT('Hi, friends!')

let deliveryAddress: string[] = [];

deliveryAddress.push('421');

// deliveryAddress.push(2000)

function selectDeliveryAddress(addressOrIndex: unknown): string {
  if (
    typeof addressOrIndex === 'number' &&
    addressOrIndex < deliveryAddress.length
  ) {
    return deliveryAddress[addressOrIndex];
  } else if (typeof addressOrIndex === 'string') {
    return addressOrIndex;
  }
  return '';
}

// Oh no! This is totally OK in TypeScript, but
// myFavouriteAddress is now string, even though we just
// return true? This is going to blow up in runtime!
// const myFavouriteAddress = selectDeliveryAddress(true)

// type Article = {
//   title: string;
//   price: number;
//   vat: number;
//   stock: number;
//   description: string;
// }

const book = {
  title: 'Form Design Patterns by Adam Silver',
  price: 32.77,
  vat: 0.19,
  stock: 1000,
  description: 'A practical book on accessibility and forms',
};

const movie: Article = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
};

const movBackup = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5,
};

const newMovie: Article = movBackup;

// type ShopItem = {
//   title: string,
//   price: number,
//   vat: number,
//   stock: number,
//   description: string,
//   rating: number
// }

const shopitem = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5,
};

const anotherMovie: Article = shopitem;

// function createArticleElement(article: Article): string {
function createArticleElement(article: {
  title: string;
  price: number;
  vat: number;
}): string {
  const title = article.title;
  const price = addVAT(article.price, article.vat);
  return `<h2>Bur ${title} for ${price}</h2>`;
}

createArticleElement(shopitem);

createArticleElement(anotherMovie);

/**
 * typeof
 */

type ArticleStub = {
  price: number;
  vat: number;
  title: number;
};

type Address = {
  city: string;
  zip: string;
  street: string;
  number: string;
};

type Customer = {
  name: string;
  addres: Address;
  dateOfBirth: Date;
};

// type Order = {
//   articles: ArticleStub[],
//   customer: Customer
// }

const defaultOrder = {
  articles: [
    {
      price: 1200.5,
      vat: 0.2,
      title: 'Macbook Air Refurbished - 2013',
    },
    {
      price: 9,
      vat: 0,
      title: 'I feel smashing subscription',
    },
  ],
  customer: {
    name: 'Fritz Furball',
    address: {
      city: 'Smashing Hall',
      zip: '90210',
      street: 'Whisker-ia Lane',
      number: '1337',
    },
    dateOfBirth: new Date(2006, 9, 1),
  },
};

type Order = typeof defaultOrder;

function checkOrders(orders: Order[]) {
  let valid = true;
  for (let order of orders) {
    valid = valid && order.articles.length > 0;
  }
  return valid;
}

/**
 * Optional Properties
 */

type OptionalArticle = {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
};

function isArticleInStock(article: OptionalArticle) {
  if (article.stock) {
    return article.stock > 0;
  }
  return false;
}

/**
 * Exporting and Importing Types
 */

export type ExportedOptionalArticle = {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
};

/**
 * Classes in JavaScript
 */

class Discount {
  isPercentage: boolean;
  amount: number;

  constructor(isPercentage: boolean, amount: number) {
    this.isPercentage = isPercentage;
    this.amount = amount;
  }

  apply(article: OptionalArticle) {
    if (this.isPercentage) {
      article.price = article.price - article.price * this.amount;
    } else {
      article.price = article.price - this.amount;
    }
  }
}

const discount = new Discount(false, 10);
discount.apply({
  price: 39,
  vat: 0.2,
  title: 'Form Design Patterns',
});

/**
 * Structural Typing with Classes
 */

let allProductsTwentyBucks: Discount = {
  isPercentage: false,
  amount: 20,
  apply(article) {
    article.price = 20;
  },
};

type DiscountType = {
  isPercentage: boolean;
  amount: number;
  apply(article: Article): void;
};

let disco: DiscountType = new Discount(true, 0.2);

/**
 * Extending Classes
 */

class TwentyPercentDiscount extends Discount {
  constructor() {
    super(true, 0.2);
  }

  apply(article: Article) {
    if (article.price <= 40) {
      super.apply(article);
    }
  }

  // isValidForDiscount(article: Article) {
  //   return article.price <= 40
  // }
}

let disco1: Discount = new TwentyPercentDiscount();

let disco2: TwentyPercentDiscount = new Discount(true, 0.3);

/**
 * Describing Interfaces
 */

// Our Article type
type Article = {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
};
// Our friend’s ShopItem
interface ShopItem {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
} // And yes, the semicolons are optional

const discount1 = new Discount(true, 0.2)
const shopItem: ShopItem = {
  title: 'Inclusive components',
  price: 30,
  vat: 0.2
}

discount.apply(shopItem)

class DVD implements ShopItem {
  title: string
  price: number
  vat: number

  constructor(title: string) {
    this.title = title
    this.price = 9.99
    this.vat = 0.2
  }
}

class Book implements Article {
  title: string
  price: number
  vat: number

  constructor(title: string) {
    this.title = title
    this.price = 39
    this.vat = 0.2
  }
}

let book1 = new Book('Art Direction on the web')
discount.apply(book1)

let dvd = new DVD('Contagion')
discount.apply(dvd)

/**
 * Declaration Merging
 */

interface ShopItem {
  reviews: {
    rating: number,
    content: string
  }[]
}

/**
 * Property Access Modifiers
 */

class AnotherArticle {
  public title: string
  #price: number

  constructor(title: string, price: number) {
    this.title = title
    this.#price = price
  }
}

const article1 = new AnotherArticle('Smashing Book 6', 39)

console.log(article1.price)

class AnotherArticle1 {
  constructor(private price: number) {

  }
}
