'use strict'

function Record(agent) {
  this.agents = agent ? [agent] : []
  this.rules = []
}

function RobotRules(text) {
  if (!(this instanceof RobotRules)) {
    return new RobotRules(text);
  }

  this.records = []
  this.starRecord = null

  let lines = text.split(/\r?\n/),
      record = new Record()

  this.records.push(record)

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/^\s+|\s*#.*/g, '')

    if (line === '') {
      continue
    }

    let keyValue = line.split(/\s*:\s*/)

    if (keyValue.length != 2) {
      continue
    }

    let key = keyValue[0].toLowerCase(),
        value = keyValue[1]

    if (key === 'user-agent') {
      value = value.toLowerCase()
      if (record.rules.length > 0) {
        record = new Record(value)
        this.records.push(record)
      }
      else {
        record.agents.push(value)
      }
      if (value === '*') {
          this.starRecord = record
      }
    }
    else if (key === 'allow') {
      record.rules.push([decodeURIComponent(value), true])
    }
    else if (key === 'disallow') {
      record.rules.push([decodeURIComponent(value), false])
    }
    else {
      ;
    }
  }

  this.findRecord = function(agent) {
    if (!agent) return this.starRecord

    agent = agent.toLowerCase()

    for (let i = 0; i < this.records.length; i++) {
      let record = this.records[i]
      for (let j = 0; j < record.agents.length; j++) {
        if (agent.indexOf(record.agents[j]) >= 0) {
          return record
        }
      }
    }

    return this.starRecord
  }

  // Path must be url decoded
  this.allow = function(agent, path) {
    let record = this.findRecord(agent)
    if (!record) return true
    for (let i = 0; i < record.rules.length; i++) {
      let rule = record.rules[i]
      if (path.indexOf(rule[0]) === 0) {
        return rule[1]
      }
    }
    return true
  }
}

module.exports = RobotRules
