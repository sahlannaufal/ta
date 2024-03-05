import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Location from 'App/Models/Location'

export default class FindRoadDamagesController {
  public async index({ request, response }: HttpContextContract) {
    const { latitude, longitude } = await request.only(['latitude', 'longitude'])

    // Query menggunakan ST_DWithin untuk mencari titik dalam radius 100 meter
    const locations = await Database
      .from('locations')
      .select('*')
      .whereRaw(`ST_DWithin(ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326), geom, 100)`)

    response.send(locations)
  }
}
