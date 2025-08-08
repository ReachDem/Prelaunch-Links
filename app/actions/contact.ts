"use server";

import { Resend } from 'resend';
import { render } from '@react-email/components';
import { ContactFormSchema, type ContactFormSchemaType } from '@/components/validations/contact';
import ContactConfirmation from '@/components/email-templates/ContactConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = 'latioms@gmail.com';
const SUPPORT_EMAIL = 'contact@reachdem.cc';
const FROM = 'Links by ReachDem <prelaunch@updates.reachdem.cc>';

export async function submitContact(raw: unknown) {
  const parsed = ContactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data as ContactFormSchemaType;

  const ownerHtml = `Contact form submission:<br/><br/>
  <strong>Name:</strong> ${data.name}<br/>
  <strong>Email:</strong> ${data.email}<br/>
  <strong>Phone:</strong> ${data.phone || '-'}<br/>
  <strong>Message:</strong><br/><pre style="font-family:monospace;white-space:pre-wrap">${escapeHtml(data.message)}</pre>`;

  // Send to owner
  await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `Nouveau message de ${data.name}`,
    html: ownerHtml,
    replyTo: data.email,
  });

  // Confirmation to user
  const confirmationHtml = await render(
    ContactConfirmation({ name: data.name, message: data.message, supportEmail: SUPPORT_EMAIL })
  );
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Nous avons bien reçu votre message',
    html: confirmationHtml,
    replyTo: SUPPORT_EMAIL,
  });

  return { ok: true };
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
