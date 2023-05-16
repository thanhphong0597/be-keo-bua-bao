import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Match from 'App/Models/Match'
import matchModel from 'App/Models/responseModel/matchModel'
import responseObject from 'App/Models/responseObject'

export default class MatchesController {
   public async matchCreate({ response, request }: HttpContextContract) {
      // const { player } = request.all()
      const user_id = request.user_id_mw
      const newMatch = await Match.create({ status: 'waitting', user_id_1: user_id })
      console.log(newMatch.id)
      const a = await Match.query().where('id', newMatch.id).preload('user_1').preload('user_2').preload('winner').first()
      if (a === null) return response.json(new responseObject(400, 'thanh cong', null))
      const data = new matchModel(a.id, a.status, a.user_1.id, a.user_2?.id, a.user_1.userName, a.user_2?.userName, a.winner?.userName, a.score)
      return response.json(new responseObject(200, 'thanh cong', data))

   }

   public async matchJoin({ response, params, request }: HttpContextContract) {
      const user_id = request.user_id_mw
      const matchId = params.id
      const matchFound = await Match.query().where('id', matchId).first();
      if (!matchFound) return response.json(new responseObject(402, 'khong tim thay tran'))
      await matchFound.merge({ status: 'start', user_id_2: user_id }).save()
      const a = await Match.query().where('id', matchId).preload('user_1').preload('user_2').preload('winner').first()
      if (a === null) return response.json(new responseObject(400, 'thanh cong', null))
      const data = new matchModel(a.id, a.status, a.user_1.id, a.user_2?.id, a.user_1.userName, a.user_2?.userName, a.winner?.userName, a.score)
      return response.json(new responseObject(200, 'cap nhat thanh cong', data))
   }

   public async matchFind({ response, params }: HttpContextContract) {
      const id = params.id
      const a = await Match.query().where('id', id).preload('user_1').preload('user_2').preload('winner').first()
      if (a === null) return response.json(new responseObject(400, 'thanh cong', null))
      const data = new matchModel(a.id, a.status, a.user_1.id, a.user_2?.id, a.user_1.userName, a.user_2?.userName, a.winner?.userName, a.score)
      return response.json(new responseObject(200, 'thanh cong', data))
   }

   public async allMatch({ response }: HttpContextContract) {
      const data = await Match.query().where('status', 'waitting')
      return response.json(new responseObject(200, 'thanh cong', data))
   }
   public async allStartedMatch({ response }: HttpContextContract) {
      const data = await Match.query().where('status', 'start')
      return response.json(new responseObject(200, 'thanh cong', data))
   }

}
