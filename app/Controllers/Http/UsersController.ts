import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import responseObject from 'App/Models/responseObject';

export default class UsersController {

    public async getAll ({response}:HttpContextContract){
        const users = await User.query()
        if(users.length > 0) return response.json(new responseObject(200,'thanh cong',users))
    }

    public async register({ request, response }: HttpContextContract) {
        const { user_name, password } = request.all();
        const newUser = new User()
        newUser.userName = user_name
        newUser.password = password

        await newUser.save();
        return response.json(new responseObject(200,'thanh cong',newUser))
    }
    public async login({ request, response, auth }: HttpContextContract) {
        const { user_name, password } = request.all();
        try {
            console.log('b')
            const token = await auth.attempt(user_name, password)
            const user = await User.findBy('userName', user_name)
            await user?.merge({rememberMeToken:token.token}).save()
            return response.json(new responseObject(200,'thanh cong',user))
            // return response.status(200).json({status:'success',message:'alo',data:user})
        }
        catch (error) {
            console.log(`a`)
            return response.json(new responseObject(405,'khong thanh cong',error))
        }
    }
}
