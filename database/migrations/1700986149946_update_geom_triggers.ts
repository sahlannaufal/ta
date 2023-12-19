import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  public async up () {
    const query = `
      CREATE OR REPLACE FUNCTION update_geom_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude::numeric, NEW.latitude::numeric), 4326);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
      
      CREATE TRIGGER update_geom_trigger
      BEFORE INSERT OR UPDATE 
      ON ${this.tableName}
      FOR EACH ROW
      EXECUTE FUNCTION update_geom_column();
    `
    this.schema.raw(query)
  }

  public async down () {
    const query = `
      DROP TRIGGER IF EXISTS update_geom_trigger ON ${this.tableName};
      DROP FUNCTION IF EXISTS update_geom_column();
    `
    this.schema.raw(query)
  }
}
