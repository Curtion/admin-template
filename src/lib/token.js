import { useStorage } from '@vueuse/core'
const faketoken = 123456
export const token = useStorage('token', faketoken)

token.value = faketoken