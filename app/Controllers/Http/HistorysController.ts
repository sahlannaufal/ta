import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from 'App/Models/History'
import Location from 'App/Models/Location'
import Penanganan from 'App/Models/Penanganan'
import Photo from 'App/Models/Photo'
import Video from 'App/Models/Video'
import Database from '@ioc:Adonis/Lucid/Database'
import Application from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'


export default class HistorysController {
    public async index({ response }: HttpContextContract) {  
        const historys = await History.query()
        return response.json({
        data: {
          historys: historys
        }
      })
    }

    public async store({ request, response, auth}: HttpContextContract) {
        let {latitude, longitude, provinsi, kabupaten_kota, kecamatan, desa, date, panjang_kerusakan, macamKerusakan, perolehanData,sebabKerusakan, locationId, uraian, cacah, biaya, history_id,is_handle,name, photo,description,video} = request.body()
        
        try {
          let location = await Location.query().where('latitude', latitude).andWhere('longitude', longitude).first()
          
          const result = await Database.transaction(async (trx) => {
          if (!location) {
              location = await Location.create({
              latitude: latitude,
              longitude: longitude,
              provinsi: provinsi,
              kabupaten_kota: kabupaten_kota,
              kecamatan: kecamatan,
              desa: desa,
              date: date,
              panjang_kerusakan: panjang_kerusakan,
              userId: auth?.user?.id
              },{client: trx})       
          }
          const history = await History.create({
            date: date,
            macamKerusakan: macamKerusakan,
            perolehanData: perolehanData,
            sebabKerusakan: sebabKerusakan,
            locationId: location.id,
            userId: auth?.user?.id
          },{client: trx})
          const penanganans = await Penanganan.create({
              date: date,
              uraian: 'belum ditangani',
              cacah: 'belum diketahui',
              biaya: '0',
              historyId: history.id,
              isHandle: false,
              userId: auth?.user?.id
            },{client: trx})
            photo = request.file('photo', {
                size: '2mb',
                extnames: ['jpg','png','jpeg']
            })
    
            const nameFilePhoto = `${string.generateRandom(32)}.${photo.subtype}`
            await photo.move(Application.tmpPath('photo'),{
                name: nameFilePhoto
            })
            const newPhoto = await Photo.create({
              name: name,
              photo: `photo/${nameFilePhoto}`,
              locationId: location.id,
              userId: auth?.user?.id
            },{client: trx})
            
            video = request.file('video', {
                size: '10mb',
                extnames: ['mp4', 'mov', 'avi']
            })
      
            const nameFileVideo = `${string.generateRandom(32)}.${video.subtype}`
                await video.move(Application.tmpPath('photo'),{
                    name: nameFileVideo
                })
            const newVideo = await Video.create({
              description: description,
              video: `photo/${nameFileVideo}`,
              locationId: location.id,
              userId: auth?.user?.id
          },{client: trx})
          });
  
          return response.json({
            message: 'success insert history'
          })
        }
          catch (error) {
          return response.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
          })
        }
      }

      public async show({ params, response}: HttpContextContract) {
        const {id} = params
        const history = await History.query()
        .where('id', id)
        .preload('location')
        .preload('penanganan')
        .firstOrFail()

        return response.json({
          message: 'success',
          history: history,
        });
      }


      public async update({ params, request, response, auth }: HttpContextContract) {
        const { id } = params
        const { date, macamKerusakan, perolehanData, sebabKerusakan } = request.body()

        const history = await History.query().where({
          id: id,
        }).firstOrFail()
        history.merge({
          date: date,
          macamKerusakan: macamKerusakan,
          perolehanData: perolehanData,
          sebabKerusakan: sebabKerusakan,
        }).save()

        return response.json({
          message: 'success update history'
        })
      }

      public async destroy({ params, response, auth}: HttpContextContract) {
          //get param
          const {id} = params
      
          //get exist location data
          const history = await History.query()
            .where({ 
              id: id,
            })
            .firstOrFail()
      
          //delete query
          await history.delete()
      
          return response.json({
            message: 'Success delete data'
          })
        }
}
