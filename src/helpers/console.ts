const createDate = () => {
  return new Date().toLocaleString('ru', {
    second: 'numeric',
    minute: 'numeric',
    hour: 'numeric',
    day: 'numeric',
    month: 'long',
  })
}

export const printAddedTimetable = (text: string) => {
  const date = createDate()
  console.log(
    `${date.green.bold} ${'SEND'.green.bold}: ${text.split('_').join(' ')}`
  )
}

export const printKeyboardRegistered = () => {
  const date = createDate()
  console.log(
    `${date.yellow.bold} ${'WARNING'.yellow.bold}: Keyboard already registered`
  )
}

export const printWhenStartCheck = () => {
  const date = createDate()
  console.log(`${date.green.bold} ${'START CHECK'.green.bold}: Process start`)
}

export const printConnectionError = () => {
  const date = createDate()
  console.log(`${date.red.bold} ${'ERROR'.red.bold}: Connection error`)
}

export const printNewUser = (username: string | undefined) => {
  const date = createDate()
  console.log(
    `${date.green.bold} ${'NEW USER'.green.bold}: ${username} added in bot`
  )
}
