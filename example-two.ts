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

function selectDeliveryAddress(addressOrIndex: any): string {
  if (typeof addressOrIndex === 'number' && addressOrIndex < deliveryAddress.length) {
    return deliveryAddress[addressOrIndex]
  }
  return addressOrIndex
}

// Oh no! This is totally OK in TypeScript, but
// myFavouriteAddress is now string, even though we just
// return true? This is going to blow up in runtime!
// const myFavouriteAddress = selectDeliveryAddress(true)