import TimetableModel, { Timetable } from '@/models/Timetable'

export default async (model: typeof TimetableModel, institution: string) => {
  const timetablesPages: Timetable[][] = []
  const timetablesAll: Timetable[] = await model
    .find({
      institution,
    })
    .sort({ createdAt: -1 })
  for (let i = 0; i < timetablesAll.length; i++) {
    timetablesPages.push(timetablesAll.splice(0, 5))
  }
  if (timetablesAll.length) timetablesPages.push(timetablesAll)
  return timetablesPages
}
