import { Menu, MenuRange } from '@grammyjs/menu'
import Context from '@/models/Context'
import InstitutionModel from '@/models/Timetable'
import createPages from '@/helpers/createPages'
import createPagination from '@/helpers/createPagination'

const allTimetableMenu = new Menu<Context>('allTimetableMenu')

allTimetableMenu.dynamic(async () => {
  const rows = await createPages(InstitutionModel, 'Авиационный Техникум')

  const mainPageMenu = new MenuRange<Context>()

  rows[0].map((item) => {
    mainPageMenu.text(item.text.split('_').join(' ')).row()
  })

  void createPagination(rows, allTimetableMenu)

  mainPageMenu
    .submenu('<', '1')
    .text(`${1}/${rows.length}`)
    .submenu('>', '2')
    .row()
    .back('Назад')

  return mainPageMenu
})

export default allTimetableMenu
