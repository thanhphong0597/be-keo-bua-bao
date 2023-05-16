import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Round from 'App/Models/Round'

export default class RoundsController {

    public async updateRoundTest({ request, response }: HttpContextContract) {
        const { match_id, current_round, user_1_answer, user_2_answer } = request.all()

        let foundRound = await Round.query()
            .where('match_id', match_id)
            .where('round', current_round)
            .first()

        if (!foundRound) {
            foundRound = await Round.create({
                match_id: match_id,
                round: current_round,
                user_1_pick: user_1_answer,
                user_2_pick: user_2_answer,
            })
            return response.ok(foundRound)

        }

        foundRound.merge({ user_1_pick: user_1_answer, user_2_pick: user_2_answer })
        foundRound.setWinnerId()
        await foundRound.save()

        return response.ok(foundRound)
    }

    public async updateRound({ request, response, params }: HttpContextContract) {
        const { rounds } = request.all()
        const data = rounds.map(round => ({
            match_id: params.id,
            round: round.roundId,
            user_1_pick:round.user1_answer,
            user_2_pick:round.user2_answer,
            winner_id: round.winner
        }))
        await Round.createMany(data)
        return response.json({ data })
    }
}
