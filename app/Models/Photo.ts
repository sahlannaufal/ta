import { DateTime } from 'luxon'
import { BaseModel, column,  BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'

export default class Photo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public photo: string

  @column()
  public locationId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>
}
