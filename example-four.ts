/**
 * Intersection Types
 */

type Talk = {
  title: string,
  speaker: string
  abstract?: string,
}

type TechEventBase = {
  title: string,
  description: string,
  date: Date,
  capacity: number,
  rsvp: number,
}

type Conference = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[]
  kind: 'conference'
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[],
  kind: 'meetup'
}

type Webinar = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk,
  kind: 'webinar'
}

/**
 * Union Types
 */

type Hackathon = TechEventBase & {
  location: string,
  price?: number,
  kind: 'hackathon'
}

type TechEvent = Conference | Webinar | Meetup | Hackathon

function printEvent(event: TechEvent) {
  if (event.price) {
    if (typeof event.price === 'number') {
      console.log('Price in EUR: ', event.price)
    } else {
      console.log('It is free!')
    }
  }
  if (Array.isArray(event.talks)) {
    event.talks.forEach(talk => {
      console.log(talk.title)
    })
  } else {
    console.log(event.talks.title)
  }
}

/**
 * Object Sets
 */

type Name = {
  name: string
}

type Age = {
  age: number
}

type Person = Age & Name

const person: Person = {
  name: 'Sutthinart Khunvadhana',
  age: 40
}

/**
 * Value TYpes
 */

let withTypeAny: any = 'conference'
let withTypeString: string = 'conference'

let withValueType: 'conference' = 'conference'

let conference = 'conference'

const conf = 'conference'

declare const newEvent: TechEvent

console.log(newEvent['kind'])

// type EventKind = 'webinar' | 'conference' | 'meetup'
type EventKind = TechEvent['kind']

let tomorrowsEvent: EventKind = 'concert'

/**
 * Working with Value Types
 */

function getEventTeaser(event: TechEvent) {
  switch(event.kind) {
    case 'conference':
      return `${event.title} (Conference), ` + `priced at ${event.price} USD`
    case 'meetup':
      return `${event.title} (Meetup), ` + `hosted at ${event.location}`
    case 'webinar':
      return `${event.title} (Webinar), ` + `available online at ${event.url}`
    case 'hackathon':
      return `${event.title} (Hackathon), ` + `hosted at ${event.location}`
    default:
      throw neverError('Not sure what to do with that!', event)
  }
}

/**
 * Discriminated Union Types
 */

/**
 * Fixating Value Types
 */

const script19 = {
  title: 'ScriptConf',
  date: new Date('2019-10-25'),
  capacity: 300,
  rsvp: 289,
  description: 'The feel-good JS conference',
  kind: 'conference' as const,
  price: 129,
  location: 'Central Linz',
  talks: [{
    speaker: 'Vitaly Friedman',
    title: 'Designing with Privacy in mind',
    abstract: '...'
  }]
};

getEventTeaser(script19)

/**
 * Dynamic Unions
 */

function filterByKind(
  list: TechEvent[],
  kind: EventKind,
): TechEvent[] {
  return list.filter(el => el.kind === kind)
}

declare const eventList: TechEvent[];

filterByKind(eventList, 'conference')
filterByKind(eventList, 'webinar')
filterByKind(eventList, 'meetup')

filterByKind(eventList, 'concert')

/**
 * Lookup Types
 */

filterByKind(eventList, 'hackathon')

/**
 * Mapped Types
 */

// type GroupedEvents = {
//   conference: TechEvent[],
//   meetup: TechEvent[],
//   webinar: TechEvent[],
//   hackathon: TechEvent[]
// }
type GroupedEvents = {
  [Kind in EventKind]: TechEvent[]
}

function groupEvents(events: TechEvent[]): GroupedEvents {
  const grouped = {
    conference: [],
    meetup: [],
    webinar: [],
    hackathon: []
  };
  events.forEach(el => {
    grouped[el.kind].push(el)
  })
  return grouped
}

type UserEvents = {
  watching: TechEvent[],
  rvsp: TechEvent[],
  attended: TechEvent[],
  signedout: TechEvent[],
}

/**
 * Keyof
 */

// type UserEventCategory = 'watching' | 'rsvp' | 'attended' | 'signedoff'
type UserEventCategory = keyof UserEvents

type TalkProperties = keyof Talk

type StringKeys = keyof 'speaker'

type ArrayKeys = keyof []

function filterUserEvent(
  userEventList: UserEvents,
  category: string,
  filterKind?: EventKind,
) {
  if (isUserEventListCategory(userEventList, category)) {
    const filteredList = userEventList[category]
    if (filterKind) {
      return filteredList.filter(event => event.kind === filterKind)
    }
    return filteredList
  }
  return userEventList
}

/**
 * Type Predicates
 */

function isUserEventListCategory(
  list: UserEvents,
  category: string,
): category is keyof UserEvents { // The type predicate
  return Object.keys(list).includes(category)
}

/**
 * never in Control Flow Analysis
 */

/**
 * Preparing for Dynamic Updates
 */

function neverError(
  message: string,
  token: never, // The culprit
) {
  return new Error(`${message}. ${token} should not exist`)
}

/**
 * undefined and null in the Type Space
 */

let age: number

age = age + 1

function getTeaserHTML(event: TechEvent) {
  return `<h2>${event.title}</h2>
    <p>
      ${event.description}
    </p>
  `
}

function getTeaserListElement(event: TechEvent) {
  const content = getTeaserHTML(event)
  const element = document.createElement('li')
  element.classList.add('teaser-card')
  element.innerHTML = content
  return element
}

function appendEventToList(event: TechEvent) {
  const list = document.querySelector('#event-list')
  const element = getTeaserListElement(event)
  list?.append(element)
}

/**
 * Strict null Checks
 */


