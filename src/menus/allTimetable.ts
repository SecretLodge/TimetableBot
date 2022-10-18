import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'
import createMenu from '@/helpers/createMenu'

const allTimetableMenu = new Menu<Context>('allTimetableMenu')

allTimetableMenu.dynamic((ctx: Context): any => {
  return createMenu(ctx.dbuser.institution)
})

export default allTimetableMenu
