import * as fs from 'fs'
import axios, { AxiosResponse } from 'axios'

interface extract {
  url: string
  name: string
  extension: string
  institution: string
}

interface download {
  file: fs.WriteStream
  response: AxiosResponse
  pathToExtension: string
}

interface path {
  institution: string
  extension: string
}

const extractAndDownload = async (params: extract) => {
  const download: download = await extractFile(params)
  void downloadFile(download)
}

const extractFile = async ({ url, name, extension, institution }: extract) => {
  const pathToExtension = pathFile({ institution, extension })
  const file = fs.createWriteStream(`${pathToExtension}${name}.${extension}`)
  const response = await axios.get(url, { responseType: 'stream' })
  return { file, response, pathToExtension }
}

const downloadFile = ({ file, response, pathToExtension }: download) => {
  void createFolder(pathToExtension)
  response.data.pipe(file)
}

const pathFile = ({ institution, extension }: path) => {
  return `timetables/${institution}/${extension}/`
}

const createFolder = (path: string) => {
  fs.mkdirSync(path, { recursive: true })
}

export default extractAndDownload

//const url = 'https://www.permaviat.ru/_res/fs/2726file.pdf'
