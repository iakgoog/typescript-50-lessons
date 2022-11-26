/**
 * Genericssad6
 */

type VideoFormatURLs = {
  format360p: URL,
  format480p: URL,
  format720p: URL,
  format1080p: URL,
}

declare const videos: VideoFormatURLs
declare function loadFormat(format: string): void

function isFormatAvailable(
  obj: VideoFormatURLs,
  key: string,
): key is keyof VideoFormatURLs {
  return key in obj
}

if (isFormatAvailable<VideoFormatURLs>(videos, format)) {
  videos[format]
}

type SubtitleURLs = {
  english: URL,
  german: URL,
  french: URL,
}

function isSubtitleAvailable(
  obj: SubtitleURLs,
  key: string,
): key is keyof SubtitleURLs {
  return key in obj
}

/**
 * Enter Generics
 */

function isAvailable<Formats extends object>(
  obj: Formats,
  key: string | number | symbol
): key is keyof Formats {
  return key in obj
}

/**
 * Generic Annotations and Generic Inference
 */

declare const videoFormats: VideoFormatURLs

if (isAvailable(videoFormats, format)) {

}

declare const subtitles: SubtitleURLs

if (isAvailable(subtitles, language)) {

}

/**
 * Generics in the Wild
 */

async function randomNumber() {
  return Math.random()
}

let anArray: number[]

let anotherArray: Array<number>

let aMixedArray: Array<number | string | boolean>

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


