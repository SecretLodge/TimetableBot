import { Context } from 'grammy'
import { MenuRange } from '@grammyjs/menu'
import { getPathToFile } from '@/helpers/downloadFile'
import { sendTimetableToUser } from '@/helpers/checkTimetable'
import TimetableModel, { Timetable } from '@/models/Timetable'
import allTimetableMenu from '@/menus/allTimetable'
import createPages from '@/helpers/createPages'
import createPagination from '@/helpers/createPagination'

const createMenu = async (institution: string, ctx: Context) => {
  const numberKeyboard = getRandomNumber(1000)
  const mainPageMenu = new MenuRange<Context>()
  const rows = await createPages(TimetableModel, institution)

  void createText(rows, mainPageMenu, ctx)
  void createMainPagination(rows, mainPageMenu, numberKeyboard)
  void createPagination(rows, allTimetableMenu, numberKeyboard)

  return mainPageMenu
}

const createText = (
  rows: Timetable[][],
  menu: MenuRange<Context>,
  ctx: Context
) => {
  rows[0].map((item) => {
    menu
      .text(item.text.split('_').join(' '), () => {
        void ctx.replyWithChatAction('upload_document')
        const pathToFile = getPathToFile({
          institution: item.institution,
          extension: item.extension,
          text: item.text,
        })
        void sendTimetableToUser({ pathToFile, ctx })
      })
      .row()
  })
}

const getRandomNumber = (max: number) => {
  return Math.random() * max * 1000 * 1000
}

const createMainPagination = (
  rows: Timetable[][],
  menu: MenuRange<Context>,
  numberKeyboard: number
) => {
  menu
    .submenu('<', `1${numberKeyboard}`)
    .text(`${1}/${rows.length}`)
    .submenu('>', `2${numberKeyboard}`)
    .row()
    .back('Назад')
}

export default createMenu
