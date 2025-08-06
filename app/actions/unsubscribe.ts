'use server'

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function unsubscribeFromNewsletter(email: string) {
  try {
    // Créer/mettre à jour le contact avec unsubscribed=true
    await resend.contacts.create({
      email,
      unsubscribed: true,
      audienceId: process.env.AUDIENCE_ID || '',
    });
    
    return { success: true, message: 'Désabonnement réussi' };
  } catch (error) {
    console.error('Erreur lors du désabonnement:', error);
    return { success: false, message: 'Erreur lors du désabonnement' };
  }
}
