import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserTimetableBot {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: 'ru' })
  language!: string
  @prop({ required: false })
  institution!: string
  @prop({ required: false })
  type?: string
  @prop({ required: false })
  username?: string
}

export const UserModel = getModelForClass(UserTimetableBot)

export function findOrCreateUser(id: number, type: string) {
  return UserModel.findOneAndUpdate(
    { id, type },
    {},
    {
      upsert: true,
      new: true,
    }
  )
}
