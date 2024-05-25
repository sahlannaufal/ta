import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Location from 'App/Models/Location'
import Comment from 'App/Models/Comment'

export default class CommentsController {
    public async index({ params, response }: HttpContextContract) {
        const comments = await Comment.query().where('location_id', params.locationId)
        return response.json({ data: comments })
      }
    
      public async store({ params, request, response }: HttpContextContract) {
        const { content } = request.body()
        const locationId = params.locationId
    
        // Ensure locationId is not null
        if (!locationId) {
          return response.status(400).json({
            message: 'locationId is required'
          })
        }
    
        const newComment = await Comment.create({
          locationId: locationId,
          content: content
        })
    
        return response.json({
          message: 'success insert comment',
          data: newComment
        })
      }
    
      public async show({ params, response }: HttpContextContract) {
        const comment = await Comment.findOrFail(params.id)
        return response.json({ data: comment })
      }
    
      public async update({ params, request, response }: HttpContextContract) {
        const { content } = request.body()
        const existingComment = await Comment.findOrFail(params.id)
        existingComment.merge({ content: content }).save()
    
        return response.json({
          message: 'Success update data',
          data: existingComment
        })
      }
    
      public async destroy({ params, response }: HttpContextContract) {
        const comment = await Comment.findOrFail(params.id)
        await comment.delete()
    
        return response.json({
          message: 'Success delete data'
        })
      }


}
