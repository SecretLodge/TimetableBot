import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Institution {
  @prop({ required: true })
  institution!: string
  @prop({ required: true })
  url!: string
  @prop({ required: true })
  text!: string
}

const InstitutionModel = getModelForClass(Institution)

export default InstitutionModel
