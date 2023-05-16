// app/Middleware/UserWho.ts

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import responseObject from 'App/Models/responseObject';

export default class UserWho {
  public async handle({ auth, response, request }: HttpContextContract, next: () => Promise<void>) {
    // Authenticate the user

    await auth.use('api').authenticate();

    if (!auth.user) return response.json(new responseObject(400,'khong thanh cong'));

    const user = await User.query().where('id', auth.user.id).first();

    if (!user) return response.json(new responseObject(401,'khong tim thay user!!'));

    const user_id = auth.user.id;

    request.user_id_mw = user_id;

    await next();
  }
}
