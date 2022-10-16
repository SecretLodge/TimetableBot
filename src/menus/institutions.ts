import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'
import timetablesMenu from '@/menus/timetables'

const institutionsMenu = new Menu<Context>('institutions').submenu(
  'Авиационный Техникум',
  'timetables',
  (ctx: Context) => {
    return ctx.editWithText('done')
  }
)
institutionsMenu.register(timetablesMenu)

export default institutionsMenu
