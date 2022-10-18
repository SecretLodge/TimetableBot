import * as cheerio from 'cheerio'
import axios from 'axios'

interface response {
  data: string
}

interface scrap {
  urlTimetables: string
  urlSite: string
}

interface institutions {
  href: string
  text: string
  extension: string
}

interface extractFromHTML {
  institutions: institutions[]
  url: string
  $: any
}

interface dataProcess {
  $: any
  url: string
  item: string
}

const scrapTimetable = async ({ urlTimetables, urlSite }: scrap) => {
  const $ = await fetchHTML(urlTimetables)
  return getTimetable($, urlSite)
}

const fetchHTML = async (url: string) => {
  const responseType = 'text'
  const response: response = await axios.get(url, { responseType })
  return cheerio.load(response.data)
}

const getTimetable = ($: any, url: string) => {
  const institutions: institutions[] = []
  void extractFromHTML({ institutions, url, $ })
  return institutions
}

const extractFromHTML = ({ institutions, url, $ }: extractFromHTML) => {
  $('.file_tree > .file_link').each((_index: number, item: string) => {
    const { href, text, extension } = dataProcessing({ $, url, item })
    institutions.push({ href, text, extension })
  })
}

const dataProcessing = ({ $, url, item }: dataProcess) => {
  const text = $(item).find('.header > a').eq(0).text().split(' ').join('_')
  const href = `${url}${$(item).find('.header > a').attr('href')}`
  const extension = getFileExtension(href)
  return { href, text, extension }
}

const getFileExtension = (href: string) => {
  const hrefDetail = href.split('.')
  return hrefDetail[hrefDetail.length - 1]
}

export default scrapTimetable
