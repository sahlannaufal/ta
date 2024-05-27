import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {

    public async register({ request, response, auth }: HttpContextContract) {
        // Mendapatkan data dari body request
        const { email, password, namaLengkap, nomorTelepon } = request.only(['email', 'password', 'namaLengkap', 'nomorTelepon'])

        // Memeriksa apakah email sudah terdaftar
        const existingUser = await User.findBy('email', email)
        if (existingUser) {
            return response.status(422).json({
                message: 'Email sudah terdaftar!'
            })
        }

        // Meng-hash password
        const hashedPassword = await Hash.make(password)

        // Menyimpan user baru
        const user = await User.create({
            email,
            password: hashedPassword,
            namaLengkap,
            nomorTelepon
        })

        // Membuat token API
        const token = await auth.use('api').generate(user)

        // Mengembalikan respons
        return response.json({
            data: {
                user,
                token
            }
        })
    }

    public async login({ request, response, auth }: HttpContextContract) {
        // Mendapatkan data dari body request
        const { email, password } = request.only(['email', 'password'])

        // Mencari user berdasarkan email
        const user = await User.findBy('email', email)
        if (!user) {
            return response.status(422).json({
                message: 'Email tidak terdaftar!'
            })
        }

        // Memeriksa kecocokan password
        const isPasswordValid = await Hash.verify(user.password, password)
        if (!isPasswordValid) {
            return response.status(422).json({
                message: 'Password salah!'
            })
        }

        // Membuat token API
        const token = await auth.use('api').generate(user)

        // Mengembalikan respons
        return response.json({
            data: {
                user,
                token
            }
        })
    }
}
