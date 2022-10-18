import { Context } from 'grammy'
import { MenuRange } from '@grammyjs/menu'
import InstitutionModel, { Institution } from '@/models/Timetable'
import allTimetableMenu from '@/menus/allTimetable'
import createPages from '@/helpers/createPages'
import createPagination from '@/helpers/createPagination'

const createMenu = async (institution: string) => {
  const rows = await createPages(InstitutionModel, institution)
  const mainPageMenu = new MenuRange<Context>()

  void createText(rows, mainPageMenu)
  void createMainPagination(rows, mainPageMenu)
  void createPagination(rows, allTimetableMenu)

  return mainPageMenu
}

const createText = (rows: Institution[][], menu: MenuRange<Context>) => {
  rows[0].map((item) => {
    menu.text(item.text.split('_').join(' ')).row()
  })
}

const createMainPagination = (
  rows: Institution[][],
  menu: MenuRange<Context>
) => {
  menu
    .submenu('<', '1')
    .text(`${1}/${rows.length}`)
    .submenu('>', '2')
    .row()
    .back('Назад')
}

export default createMenu
