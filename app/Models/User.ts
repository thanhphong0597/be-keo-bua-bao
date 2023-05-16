import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Match from './Match'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userName: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(()=>Match,{
    foreignKey:'user_id_1'
  })
  public user1s: HasMany<typeof Match>

  @hasMany(()=>Match,{
    foreignKey:'user_id_2'
  })
  public user2s: HasMany<typeof Match>

  @hasMany(()=>Match,{
    foreignKey:'winner_id'
  })
  public winners: HasMany<typeof Match>
}
