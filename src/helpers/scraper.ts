import * as cheerio from 'cheerio'
import { InstitutionSimple, Response, Scraper } from '@/models/AllTypes'
import { printConnectionError } from '@/helpers/console'
import axios from 'axios'

const scraper = async ({ urlTimetables, urlMainPage }: Scraper) => {
  const $ = await fetchHTML(urlTimetables)
  return arrayPosts($, urlMainPage)
}

const arrayPosts = ($: any, url: string) => {
  const institutions: InstitutionSimple[] = []
  $('.file_tree > .file_link').each((_index: number, item: string) => {
    const { href, text, extension } = dataProcessing($, url, item)
    if (!text) return
    institutions.push({ href, text, extension })
  })

  return institutions
}

const dataProcessing = ($: any, url: string, item: string) => {
  const href = `${url}${$(item).find('.header > a').attr('href')}`
  const extension = getFileExtension(href)
  const text = $(item).find('.header > a').eq(0).text().split(' ').join('_')
  return { href, text, extension }
}

const fetchHTML = async (url: string) => {
  try {
    const response: Response = await axios.get(url)
    return cheerio.load(response.data)
  } catch {
    void printConnectionError()
  }
}

const getFileExtension = (href: string) => {
  const hrefDetail = href.split('.')
  return hrefDetail[hrefDetail.length - 1]
}

export default scraper
