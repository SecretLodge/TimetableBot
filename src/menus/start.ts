import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'
import institutionsMenu from '@/menus/institutions'

const startMenu = new Menu<Context>('start').submenu(
  'Продолжить',
  'institutions',
  (ctx: Context) => {
    return ctx.editWithText('institutions')
  }
)
startMenu.register(institutionsMenu)

export default startMenu
