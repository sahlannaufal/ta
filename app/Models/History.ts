import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'
import Penanganan from './Penanganan'

export default class History extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public date: DateTime

  @column()
  public macamKerusakan: string

  @column()
  public perolehanData: string

  @column()
  public sebabKerusakan: string

  @column()
  public locationId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>

  @hasOne(() => Penanganan)
  public penanganan: HasOne<typeof Penanganan>

  public static table = 'historys'
}
