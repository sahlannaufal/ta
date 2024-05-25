import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Location from 'App/Models/Location'

export default class FindRoadDamagesController {
  public async index({ request, response }: HttpContextContract) {
    const { latitude, longitude, radius } = await request.only(['latitude', 'longitude', 'radius'])

    // Menggunakan radius default 100 meter jika tidak ada input radius dari pengguna
    const searchRadius = radius || 100
    // Query menggunakan ST_DWithin untuk mencari titik dalam radius yang diinginkan
    const locations = await Database
      .from('locations')
      .select('*')
      .whereRaw(`ST_DWithin(ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), geom, ${searchRadius})`)

    response.send(locations)
  }
}
