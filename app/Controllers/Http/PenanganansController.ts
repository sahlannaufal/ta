import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import History from 'App/Models/History'
import Penanganan from 'App/Models/Penanganan'

export default class PenanganansController {
    public async index({ response }: HttpContextContract) {  
        const penanganans = await Penanganan.query()
        return response.json({
        data: {
          penanganans: penanganans
        }
      })
    }
    
      public async store({ request, response, auth}: HttpContextContract) {
        const {date, uraian, cacah, biaya, historyId, isHandle} = request.body()
        const history = await History.findOrFail(historyId)

        await Penanganan.query().where('history_id', history.id).update({
          date: date,
          uraian: uraian,
          cacah: cacah,
          biaya: biaya,
          isHandle: isHandle || true, 
          userId: auth?.user?.id
        })
    
        return response.json({
          message: 'success insert penanganan'
        })
      }
    
      public async show({ params, response }: HttpContextContract) {
        const {id} = params
        const penanganan = await Penanganan.query()
            .where('id', id)
            .preload('history')
            .firstOrFail()

          return response.json({
            data: {
              penanganan: penanganan
            }
          })
      }
    
      public async update({ params,request,response, auth}: HttpContextContract) {
        //get param
        const {id} = params
    
        //get body request
        const { date, uraian, cacah, biaya, isHandle } = request.body()
    
        //get exist location data
        const penanganan = await Penanganan.query().where({
          id: id,
        }).firstOrFail()
    
          //update query
          penanganan.merge({
            date: date,
            uraian: uraian,
            cacah: cacah,
            biaya: biaya,
            isHandle: isHandle,
          }).save()
    
          return response.json({
            message: 'Success update penanganan'
          })
      }
    
      public async destroy({ params, response, auth}: HttpContextContract) {
        //get param
        const {id} = params
    
        //get exist location data
        const penanganan = await Penanganan.query().where({
          id: id,
        }).firstOrFail()
    
        //delete query
        await penanganan.delete()
    
        return response.json({
          message: 'Success delete penanganan'
        })
      }
        
}
