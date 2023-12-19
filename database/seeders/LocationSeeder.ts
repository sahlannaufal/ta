import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Location from 'App/Models/Location'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import History from 'App/Models/History'

export default class extends BaseSeeder {
  public async run () {
    //delete exist data
    await Location.query().delete()

    //insert user
    // for (let indexUser = 0; indexUser < 3; indexUser++) {
    //   const user = await User.create({
    //     email: `user${indexUser+1}@email.com`,
    //     password: (await Hash.make('password'))
    //   })

    // insert new data location
    Location.create({
      // user_id: user.id,
      latitude: '-6.223445',
      longitude: '123.45532',
      provinsi: 'Jawa Barat',
      kabupaten_kota: 'Bogor',
      kecamatan: 'Dramaga',
      desa: 'Babakan'
    })

    
      
    }
  }
// }
