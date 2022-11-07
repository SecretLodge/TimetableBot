import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { run } from '@grammyjs/runner'
import { sequentialize } from 'grammy-middlewares'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleCountUsers from '@/handlers/handleCountUsers'
import handleSortedUsers from '@/handlers/handleSortedUsers'
import handleStart from '@/handlers/start'
import handleStartCheckTimetable from '@/handlers/startCheckTimetable'
import i18n from '@/helpers/i18n'
import startMenu from '@/menus/start'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  await startMongo()
  console.log('Mongo connected')
  bot
    .use(sequentialize())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    .use(startMenu)
  bot.command('start', handleStart)
  bot.command('startcheck', handleStartCheckTimetable)
  bot.command('getcountusers', handleCountUsers)
  bot.command('getsortedusers', handleSortedUsers)
  bot.catch(console.error)
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
