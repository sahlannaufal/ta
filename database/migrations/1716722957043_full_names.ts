import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddFullNameAndPhoneNumberToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('nama_lengkap', 255).notNullable().defaultTo('') // Menambahkan kolom nama_lengkap dengan default ''
      table.string('nomor_telepon', 15).notNullable().defaultTo('') // Menambahkan kolom nomor_telepon dengan default ''
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('nama_lengkap') // Menghapus kolom nama_lengkap jika terjadi rollback
      table.dropColumn('nomor_telepon') // Menghapus kolom nomor_telepon jika terjadi rollback
    })
  }
}
