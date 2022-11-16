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

function performSearch(
  query: string,
  callback: (results: Result[]) => void, /* undefined */
  tags?: string[],
) {
  let queryString = `?query=${query}`
  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }
  fetch(`/search${queryString}`)
    .then(response => response.json() as Promise<Result[]>)
    // .then(results => {
    //   const didItWork = callback(results)
    //   // didItWork is undefined! This causes an error
    //   didItWork += 2
    // })
    .then(results => void callback(results))
}

/**
 * Function Types
 */

type SearchFn = typeof performSearch

/**
 * Function Types in Objects
 */

type AssembleFn = (includeTags: boolean) => string

type Query = {
  query: string,
  tags?: string[],
  assemble: AssembleFn
}

const query: Query = {
  query: 'Ember',
  tags: ['javascript'],
  assemble(includeTags = false) {
    let query = `?query=${this.query}`
    if(includeTags && typeof this.tags !== 'undefined') {
      query += `&${this.tags.join(',')}`
    }
    return query
  }
}

/**
 * Function Types in Functions
 */

declare function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFn
): void

/**
 * Anonymous Functions
 */

displaySearch('searchField', 'result', performSearch)

displaySearch(
  'searchField',
  'result',
  function(query, tags) {
    return Promise.resolve([{
      title: `The ${query} test book`,
      url: `/${query}-design-patterns`,
      abstract: `A practical book on ${query}`
    }])
  }
)

const testSearch: SearchFn = function(query, tags) {
  return Promise.resolve([{
    title: `The ${query} test book`,
    url: `/${query}-design-patterns`,
    abstract: `A practical book on ${query}`
  }])
}

/* const testSearch: SearchFn = function(term, options) {
  return Promise.resolve([{
    title: `The ${term} test book`,
    url: `/${term}-design-patterns`,
    abstract: `A practical book on ${term}`
  }])
} */

/* const testSearch: SearchFn = function(term) {
  return Promise.resolve([{
    title: `The ${term} test book`,
    url: `/${term}-design-patterns`,
    abstract: `A practical book on ${term}`
  }])
} */

/**
 * Number of Parameters
 */

// we can also drop arguments entirely if we don't have any use for them:
const dummyContentSearchFn: SearchFn = function() {
  return Promise.resolve([{
    title: 'Form Design Patterns',
    url: '/form-design-patterns',
    abstract: 'A practical book on accessible forms'
  }])
}
// JavaScript still allows us to pass the parameters; we just don’t do anything with them.
// This makes dummyContentSearchFn, with no parameters, compatible with the type SearchFn.

dummyContentSearchFn('Ember') // Good!
dummyContentSearchFn('Ember', ['JavaScript']) // Good!

dummyContentSearchFn()

/**
 * void
 */

performSearch('Ember', function(results) {
  console.log(results)
})

function searchHandler(results: Result[]) {
  console.log(results)
}

performSearch('Ember', searchHandler)

// we can also pass functions that have a different return type
// Search handler now returns a number
function searchHandler2(results: Result[]): number { return results.length
}
// Totally OK!
performSearch('Ember', searchHandler2)

// This function shows results in an HTML element // but also returns the container element that // has been filled
function showResults(results: Result[]) {
  const container = document.getElementById('results')
  if(container) {
    container.innerHTML = `<ul>
      ${results.map(el => `<li>${el.title}</li>`)}
    <ul>`;
  }
  return container;
}
// Somewhere in our app, we show a list of // pages on click
// button.addEventListener('click', function() {
//   const el = showResults(storedResults)
//   if(el) {
//     el.style.display = 'block'
//   }
// })
// But hey, this function also makes a good
// search handler

/**
 * The Implementation
 */

function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFn
): void {
  document.getElementById(inputId)?.
    addEventListener('change', function() {
      this.parentElement?.classList.add('active')
      const searchTerm = this.value
    })
}