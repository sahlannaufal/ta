import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.string('provinsi').notNullable()
      table.string('kabupaten_kota').notNullable()
      table.string('kecamatan').notNullable()
      table.string('desa').notNullable()
      table.date('date').notNullable()
      table.string('panjang_kerusakan').nullable()
      table.specificType('geom', 'geometry(point,4326)')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
