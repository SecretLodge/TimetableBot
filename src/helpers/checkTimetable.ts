import { CheckTimetable, SendToUser, SendToUsers } from '@/models/AllTypes'
import { Context, InputFile } from 'grammy'
import { InstitutionSimple } from '@/models/AllTypes'
import { UserModel, UserTimetableBot } from '@/models/User'
import { getPathToFile, getPathToPhoto } from '@/helpers/downloadFile'
import { printAddedTimetable } from '@/helpers/console'
import TimetableModel, { Timetable } from '@/models/Timetable'
import downloadFile from '@/helpers/downloadFile'
import scraper from '@/helpers/scraper'

const urlTimetables = 'https://www.permaviat.ru/raspisanie-zamen/'
const urlMainPage = 'https://www.permaviat.ru'

const allCheckersTimetable = (ctx: Context, institution: string) => {
  void checkTimetable({ urlTimetables, urlMainPage, institution, ctx })
}

const checkTimetable = async ({
  urlTimetables,
  urlMainPage,
  institution,
  ctx,
}: CheckTimetable) => {
  const users: UserTimetableBot[] = await UserModel.find({ institution })
  const scrapTimetables: InstitutionSimple[] = await scraper({
    urlTimetables,
    urlMainPage,
  })
  scrapTimetables.map(async ({ href, text, extension }) => {
    const timetable = await TimetableModel.findOne({
      institution,
      href,
      text,
    })
    if (timetable) return
    const pathToFile = getPathToFile({ institution, extension, text })
    const pathToPhoto = getPathToPhoto(institution)
    await downloadFile({ url: href, text, extension, institution })
    await saveTimetableToDB({ institution, href, text, extension })
    await setTimeout(() => {
      void sendTimetableToUsers({ pathToPhoto, pathToFile, users, ctx })
      void printAddedTimetable(text)
    }, 5 * 1000)
  })
}

const saveTimetableToDB = async ({
  institution,
  href,
  text,
  extension,
}: Timetable) => {
  const timetable = await TimetableModel.create({
    institution,
    href,
    text,
    extension,
  })
  await timetable.save()
}

const sendTimetableToUsers = ({
  pathToPhoto,
  pathToFile,
  users,
  ctx,
}: SendToUsers) => {
  users.map(async ({ id }) => {
    await ctx.api.sendPhoto(id, new InputFile(pathToPhoto))
    await ctx.api.sendDocument(id, new InputFile(pathToFile))
  })
}

export const sendTimetableToUser = ({ pathToFile, ctx }: SendToUser) => {
  void ctx.replyWithDocument(new InputFile(pathToFile))
}

export default allCheckersTimetable
