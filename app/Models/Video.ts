import { DateTime } from 'luxon'
import { BaseModel, column,  BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public description: string

  @column()
  public video: string

  @column()
  public locationId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>
}
