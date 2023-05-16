import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UpdateRounds extends BaseSchema {
  protected tableName = 'rounds'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('user_1_kq', 'user_1_pick')
      table.renameColumn('user_2_kq', 'user_2_pick')
    })
  }


  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('user_1_kq', 'user_1_pick')
      table.renameColumn('user_2_kq', 'user_2_pick')
    })
  }
}
