import { UserModel, UserTimetableBot } from '@/models/User'
import Context from '@/models/Context'
import InstitutionModel from '@/models/Timetable'
import env from '@/helpers/env'

interface User extends UserTimetableBot {
  createdAt?: string
}

export default async function handleSortedUsers(ctx: Context) {
  if (env.ADMIN_ID != ctx.dbuser.id) return
  const institutions = await InstitutionModel.distinct('institution')
  let messageUsers = ``

  institutions.map(async (institution) => {
    const users = await UserModel.find({
      institution: institution,
      type: 'private',
    }).sort({ createdAt: -1 })

    await ctx.reply(`🏫 ${institution}: ${users.length}`)
    users.map((user: User) => {
      const date = user.createdAt?.toString().split(' ', 5).join(' ')
      messageUsers += `${
        user.username
          ? `<b>USERNAME</b>: @${user.username}`
          : `<b>ID</b>: ${user.id}`
      }\n<b>DATE</b>: ${date}\n\n`
    })
    await ctx.reply(messageUsers, { parse_mode: 'HTML' })
    messageUsers = ''
  })
}
