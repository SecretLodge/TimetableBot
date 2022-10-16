import { Context as BaseContext } from 'grammy'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { UserTimetableBot } from '@/models/User'

class Context extends BaseContext {
  readonly i18n!: I18nContext
  dbuser!: DocumentType<UserTimetableBot>

  replyWithText: this['reply'] = (text, other, ...rest) => {
    text = this.i18n.t(text)
    return this.reply(text, other, ...rest)
  }

  editWithText = (text: string, other?: string | undefined) => {
    text = this.i18n.t(text, { institution: other })
    return this.editMessageText(text, { parse_mode: 'HTML' as const })
  }
}

export default Context
