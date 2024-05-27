import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Location from './Location'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({serializeAs: null})
  public password: string

  @column()
  public role: string
  
  @column()
  public namaLengkap: string

  @column()
  public nomorTelepon: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Location)
  public locations: HasMany<typeof Location>
}
