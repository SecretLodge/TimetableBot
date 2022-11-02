import { printWhenStartCheck } from '@/helpers/console'
import Context from '@/models/Context'
import allCheckersTimetable from '@/helpers/checkTimetable'
import env from '@/helpers/env'

const institution = 'Авиационный Техникум'
let checkTimetable = true

export default function handleStartCheckTimetable(ctx: Context) {
  if (!checkTimetable || env.ADMIN_ID != ctx.dbuser.id) return
  checkTimetable = false
  void ctx.reply('Процесс проверки расписания запущен 🏎...', {
    parse_mode: 'HTML',
  })
  void printWhenStartCheck()
  setInterval(() => {
    void allCheckersTimetable(ctx, institution)
  }, 5 * 60 * 1000)
}
