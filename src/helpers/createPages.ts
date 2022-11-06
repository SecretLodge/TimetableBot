import TimetableModel, { Timetable } from '@/models/Timetable'

export default async (model: typeof TimetableModel, institution: string) => {
  const timetablesRows: Timetable[][] = []
  const timetablesAll: Timetable[] = await model
    .find({
      institution,
    })
    .sort({ createdAt: -1 })
  for (let i = 0; i < timetablesAll.length; i++) {
    timetablesRows.push(timetablesAll.splice(0, 5))
  }
  if (timetablesAll.length) timetablesRows.push(timetablesAll)
  return timetablesRows
}
