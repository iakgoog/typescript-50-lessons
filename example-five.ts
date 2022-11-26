/**
 * Generics
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
