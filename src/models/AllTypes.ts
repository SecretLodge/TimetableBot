import { AxiosResponse } from 'axios'
import { Context } from 'grammy'
import { UserTimetableBot } from '@/models/User'

export interface SendToUsers {
  pathToPhoto: string
  pathToFile: string
  users: UserTimetableBot[]
  ctx: Context
}

export interface CheckTimetable {
  urlTimetables: string
  urlMainPage: string
  institution: string
  ctx: Context
}

export interface Extract {
  url: string
  text: string
  extension: string
  institution: string
}

export interface PathFolder {
  institution: string
  extension: string
}

export interface PathFile extends PathFolder {
  text: string
}

export interface SaveFile {
  institution: string
  extension: string
  response: AxiosResponse<any, any>
  text: string
}

export interface PathToFile {
  institution: string
  extension: string
  text: string
}

export interface Response {
  data: string
}

export interface InstitutionSimple {
  href: string
  text: string
  extension: string
}

export interface Scraper {
  urlTimetables: string
  urlMainPage: string
}

export interface Scrap {
  urlTimetables: string
  urlSite: string
}

export interface Institutions {
  href: string
  text: string
  extension: string
}

export interface ExtractFromHTML {
  institutions: Institutions[]
  url: string
  $: any
}

export interface DataProcess {
  $: any
  url: string
  item: string
}

export interface SendToUser {
  pathToFile: string
  ctx: Context
}
