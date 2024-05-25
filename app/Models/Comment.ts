import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public locationId: number

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>
}
