import { Resend } from 'resend'

const FROM_EMAIL = 'TTC Website <noreply@thetransformationcamp.org>'

export async function sendNotificationEmail(subject: string, html: string) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return // Resend not configured yet — skip silently

    const resend = new Resend(apiKey)
    const notifyEmail = process.env.RESEND_NOTIFY_EMAIL ?? 'theasaphmedia@gmail.com'

    await resend.emails.send({
      from: FROM_EMAIL,
      to: notifyEmail,
      subject,
      html,
    })
  } catch (err) {
    // Non-fatal — log but don't throw; Supabase insert is the source of truth
    console.error('Resend email error:', err)
  }
}
