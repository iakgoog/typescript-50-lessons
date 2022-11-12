//@ts-check

/** @typedef { import('./@types/types').ShipStorage } ShipStorage */
/** @typedef { import('./@types/types').StorageItem } StorageItem */

/** @type ShipStorage */
const storage = {
  max: 6000,
  items: []
}

Object.defineProperty(storage, 'max', { writable: false, value: 5000 })

let currentStorage = undefined

function storageUsed() {
  if (currentStorage) {
    return currentStorage
  }
  currentStorage = 0
  for (let i = 0; i < storage.items.length; i++) {
    currentStorage += storage.items[i].weight
  }
  return currentStorage
}

/**
 * @param {StorageItem} item
 */
function add(item) {
  if (storage.max - item.weight >= storageUsed()) {
    storage.items.push(item)
    currentStorage += item.weight
  }
  if (isDevelopment) {
    console.log(`isDevelopment => `, isDevelopment)
  }
}

add({ weight: 3000 })