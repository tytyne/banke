'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table.string('accountName',80).notNullable()
      table.string('accountNumber',90).notNullable()
      table.enu('transactionName', ['withdraw', 'deposit']).notNullable()
      table.integer('amount').notNullable()
      table.date('transactionDate',50)
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
