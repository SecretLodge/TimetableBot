import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'
import allTimetableMenu from '@/menus/allTimetable'
import sendOptions from '@/helpers/sendOptions'

const timetablesMenu = new Menu<Context>('timetables')

timetablesMenu
  .submenu('🕰 Расписание за всё время', 'allTimetableMenu', (ctx: Context) => {
    return ctx.editWithText('timetable', 'Авиационного Техникума')
  })
  .row()
  .submenu('🏫 Изменить учёбное заведение', 'institutions', (ctx: Context) => {
    return ctx.editWithText('institutions')
  })

timetablesMenu.register(allTimetableMenu)

export default timetablesMenu
