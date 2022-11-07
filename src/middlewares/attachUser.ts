import { NextFunction } from 'grammy'
import { UserModel } from '@/models/User'
import { printNewUser } from '@/helpers/console'
import Context from '@/models/Context'

export default async function attachUser(ctx: Context, next: NextFunction) {
  if (ctx.chat?.type == 'channel') return
  let user = await UserModel.findOne({ id: ctx.chat?.id })

  if (!user) {
    user = await UserModel.create({ id: ctx.chat?.id, type: ctx.chat?.type })
    await user.save()
    void printNewUser(ctx.from?.username)
  }

  ctx.dbuser = user

  if (!ctx.dbuser.username && ctx.chat?.type == 'private') {
    ctx.dbuser.username = ctx.chat.username
    await ctx.dbuser.save()
  }

  return next()
}
