import { Context } from 'grammy'
import { Institution } from '@/models/Timetable'
import { Menu } from '@grammyjs/menu'

export default (rows: Institution[][], mainMenu: any) => {
  try {
    rows.map((item, index) => {
      const pageMenu = new Menu<Context>(`${index + 1}`)

      void createText(item, pageMenu)
      void createPagination(index, pageMenu, rows)

      mainMenu.register(pageMenu)
    })
  } catch {
    console.log('Keyboard already registered')
  }
}

const createText = (item: { text: string }[], menu: Menu) => {
  item.map((item) => {
    menu.text(item.text.split('_').join(' ')).row()
  })
}

const createPagination = (index: number, menu: Menu, rows: Institution[][]) => {
  menu
    .submenu('<', index == 0 ? `${index + 1}` : `${index}`)
    .text(`${index + 1} / ${rows.length}`)
    .submenu(
      '>',
      index == rows.length ? (index + 1).toString() : (index + 2).toString()
    )
    .row()
    .submenu('Назад', 'timetables')
}
