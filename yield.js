function* play(text) {
  let l = text.substring(text.length - 1)
    let n = l.charCodeAt(0) - 1
    let nc = String.fromCharCode(n)
  let acc = nc
  do {
    // const nextChar = String.fromCharCode(text.substring(-1).charCodeAt(0) + 1)
    let lastChar = acc.substring(acc.length - 1)
    let nextCharCode = lastChar.charCodeAt(0) + 1
    let nextChar = String.fromCharCode(nextCharCode)
    acc = nextChar
    yield acc
  } while (true)
}

function tryPlay() {
  let rplay = play('a')
  let next = 'a'
  for (const c of play('a')) {
    console.log(c)
    if (c === 'z') break
  }
}

tryPlay()