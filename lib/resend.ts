// Brevo (formerly Sendinblue) transactional email
// Docs: https://developers.brevo.com/reference/sendtransacemail

const FROM_NAME = 'TTC Website'
const FROM_EMAIL = 'hello@ttconline.org'

export async function sendNotificationEmail(subject: string, html: string) {
  try {
    const apiKey = process.env.BREVO_API_KEY
    if (!apiKey) return // Brevo not configured yet — skip silently

    const notifyEmail = process.env.RESEND_NOTIFY_EMAIL ?? 'theasaphmedia@gmail.com'

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: notifyEmail }],
        subject,
        htmlContent: html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Brevo email error:', err)
    }
  } catch (err) {
    // Non-fatal — log but don't throw; Supabase insert is the source of truth
    console.error('Brevo email error:', err)
  }
}
