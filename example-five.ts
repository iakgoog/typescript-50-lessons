/**
 * Genericssad6
 */

type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

declare const videos: VideoFormatURLs;
declare function loadFormat(format: string): void;

function isFormatAvailable(
  obj: VideoFormatURLs,
  key: string
): key is keyof VideoFormatURLs {
  return key in obj;
}

if (isFormatAvailable<VideoFormatURLs>(videos, format)) {
  videos[format];
}

type SubtitleURLs = {
  english: URL;
  german: URL;
  french: URL;
};

function isSubtitleAvailable(
  obj: SubtitleURLs,
  key: string
): key is keyof SubtitleURLs {
  return key in obj;
}

/**
 * Enter Generics
 */

function isAvailable<Formats extends object>(
  obj: Formats,
  key: string | number | symbol
): key is keyof Formats {
  return key in obj;
}

/**
 * Generic Annotations and Generic Inference
 */

declare const videoFormats: VideoFormatURLs;

if (isAvailable(videoFormats, format)) {
}

declare const subtitles: SubtitleURLs;

if (isAvailable(subtitles, language)) {
}

/**
 * Generics in the Wild
 */

async function randomNumber() {
  return Math.random();
}

let anArray: number[];

let anotherArray: Array<number>;

let aMixedArray: Array<number | string | boolean>;

/**
 * Generic Constraints
 */

if (isAvailable({ name: 'Stefan', age: 38 }, key)) {
}

if (isAvailable('A string', 'length')) {
}

if (isAvailable(1337, aKey)) {
}

/**
 * Defining Boundaries
 */

/**
 * Index Types
 */

type PossibleKeys = 'meetup' | 'conference' | 'hackathon' | 'webinar';

type Groups = {
  [k in PossibleKeys]: any;
};

type AnyObject = {
  [k: string]: any;
};

type URLList = {
  [k: string]: URL;
};

// function loadFile<Formats extends URLList>(
//   fileFormats: Formats,
//   format: string
// ) {

// }

/**
 * Working with Keys
 */

loadFile(videos, 'format1080p');

loadFile(videos, 'format4k');
// 4K not available
// TypeScript doesn't squiggle

/**
 * Related Type Parameters
 */

function loadVideoFormat(
  fileFormats: VideoFormatURLs,
  format: keyof VideoFormatURLs
) {}

type URLObject = {
  [k: string]: URL;
};

type Loaded<Key> = {
  format: Key;
  loaded: boolean;
};

// function loadFile<Formats extends URLObject>(
//   fileFormats: Formats,
//   format: keyof Formats
// ) {

// }

async function loadFile<Formats extends URLObject, Key extends keyof Formats>(
  fileFormats: Formats,
  format: Key
): Promise<Loaded<Key>> {
  const data = await fetch(fileFormats[format].href);
  return {
    format,
    loaded: data.status === 200,
  };
}

(async () => {
  const result = await loadFile(videos, 'format1080p');

  if (result.format !== 'format1080p') {
    throw new Error('Your implementation is wrong');
  }
})();

/**
 * Generic Mapped Types
 */

/**
 * Pick
 */

type HD = Pick<VideoFormatURLs, 'format1080p' | 'format720p'>;

// type HD = {
//   format1080: URL,
//   format720: URL
// }

/**
 * Record
 */

// type URLObject = Record<string, URL>

/**
 * Mapped and Indexed Access Types
 */

type Format360 = {
  format360p: URL;
};

type Format480 = {
  format480p: URL;
};

type Format720 = {
  format720p: URL;
};

type Format1080 = {
  format1080p: URL;
};

// type AvailableFormats = Format360 | Format480 | Format720 | Format1080;

const hq: AvailableFormats = {
  format720p: new URL('...'),
  format1080p: new URL('...'),
}

const lofi: AvailableFormats = {
  format360p: new URL('...'),
  format480p: new URL('...'),
}

// type Split = keyof VideoFormatURLs
// Equivalent to
// type Split = 'format360p' | 'format480p' | 'format720p' | 'format1080p'

// type Split = {
//   [P in keyof VideoFormatURLs]: P
// }
// Equivalent to
// type Split = {
//   format360p: 'format360p',
//   format480p: 'format480p',
//   format720p: 'format720p',
//   format1080p: 'format1080'
// }

// type Split = {
//   [P in keyof VideoFormatURLs]: P
// }[keyof VideoFormatURLs]
// Equivalent to
// type Split = 'format360p' | 'format480p' | 'format720p' | 'format1080p'

// type Split = {
//   [P in keyof VideoFormatURLs]: Record<P, VideoFormatURLs[P]>
// }[keyof VideoFormatURLs]
// Equivalent to
// type Split =
//   Record<'format360p', URL> |
//   Record<'format480p', URL> |
//   Record<'format720p', URL> |
//   Record<'format1080p', URL>
// Equivalent to
// type Split =
//   { format360p: URL } |
//   { format480p: URL } |
//   { format720p: URL } |
//   { format1080p: URL }

type Split<Obj> = {
  [Prop in keyof Obj]: Record<Prop, Obj[Prop]>
}[keyof Obj]

type AvailableFormats = Split<VideoFormatURLs>

/**
 * Mapped Type Modifiers
 */

type UserPreferences = {
  format: keyof VideoFormatURLs,
  subtitles: {
    active: boolean,
    language: keyof SubtitleURLs
  },
  theme: 'dark' | 'light'
}

/**
 * Partials
 */

const defaultUP: UserPreferences = {
  format: 'format1080p',
  subtitles: {
    active: false,
    language: 'english'
  },
  theme: 'light'
}

const UserPreferences = {
  format: 'format720p'
}

// function combinePreferences(defaultP, userP) {
//   return { ...defaultP, ...userP }
// }

function combinePreferences(
  defaultP: UserPreferences,
  userP: Optional<UserPreferences>
) {
  return { ...defaultP, ...userP }
}

type OptionalUserPreferences = {
  format?: keyof VideoFormatURLs,
  subtitiles?: {
    active?: boolean,
    language?: keyof SubtitleURLs
  },
  theme?: 'dark' | 'light'
}

type Optional<Obj> = {
  [Key in keyof Obj]?: Obj[Key]
}

const prefs = combinePreferences(
  defaultUP,
  { format: 'format720p' }
)

// type Required<Obj> = {
//   [Key in Obj]-?: Obj[Key]
// }

/**
 * Readonly
 */

type Const<Obj> = {
  readonly [Key in keyof Obj]: Obj[Key]
}

const defaultUP2: Const<UserPreferences> = {
  format: 'format1080p',
  subtitles: {
    active: false,
    language: 'english'
  },
  theme: 'light'
}

defaultUP2.format = 'format720p'
defaultUP2.subtitles.active = true

function genDefaults(obj: UserPreferences) {
  return Object.freeze(obj)
}

const defaultUP3 = genDefaults({
  format: 'format1080p',
  subtitles: {
    active: false,
    language: 'english'
  },
  theme: 'light'
})

defaultUP3.format = 'format720p'

/**
 * Deep Modifications
 */

const prefs = combinePreferences(
  defaultUP3,
  { subtitles: { language: 'german' }}
)

type DeepReadonly<Obj> = {
  readonly [Key in keyof Obj]: DeepReadonly<Obj[Key]>
}

function genDefaults(obj: UserPreferences): DeepReadonly<UserPreferences> {
  return Object.freeze(obj)
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}


