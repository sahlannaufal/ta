import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class UsersController {
  // Metode untuk mendapatkan semua pengguna
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.query().select('*')
      return response.status(200).json({
        data: {
          users: users
        }
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Gagal mengambil data pengguna',
        error: error.message,
      })
    }
  }

  // Metode untuk mendapatkan pengguna berdasarkan ID
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(404).json({
        message: 'Pengguna tidak ditemukan',
        error: error.message,
      })
    }
  }
}