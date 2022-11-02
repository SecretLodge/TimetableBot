import { UserModel } from '@/models/User'
import Context from '@/models/Context'
import InstitutionModel from '@/models/Timetable'
import env from '@/helpers/env'

export default async function handleCountUsers(ctx: Context) {
  if (env.ADMIN_ID != ctx.dbuser.id) return
  const institutions = await InstitutionModel.distinct('institution')

  await ctx.reply('🏫 Кол-во пользователей')
  institutions.map(async (institution: string) => {
    const countUsers = await UserModel.countDocuments({ institution })
    void ctx.reply(`${institution}: ${countUsers} 💂‍♂️`)
  })
}
