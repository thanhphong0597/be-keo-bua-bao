import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Matches extends BaseSchema {
  protected tableName = 'matches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('status',['waitting','cancle','finished','start']).defaultTo('waitting').notNullable()
      table.integer('user_id_1').unsigned().notNullable().references('users.id')
      table.integer('user_id_2').unsigned().references('users.id')
      table.integer('winner_id').unsigned().references('users.id')
      table.string('score').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
