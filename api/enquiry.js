// FAME Dentistry — enquiry form handler (Vercel Node serverless function)
// Sends an internal notification + a branded auto-reply via SMTP (nodemailer).
// All SMTP credentials come from environment variables — nothing is hardcoded.

const nodemailer = require('nodemailer');

const INTEREST_LABELS = {
  general: 'General Dentistry',
  implants: 'Dental Implants',
  cosmetic: 'Cosmetic Dentistry',
  sedation: 'Treatment Under Sedation',
  hygiene: 'Hygiene',
  other: 'Other / Custom Enquiry',
};

const NAVY = '#1a2233';
const GOLD = '#c9a96e';
const OFFWHITE = '#f8f6f2';

const esc = (s) =>
  String(s == null ? '' : s).replace(/[<>&"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c])
  );

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

    const name = (body.name || '').toString().trim();
    const email = (body.email || '').toString().trim();
    const phone = (body.phone || '').toString().trim();
    const interest = (body.interest || '').toString().trim();
    const notes = (body.notes || '').toString().trim();
    const company = (body.company || '').toString().trim(); // honeypot

    // Honeypot — bots fill hidden fields. Silently accept so they think it worked.
    if (company) return res.status(200).json({ ok: true });

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !phone) {
      return res.status(400).json({ ok: false, error: 'Please complete all required fields.' });
    }

    const interestLabel = INTEREST_LABELS[interest] || interest || 'Not specified';

    const host = process.env.CORTEZA_SMTP_HOST;
    const port = parseInt(process.env.CORTEZA_SMTP_PORT || '587', 10);
    const user = process.env.CORTEZA_SMTP_USER;
    const pass = process.env.CORTEZA_SMTP_PASS;
    const fromAddr = process.env.CORTEZA_SMTP_FROM || user;
    const toAddr =
      process.env.ENQUIRY_TO || 'hello@famedentistry.co.uk, bishtmahesh1@gmail.com';

    if (!host || !user || !pass) {
      console.error('Enquiry: SMTP env vars are not configured.');
      return res.status(500).json({ ok: false, error: 'Email is not configured on the server.' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
      auth: { user, pass },
    });

    // 1) Internal notification to the practice
    const internalHtml = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:${NAVY}">
        <div style="background:${NAVY};color:${OFFWHITE};padding:24px 28px">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${GOLD}">FAME Dentistry</div>
          <div style="font-size:20px;margin-top:6px">New website enquiry</div>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:8px">
          ${[
            ['Name', esc(name)],
            ['Email', `<a href="mailto:${esc(email)}" style="color:${NAVY}">${esc(email)}</a>`],
            ['Phone', `<a href="tel:${esc(phone)}" style="color:${NAVY}">${esc(phone)}</a>`],
            ['Interest', esc(interestLabel)],
            ['Notes', notes ? esc(notes) : '&mdash;'],
          ]
            .map(
              ([k, v]) =>
                `<tr><td style="padding:12px 28px;border-bottom:1px solid #eee;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8a8f98;width:120px;vertical-align:top">${k}</td><td style="padding:12px 28px;border-bottom:1px solid #eee;font-size:15px">${v}</td></tr>`
            )
            .join('')}
        </table>
        <div style="padding:18px 28px;font-size:12px;color:#8a8f98">Sent from the FAME Dentistry website enquiry form.</div>
      </div>`;

    await transporter.sendMail({
      from: `"FAME Dentistry Enquiries" <${fromAddr}>`,
      to: toAddr,
      replyTo: email,
      subject: `New enquiry — ${interestLabel} — ${name}`,
      text:
        `New enquiry from the FAME Dentistry website\n\n` +
        `Name:     ${name}\n` +
        `Email:    ${email}\n` +
        `Phone:    ${phone}\n` +
        `Interest: ${interestLabel}\n` +
        `Notes:    ${notes || '—'}\n`,
      html: internalHtml,
    });

    // 2) Branded auto-reply to the enquirer
    const replyHtml = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:${NAVY}">
        <div style="background:${NAVY};color:${OFFWHITE};padding:28px">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${GOLD}">FAME Dentistry · Glasgow</div>
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;margin-top:10px">Thank you, ${esc(name)}.</div>
        </div>
        <div style="padding:28px;font-size:15px;line-height:1.65">
          <p style="margin:0 0 16px">We've received your enquiry about <strong>${esc(interestLabel)}</strong> and a member of our team will be in touch personally &mdash; you'll hear back from a real person, never an automated reply.</p>
          <p style="margin:0 0 16px">FAME Dentistry opens summer 2026 on Scotland Street, Glasgow. In the meantime, Dr Ferhan Ahmed welcomes patients needing immediate care at his practice in Edinburgh.</p>
          <p style="margin:0">Warm regards,<br/>The FAME Dentistry Team</p>
        </div>
        <div style="padding:18px 28px;border-top:1px solid #eee;font-size:12px;color:#8a8f98">
          Corner of Scotland Street and Shields Road, Glasgow · hello@famedentistry.co.uk
        </div>
      </div>`;

    await transporter.sendMail({
      from: `"FAME Dentistry" <${fromAddr}>`,
      to: email,
      subject: "We've received your enquiry — FAME Dentistry",
      text:
        `Hi ${name},\n\n` +
        `Thank you for your enquiry about ${interestLabel}. A member of our team will be in touch personally — you'll hear back from a real person, never an automated reply.\n\n` +
        `FAME Dentistry opens summer 2026 on Scotland Street, Glasgow. In the meantime, Dr Ferhan Ahmed welcomes patients needing immediate care at his practice in Edinburgh.\n\n` +
        `Warm regards,\nThe FAME Dentistry Team`,
      html: replyHtml,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Enquiry send failed:', err && err.message ? err.message : err);
    return res.status(500).json({ ok: false, error: 'Something went wrong. Please try again or email us directly.' });
  }
};
