import * as React from 'react';

interface ContactConfirmationProps {
  name: string;
  message: string;
  supportEmail: string;
}

export default function ContactConfirmation({ name, message, supportEmail }: ContactConfirmationProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
      <h2 style={{ margin: '0 0 16px' }}>Bonjour {name || ''},</h2>
      <p>Nous avons bien reçu votre message et vous répondrons au plus vite.</p>
      <p style={{ whiteSpace: 'pre-line', background: '#f7f7f9', padding: '12px', borderRadius: 6, fontSize: 14 }}>{message}</p>
      <p>Besoin d'ajouter quelque chose ? Répondez simplement à cet email.</p>
      <p style={{ fontSize: 12, color: '#666' }}>— L'équipe ReachDem<br/>{supportEmail}</p>
    </div>
  );
}
