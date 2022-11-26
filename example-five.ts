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

function isAvailable<Formats>(
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
