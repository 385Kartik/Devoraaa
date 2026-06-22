import { json } from '@tanstack/react-start'
import { createAPIFileRoute } from '@tanstack/react-start/api'
import nodemailer from 'nodemailer'

export const APIRoute = createAPIFileRoute('/api/contact')({
  POST: async ({ request }) => {
    try {
      const { name, email, message } = await request.json()

      if (!name || !email || !message) {
        return json({ error: 'All fields are required' }, { status: 400 })
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      // Email to Owner
      await transporter.sendMail({
        from: `"Devoraaa Inquiries" <${process.env.SMTP_USER}>`,
        to: '385.kartik.p@gmail.com', // Change this to the intended admin email
        replyTo: email,
        subject: `🚀 New Devoraaa Inquiry from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #d97706, #b45309); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 4px;">DEVORAAA</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 12px; letter-spacing: 2px;">NEW TRANSMISSION RECEIVED</p>
            </div>
            <div style="padding: 32px;">
              <div style="margin-bottom: 24px;">
                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">Sender</p>
                <p style="color: #ffffff; font-size: 18px; margin: 0;">${name}</p>
              </div>
              <div style="margin-bottom: 24px;">
                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">Email</p>
                <p style="color: #d97706; font-size: 16px; margin: 0;">${email}</p>
              </div>
              <div style="margin-bottom: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Message</p>
                <p style="color: #d1d5db; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        `,
      })

      // Auto-reply to User
      await transporter.sendMail({
        from: `"Devoraaa Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}! 🙌`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a2e; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #d97706, #b45309); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 4px;">DEVORAAA</h1>
            </div>
            <div style="padding: 32px;">
              <p style="color: #d1d5db; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
                Hey ${name}! 👋
              </p>
              <p style="color: #d1d5db; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
                Thanks for reaching out to Devoraaa. We've received your message and will get back to you within 24 hours.
              </p>
              <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0;">
                Best,<br>
                <strong style="color: white;">The Devoraaa Team</strong>
              </p>
            </div>
          </div>
        `,
      })

      return json({ success: true, message: 'Message sent successfully!' })
    } catch (error) {
      console.error('Email error:', error)
      return json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }
  },
})
