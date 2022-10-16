import { Institution, InstitutionModel } from '@/models/Timetable'
import { Menu, MenuRange } from '@grammyjs/menu'
import Context from '@/models/Context'

const allTimetableMenu = new Menu<Context>('allTimetableMenu')

allTimetableMenu.dynamic(async () => {
  const timetablesRows: Institution[][] = []
  const timetablesAll: Institution[] = await InstitutionModel.find({
    institution: 'Авиационный Техникум',
  })

  for (let i = 0; i < timetablesAll.length; i++) {
    timetablesRows.push(timetablesAll.splice(0, 5))
  }
  if (timetablesAll) timetablesRows.push(timetablesAll)

  const mainPageMenu = new MenuRange<Context>()

  timetablesRows[0].map((item) => {
    mainPageMenu.text(item.text.split('_').join(' ')).row()
  })

  timetablesRows.map((item, index) => {
    try {
      const otherPageMenu = new Menu<Context>(`${index + 1}`)

      item.map((item) => {
        otherPageMenu.text(item.text.split('_').join(' ')).row()
      })

      otherPageMenu
        .submenu('<', index == 0 ? `${index + 1}` : `${index}`)
        .text(`${index + 1} / ${timetablesRows.length}`)
        .submenu(
          '>',
          index == timetablesRows.length
            ? (index + 1).toString()
            : (index + 2).toString()
        )
        .row()
        .submenu('Назад', 'timetables')

      allTimetableMenu.register(otherPageMenu)
    } catch {
      console.log('Keyboard already registered')
    }
  })

  mainPageMenu
    .submenu('<', '1')
    .text(`${1}/${timetablesRows.length}`)
    .submenu('>', '2')
    .row()
    .back('Назад')

  return mainPageMenu
})

export default allTimetableMenu
