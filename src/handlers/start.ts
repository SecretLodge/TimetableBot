import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import startMenu from '@/menus/start'

export default function handleStart(ctx: Context) {
  return ctx.replyWithText('start', {
    ...sendOptions(ctx),
    reply_markup: startMenu,
  })
}
