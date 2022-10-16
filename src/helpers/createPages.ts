import InstitutionModel, { Institution } from '@/models/Timetable'

export default async (model: typeof InstitutionModel, institution: string) => {
  const timetablesRows: Institution[][] = []
  const timetablesAll: Institution[] = await model.find({
    institution,
  })

  for (let i = 0; i < timetablesAll.length; i++) {
    timetablesRows.push(timetablesAll.splice(0, 5))
  }
  return timetablesRows
}
