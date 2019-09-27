import { indent, niceString } from '../src/utils'

describe('utils', () => {
  it('indents', () => {
    const fixture = `something\n  indentedSomething\n`

    expect(indent(fixture)).toMatchInlineSnapshot(`
      "  something
          indentedSomething"
    `)
  })

  it('trims niceStrings', () => {
    const fixture = niceString`
      I'm writing
        some indented
          smth
        ABC
    `

    let res = ''

    res += `I'm writing\n`
    res += `  some indented\n`
    res += `    smth\n`
    res += `  ABC`

    expect(fixture).toMatchInlineSnapshot(`
      "I'm writing
        some indented
          smth
        ABC"
    `)

    expect(fixture).toEqual(res)
  })
})
