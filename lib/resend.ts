import { Resend } from 'resend'

export const createClient = () => {
  return new Resend(process.env.RESEND_API_KEY)
}
