'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {

  static get connection(){
    return 'mysql'
  }
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable()
      table.string('email', 254).notNullable()
      table.string('password', 60).notNullable()
      table.boolean('isAdmin').notNullable().defaultTo('false')
      table.boolean('isStaff').notNullable().defaultTo('false')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
