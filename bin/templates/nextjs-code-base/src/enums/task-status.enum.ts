export enum TaskStatus {
  TODO = 1, DONE = 2
}

export const getTaskStatusTitle = (value: number) => {
  switch (value) {
    case TaskStatus.TODO:
      return 'Todo'
    case TaskStatus.DONE:
      return 'Done'
    default:
      return ''
  }
}
