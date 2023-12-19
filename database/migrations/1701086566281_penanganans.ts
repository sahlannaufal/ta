import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'penanganans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.date('date').notNullable()
      table.string('uraian')
      table.string('cacah')
      table.string('biaya').notNullable()
      table.integer('history_id').unsigned().notNullable().references('id').inTable('historys').onDelete('CASCADE')
      table.boolean('is_handle').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
 