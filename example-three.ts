/**
 * Typing Function Heads & Optional Parameters
 */

type Result = {
  title: string,
  url: string,
  abstract: string
}

declare function search(
  query: string,
  tags?: string[]
): Result[]


search('Ember', ['JavaScript'])
search('Ember')
search('Ember', [])

/**
 * Asynchronous Back-End Calls
 */

function performSearch(query: string, tags?: string[]): Promise<Result[]> {
  let queryString = `?query=${query}`

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }

  return fetch(`/search${queryString}`)
    .then(response => response.json())
}