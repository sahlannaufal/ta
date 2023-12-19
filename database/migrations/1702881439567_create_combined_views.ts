import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateCombinedView extends BaseSchema {
  protected tableName = 'combined_view'

  public async up() {
    this.schema.raw(`
      CREATE VIEW ${this.tableName} AS
        SELECT
          l.id AS location_id,
          l.user_id AS location_user_id,
          l.latitude,
          l.longitude,
          l.provinsi,
          l.kabupaten_kota,
          l.kecamatan,
          l.desa,
          l.date AS location_date,
          l.geom AS location_geom,
          h.id AS history_id,
          h.user_id AS history_user_id,
          h.date AS history_date,
          h.macam_kerusakan,
          h.perolehan_data,
          h.sebab_kerusakan,
          h.location_id AS history_location_id,
          p.id AS penanganan_id,
          p.user_id AS penanganan_user_id,
          p.date AS penanganan_date,
          p.uraian,
          p.cacah,
          p.biaya,
          p.history_id AS penanganan_history_id,
          p.is_handle,
          p.created_at AS penanganan_created_at,
          p.updated_at AS penanganan_updated_at
        FROM
          locations l
        LEFT JOIN
          historys h ON l.id = h.location_id
        LEFT JOIN
          penanganans p ON h.id = p.history_id
    `)
  }

  public async down() {
    this.schema.raw(`DROP VIEW IF EXISTS ${this.tableName}`)
  }
}
