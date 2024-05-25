import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class extends BaseSeeder {
  public async run () {
    await User.createMany([
      {
        email: 'admin1@gmail.com',
        password: await Hash.make('123456'),
        role: 'admin',
      },
      {
        email: 'admin2@gmail.com',
        password: await Hash.make('123456'),
        role: 'admin',
      },
      {
        email: 'admin3@gmail.com',
        password: await Hash.make('123456'),
        role: 'admin',
      },
    ])
  }
}
