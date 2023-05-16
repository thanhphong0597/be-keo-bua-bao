import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Match from './Match'

export default class Round extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public match_id: number

  @column()
  public round: number

  @column()
  public user_1_pick: string

  @column()
  public user_2_pick: string

  @column()
  public winner_id?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'winner_id'
  })
  public winner: BelongsTo<typeof User>

  @belongsTo(() => Match, {
    foreignKey: 'match_id'
  })
  public match: BelongsTo<typeof Match>


  public setWinnerId(): void {
    if (this.user_1_pick === 'keo' && this.user_2_pick === 'keo') {
      this.winner_id = 0
    } else {
      // handle other cases here
    }
  }

}
