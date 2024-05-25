import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminOnly {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    const user = await auth.authenticate()

    if (user.role !== 'admin') {
      return response.unauthorized({ message: 'Access restricted to administrators only' })
    }

    await next()
  }
}
