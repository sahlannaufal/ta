import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import History from './History'

export default class Penanganan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number
  
  @column()
  public date: DateTime

  @column()
  public uraian: string

  @column()
  public cacah: string

  @column()
  public biaya: string

  @column()
  public historyId: number

  @column()
  public isHandle: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => History)
  public history: BelongsTo<typeof History>
}
