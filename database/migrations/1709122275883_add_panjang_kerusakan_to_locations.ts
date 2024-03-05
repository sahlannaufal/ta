// database/migrations/timestamp_add_panjang_kerusakan_to_locations.js

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddPanjangKerusakanToLocations extends BaseSchema {
  protected tableName = 'locations'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.decimal('panjang_kerusakan', 10, 2).nullable()
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('panjang_kerusakan')
    })
  }
}
