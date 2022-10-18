import { Menu, MenuRange } from '@grammyjs/menu'
import Context from '@/models/Context'
import InstitutionModel from '@/models/Timetable'
import timetablesMenu from '@/menus/timetables'

const institutionsMenu = new Menu<Context>('institutions')

institutionsMenu.dynamic(async () => {
  const menu = new MenuRange<Context>()
  await createText(menu)
  return menu
})

const createText = async (menu: MenuRange<Context>) => {
  const institutions = await InstitutionModel.distinct('institution')
  institutions.map((item: string) => {
    menu.submenu(
      item,
      'timetables',
      (ctx: Context) => void chooseInstitution(ctx, item)
    )
  })
}

const chooseInstitution = (ctx: Context, institution: string) => {
  ctx.dbuser.institution = institution
  void ctx.dbuser.save()
  void ctx.editWithText('done')
}

institutionsMenu.register(timetablesMenu)

export default institutionsMenu
