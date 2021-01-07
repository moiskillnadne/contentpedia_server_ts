export type Writeable<T> = { -readonly [P in keyof T]-?: T[P] }

export type ChannelBlockOption = DeepReadonly<{
  defaultValue?: 'true' | 'false'
  value: string
  text: string
}>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<P = any> = {
  type: string
  payload: P
}

export type SubscriptionSettigns = {
  active?: boolean
  focus?: boolean
  value?: boolean
  error?: boolean
  touched?: boolean
}
