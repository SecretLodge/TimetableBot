import * as fs from 'fs'
import { Extract, PathFolder, PathToFile, SaveFile } from '@/models/AllTypes'
import { printConnectionError } from '@/helpers/console'
import { red } from 'colors'
import axios from 'axios'

const downloadFile = async ({ url, text, extension, institution }: Extract) => {
  try {
    const pathToFolder = getPathToFolder({ institution, extension })
    void createFolder(pathToFolder)
    const response = await axios.get(url, {
      responseType: 'stream',
    })
    void saveFile({ institution, extension, response, text })
  } catch {
    void printConnectionError()
  }
}

export const saveFile = ({
  institution,
  extension,
  response,
  text,
}: SaveFile) => {
  try {
    const pathToFile = getPathToFile({ institution, extension, text })
    const file = fs.createWriteStream(pathToFile)
    void response.data.pipe(file)
  } catch (error) {
    console.log(`${red('ERROR')}: ${error}`)
  }
}

export const getPathToFolder = ({ institution, extension }: PathFolder) => {
  return `timetables/${institution.split(' ').join('_')}/${extension}/`
}

export const getPathToFile = ({ institution, extension, text }: PathToFile) => {
  const pathToFolder = getPathToFolder({ institution, extension })
  return `${pathToFolder}${text}.${extension}`
}

export const getPathToPhoto = (institution: string) => {
  return `timetables/${institution.split(' ').join('_')}/zvonki.png`
}

export const createFolder = (path: string) => {
  void fs.mkdirSync(path, { recursive: true })
}

export default downloadFile
