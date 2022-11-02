import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import startMenu from '@/menus/start'

export default function handleStart(ctx: Context) {
  if (ctx.chat?.type == 'private')
    return ctx.replyWithText('start', {
      ...sendOptions(ctx),
      reply_markup: startMenu,
    })
}
