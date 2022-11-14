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