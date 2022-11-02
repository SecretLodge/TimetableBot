import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Timetable {
  @prop({ required: true })
  institution!: string
  @prop({ required: true })
  href!: string
  @prop({ required: true })
  text!: string
  @prop({ required: true })
  extension!: string
}

const TimetableModel = getModelForClass(Timetable)

export default TimetableModel
