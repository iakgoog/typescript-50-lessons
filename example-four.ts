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
    default:
      throw new Error('Not sure what to do with that!')
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
