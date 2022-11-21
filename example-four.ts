/**
 * Intersection Types
 */

type Talk = {
  title: string,
  abstract: string,
  speaker: string
}

type TechEventBase = {
  title: string,
  description: string,
  date: Date,
  capacity: number,
  rsvp: number,
  kind: string
}

type Conference = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[]
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[]
}

type Webinar = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk
}

/**
 * Union Types
 */

type TechEvent = Webinar | Conference | Meetup;

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

type EventKind = 'webinar' | 'conference' | 'meetup'

let tomorrowsEvent: EventKind = 'concert'

