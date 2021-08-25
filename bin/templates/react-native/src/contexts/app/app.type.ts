export type AppStateType = {
  user?: {
    id: number
    fullName: string
    email: string
  }
  accessToken?: string
}

export type AppActionType = {
  type: string
  payload?: any
}
