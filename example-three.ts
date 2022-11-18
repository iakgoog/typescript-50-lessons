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
): Promise<Result[]>

/*
search('Ember', ['JavaScript'])
search('Ember')
search('Ember', [])
*/

/**
 * Asynchronous Back-End Calls
 */


function search(
  query: string,
  callback: (results: Result[]) => undefined, // void
  tags?: string[],
) {
  let queryString = `?query=${query}`
  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }
  return fetch(`/search${queryString}`)
    .then(response => response.json())
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

type SearchFn = typeof search

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

displaySearch('searchField', 'result', search)

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

search('Ember', function(results) {
  console.log(results)
})

function searchHandler(results: Result[]) {
  console.log(results)
}

search('Ember', searchHandler)

// we can also pass functions that have a different return type
// Search handler now returns a number
function searchHandler2(results: Result[]): number { return results.length
}
// Totally OK!
search('Ember', searchHandler2)

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

/*
<form action="/search" method="POST">
  <label for="search">Search the site</label>
  <input type="search" id="search">
  <button type="submit">
</form>
<div id="output" hidden>
</div>
*/

/**
 * Function Binding and HTML Elements
 */

/**
 * Extracting the Callback
 */

function inputChangeHandler(this: HTMLElement) {
  this.parentElement?.classList.add('active')
}

function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFn
): void {
  document.getElementById(inputId)?.
    addEventListener('change', inputChangeHandler)
}

/**
 * Tagged Template Literals
 */

const term = 'Ember'
const results = 12

// const result text = `You searched for ${term}, and got ${no} results`

const result = {
  title: 'A guide to @@starthl@@Ember@@endhl@@.js',
  url: '/a-guide-to-ember',
  description: 'The framework @@starthl@@Ember@@endhl@@.js in a nutshell'
}

// let markup = highlight`<li>${result.title}</li>`

function highlight(
  strings: TemplateStringsArray,
  ...values: string[]
) {
  let str = ''
  strings.forEach((templ, i) => {
    let expr = values[i]?.
      replace('@@start@@', '<em>').
      replace('@@end@@', '</em>') ?? ''
    str += templ + expr
  });
  return str
}

function createResultTemplate(results: Result[]): string {
  return `<ul>
    ${results.map(result =>
        highlight`<li>${result.title}</li>`)}
  </ul>`
}

/**
 * Rest Parameters
 */

declare function highlight(
  strings: TemplateStringsArray,
  ...values: string[]
): string
