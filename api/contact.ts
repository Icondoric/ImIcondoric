import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid data', details: parsed.error.flatten() })
  }

  const { name, email, message } = parsed.data

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Portafolio Icondoric <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'iconhu.icc@gmail.com',
      subject: `Nuevo mensaje de contacto de ${name}`,
      html: `
        <h2>Nuevo mensaje desde tu portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Error sending email:', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
