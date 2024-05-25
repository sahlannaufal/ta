
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddRoleToUsers extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.string('role').notNullable().defaultTo('user') // Menambahkan kolom role dengan nilai default 'user'
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('role') // Menghapus kolom role jika terjadi rollback
    })
  }
}
