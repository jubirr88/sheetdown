#!/usr/bin/env node

var makeTable = require('./makeTable.js')
var fs = require('fs')

var key = process.argv[2]

var save = false

if (process.argv[3] && process.argv[3].match("--save")) {
  save = true
}

if (key && !save) {
  makeTable(key, function callback(err, table) {
    if (err != "null") return console.log(err)

    console.log(table)
  })
}

if (key && save) {
  makeTable(key, function callback(err, table) {
    if (err != "null") return console.log(err)

    fs.writeFile('table.md', table.toString(), function (err) {
      if (err) return console.log(err)
    })
    console.log('table has been created and saved')
  })
}

if (!key) {
  return console.log("To use: `$ sheetdown SPREADSHEETKEY --save`\n" +
                     "Or: `$ sheetdown SPREADSHEETKEY | pbcopy")
}
