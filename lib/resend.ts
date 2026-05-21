import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = 'TTC Website <noreply@thetransformationcamp.org>'
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? 'theasaphmedia@gmail.com'

export async function sendNotificationEmail(subject: string, html: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject,
      html,
    })
  } catch (err) {
    // Non-fatal — log but don't throw; Supabase insert is the source of truth
    console.error('Resend email error:', err)
  }
}
