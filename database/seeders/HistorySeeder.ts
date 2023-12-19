import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import History from 'App/Models/History'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method

    await History.query().delete()

    History.create({
      date: '2023-05-05',
      macam_kerusakan: 'lobang',
      perolehan_data: 'survey',
      sebab_kerusakan: 'genangan air',
      location_id: 1
    })
  }
}
