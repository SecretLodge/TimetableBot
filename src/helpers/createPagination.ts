import { Context, InputFile } from 'grammy'
import { Menu } from '@grammyjs/menu'
import { Timetable } from '@/models/Timetable'
import { getPathToFile, getPathToPhoto } from '@/helpers/downloadFile'
import { printKeyboardRegistered } from '@/helpers/console'
import { sendTimetableToUser } from '@/helpers/checkTimetable'

export default (rows: Timetable[][], mainMenu: any, numberKeyboard: number) => {
  try {
    rows.map((item, index) => {
      const pageMenu = new Menu<Context>(`${index + 1}${numberKeyboard}`)

      void createText(item, pageMenu)
      void createPagination(index, pageMenu, rows, numberKeyboard)

      mainMenu.register(pageMenu)
    })
  } catch {
    void printKeyboardRegistered()
  }
}

const createText = (item: Timetable[], menu: Menu) => {
  item.map((item) => {
    menu
      .text(item.text.split('_').join(' '), (ctx: Context) => {
        const pathToFile = getPathToFile({
          institution: item.institution,
          extension: item.extension,
          text: item.text,
        })
        void ctx.replyWithChatAction('upload_document')
        void sendTimetableToUser({ pathToFile, ctx })
      })
      .row()
  })
}

const createPagination = (
  index: number,
  menu: Menu,
  rows: Timetable[][],
  numberKeyboard: number
) => {
  menu
    .submenu(
      '<',
      `${index}${numberKeyboard}` == `${0}${numberKeyboard}`
        ? `${index + 1}${numberKeyboard}`
        : `${index}${numberKeyboard}`
    )
    .text(`${index + 1} / ${rows.length}`)
    .submenu(
      '>',
      index == rows.length
        ? `${index + 1}${numberKeyboard}`
        : `${index + 2}${numberKeyboard}`
    )
    .row()
    .submenu('Назад', 'timetables')
}
