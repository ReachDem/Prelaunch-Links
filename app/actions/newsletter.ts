'use server'

import { sendWelcomeEmail } from './send-mail';
import AddEmailContact from './add-email-contact';

export async function subscribeToNewsletter(email: string) {
  try {
    // Ajouter le contact à la liste
    await AddEmailContact(email);
    
    // Envoyer l'email de bienvenue
    await sendWelcomeEmail(email);
    
    return { success: true, message: 'Inscription réussie !' };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return { success: false, message: 'Une erreur est survenue lors de l\'inscription.' };
  }
}
