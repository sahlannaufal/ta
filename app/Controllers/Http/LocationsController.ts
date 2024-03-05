import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Location from 'App/Models/Location'

export default class LocationsController {
  public async index({ response, auth }: HttpContextContract) {  
    const locations = await Location.query().select('*')
    return response.json({
    data: {
      locations: locations
    }
  })
}
// public async asdxc({request, response}:HttpContextContract){
//   const {lat, long} = request.body()
//   let locations = await Location.query().select('lat', 'long')
//   var targetPoint = turf.point([lat, long]}s
//     var points = turf.featureCollection(locations)
//     const have = turf.nearestPoint(targetPoint, points)
//     if (have) {
//       let locations = await Location.query().where('lat', have.lat).andWhere('long', have.long)
//     }


// }

  public async store({ request, response, auth}: HttpContextContract) {
    const {latitude, longitude, provinsi, kabupaten_kota, kecamatan, desa, date, panjang_kerusakan} = request.body()
    await Location.create({
      latitude: latitude,
      longitude: longitude,
      provinsi: provinsi,
      kabupaten_kota: kabupaten_kota,
      kecamatan: kecamatan,
      desa: desa,
      date: date,
      panjang_kerusakan: panjang_kerusakan,
      userId: auth?.user?.id
    })

    return response.json({
      message: 'success insert location'
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const {id} = params
    const location = await Location.query()
      .where({ 
        id: id
      })
      .firstOrFail()
      
      return response.json({
        data: {
          location: location
        }
      })
  }

  public async update({ params,request,response, auth }: HttpContextContract) {
    //get param
    const {id} = params

    //get body request
    const {latitude, longitude, provinsi, kabupaten_kota, kecamatan, desa, date, panjang_kerusakan} = request.body()

    //get exist location data
    const location = await Location.query()
      .where({ 
        id: id
      })
      .firstOrFail()

      //update query
      location.merge({
        latitude: latitude,
        longitude: longitude,
        provinsi: provinsi,
        kabupaten_kota: kabupaten_kota,
        kecamatan: kecamatan,
        desa: desa,
        date: date,
        panjang_kerusakan: panjang_kerusakan,
      }).save()

      return response.json({
        message: 'Success update data'
      })
  }

  public async destroy({ params, response, auth}: HttpContextContract) {
    //get param
    const {id} = params

    //get exist location data
    const location = await Location.query()
      .where({ 
        id: id,
      })
      .firstOrFail()

    //delete query
    await location.delete()

    return response.json({
      message: 'Success delete data'
    })
  }
}
