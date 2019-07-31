'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')


class AccountSchema extends Schema {

  static get connection(){
    return 'mysql'
  }
  up () {
    this.create('accounts', (table) => {
      table.increments()
      table.string('accountName', 80).notNullable()
      table.string('NID', 80).notNullable() 
      table.enu('status', ['draft', 'dormart','active']).notNullable().defaultTo('draft')
      table.integer('amount', 80).notNullable().defaultTo(0)
      table.string('accountNumber', 80).notNullable()
      table.timestamps()
      table.integer('user_id').unsigned().references('id').inTable('users');
    })
  }

  down () {
    this.drop('accounts')
  }
}

module.exports = AccountSchema
