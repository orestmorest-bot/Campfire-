// Turns spoken number words into digits, token by token.
//
// Speech recognition sometimes writes numbers as words ("three sixteen") and sometimes
// as digits ("3 16"). This module makes both look the same so the parser only has to
// deal with digits.
//
// Rules that matter for Bible references:
//   "three sixteen"            -> "3 16"   (two separate numbers, never 316)
//   "twenty one"               -> "21"
//   "one hundred nineteen"     -> "119"
//   "a hundred and nineteen"   -> "119"
//   "sixteen seventeen"        -> "16 17"

const ONES = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
}
const TEENS = {
  ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
}
const TENS = {
  twenty: 20, thirty: 30, forty: 40, fourty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
}

function isNumberWord(token) {
  return token in ONES || token in TEENS || token in TENS
}

export function replaceNumberWords(tokens) {
  const out = []
  // current = the number we are building up. state tells what part of it we have so far.
  //   'ones'     - a single digit word ("three"); it may still become "three hundred"
  //   'teen'     - ten to nineteen; complete on its own
  //   'tens'     - twenty to ninety; may still take a ones word ("twenty" + "one")
  //   'hundreds' - "X hundred"; may still take tens/ones/teens
  //   'done'     - complete, nothing more can be added
  let current = null

  const flush = () => {
    if (current) {
      out.push(String(current.value))
      current = null
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]

    if (t in ONES) {
      const v = ONES[t]
      if (current && (current.state === 'tens' || current.state === 'hundreds') && v > 0) {
        current.value += v
        current.state = 'done'
        continue
      }
      flush()
      current = { value: v, state: 'ones' }
      continue
    }

    if (t in TEENS) {
      const v = TEENS[t]
      if (current && current.state === 'hundreds') {
        current.value += v
        current.state = 'done'
        continue
      }
      flush()
      current = { value: v, state: 'teen' }
      continue
    }

    if (t in TENS) {
      const v = TENS[t]
      if (current && current.state === 'hundreds') {
        current.value += v
        current.state = 'tens'
        continue
      }
      flush()
      current = { value: v, state: 'tens' }
      continue
    }

    if (t === 'hundred' || t === 'hundreds') {
      if (current && current.state === 'ones' && current.value > 0) {
        current.value *= 100
        current.state = 'hundreds'
        continue
      }
      // "a hundred" or a bare "hundred"
      flush()
      current = { value: 100, state: 'hundreds' }
      continue
    }

    if (t === 'a' && tokens[i + 1] === 'hundred') {
      // "a hundred nineteen": drop the "a", the "hundred" branch above will take over
      flush()
      continue
    }

    if (t === 'and' && current && current.state === 'hundreds' && isNumberWord(tokens[i + 1] || '')) {
      // "one hundred and nineteen": swallow the "and"
      continue
    }

    flush()
    out.push(t)
  }

  flush()
  return out
}

export function isNumberToken(token) {
  return typeof token === 'string' && /^\d+$/.test(token)
}
