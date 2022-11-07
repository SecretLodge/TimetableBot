import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'
import allTimetableMenu from '@/menus/allTimetable'

const timetablesMenu = new Menu<Context>('timetables')

timetablesMenu
  .submenu('🕰 Расписание за всё время', 'allTimetableMenu')
  .row()
  .submenu('🏫 Изменить учёбное заведение', 'institutions', (ctx: Context) => {
    return ctx.editWithText('institutions')
  })

timetablesMenu.register(allTimetableMenu)

export default timetablesMenu
