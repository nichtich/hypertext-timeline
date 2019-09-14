#!/usr/bin/env node

const stdin = process.stdin
const input = []

stdin.resume()
stdin.setEncoding('utf8')
stdin.on('data', chunk => input.push(chunk))
stdin.on('end', () => {
  console.log('year|name|creators|environments')
  console.log('--|--------|-------|----')
  JSON.parse(input.join()).forEach(row => {
    console.log([row.year, row.name, row.creators, row.environments].join('|'))
  })
  const time = (new Date()).toISOString().replace('T',' ').replace(/\..+/, '')
  console.log(`
Table: Information about hypertext systems in Wikidata (${time})`)
})
