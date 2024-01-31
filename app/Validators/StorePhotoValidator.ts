import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StorePhotoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.unique({ table: 'photos', column: 'name'}),
    ]),
    photo: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    })
  })

  public messages: CustomMessages = {}
}
