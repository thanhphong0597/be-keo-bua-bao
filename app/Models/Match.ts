import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Round from './Round'

export default class Match extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: string

  @column()
  public user_id_1: number

  @column()
  public user_id_2?: number

  @column()
  public winner_id: number

  @column()
  public score: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id_1'
  })
  public user_1: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'user_id_2'
  })
  public user_2: BelongsTo<typeof User>


  @belongsTo(() => User, {
    foreignKey: 'winner_id'
  })
  public winner: BelongsTo<typeof User>

  @hasMany(() => Round, {
    foreignKey: 'match_id'
  })
  public rounds: HasMany<typeof Round>

}



enum status {
  WAITTING,
  CANCLE,
  FINISHED,
  START
}
