import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Rounds extends BaseSchema {
  protected tableName = 'rounds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('match_id').notNullable().unsigned().references('matches.id')
      table.integer('round')
      table.string(`user_1_kq`)
      table.string(`user_2_kq`)
      table.integer('winner_id').nullable().unsigned().references('users.id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
