"use server";

import { Resend } from 'resend';
import { render } from '@react-email/components';
import FeedbackUserCopy from '@/components/email-templates/FeedbackUserCopy';
import FeedbackOwnerCopy from '@/components/email-templates/FeedbackOwnerCopy';

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = 'latioms@gmail.com';
const SUPPORT_EMAIL = 'contact@reachdem.cc';
const FROM = 'Links by ReachDem <prelaunch@updates.reachdem.cc>';

interface FeedbackFormData {
  email: string;
  name?: string;
  message: string;
}

export async function submitFeedback(formData: FormData) {
  const data: FeedbackFormData = {
    email: (formData.get('email') || '').toString().trim(),
    name: (formData.get('name') || '').toString().trim(),
    message: (formData.get('message') || '').toString().trim(),
  };

  if (!data.email || !data.message) {
    return { ok: false, error: 'Champs requis manquants.' };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { ok: false, error: 'Email invalide.' };
  }

  const ownerHtml = await render(FeedbackOwnerCopy({
    email: data.email,
    name: data.name || '',
    message: data.message,
  }));
  const userHtml = await render(FeedbackUserCopy({
    email: data.email,
    name: data.name || '',
    message: data.message,
    supportEmail: SUPPORT_EMAIL,
  }));

  await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `Nouveau feedback${data.name ? ' de ' + data.name : ''}`,
    html: ownerHtml,
    replyTo: data.email,
  });

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Merci pour votre feedback !',
    html: userHtml,
    replyTo: SUPPORT_EMAIL,
  });

  return { ok: true };
}
