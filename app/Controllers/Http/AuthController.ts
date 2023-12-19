import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'


export default class AuthController {

    public async register({ request, response, auth }: HttpContextContract) {
        //get req body
        const {email, password} = request.body()

        //check unique email
        const odlUser = await User.query().where({email: email}).first()
        if (odlUser) {
            return response.status(422).json({
                message: 'Email sudah terdaftar!'
            })
        }

        //hasing password
        const hashedPassword = await Hash.make(password)

        //insert new user
        const user = await User.create({
            email: email,
            password: hashedPassword
        })

        //generate API token
        const token = await auth.use('api').generate(user)

        //return respon
        return response.json({
            data: {
                user: user,
                token: token
            }
        })
    }

    public async login({ request, response, auth }: HttpContextContract) {
        //get req body
        const {email, password} = request.body()

        //get user by email
        const user = await User.query().where({email: email}).first()
        if (!user) {
            return response.status(422).json({
                message: 'Email tidak terdaftar!'
            })
        }

        // Verify password
        if (!(await Hash.verify(user.password, password))) {
            return response.status(422).json({
                message: 'Password salah!'
            })
        }

        //generate API token
        const token = await auth.use('api').generate(user)

        //return respon
        return response.json({
            data: {
                user: user,
                token: token
            }
        })
    }
}
