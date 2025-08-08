import * as React from 'react';

interface FeedbackUserCopyProps {
  email: string;
  name: string;
  message: string;
  supportEmail: string;
}

export default function FeedbackUserCopy({ name, message, supportEmail }: FeedbackUserCopyProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
      <h2 style={{ margin: '0 0 16px' }}>Merci pour votre feedback{ name ? `, ${name}` : '' } !</h2>
      <p>Nous avons bien reçu votre retour. Il nous aide à améliorer l'application.</p>
      <p style={{ margin: '16px 0 8px' }}>Votre message :</p>
      <pre style={{ whiteSpace: 'pre-wrap', background:'#f7f7f9', padding:12, borderRadius:6, fontSize:14, fontFamily:'monospace' }}>{message}</pre>
      <p>Si vous souhaitez ajouter des précisions, vous pouvez répondre directement à cet email.</p>
      <p style={{ fontSize:12, color:'#666' }}>— L'équipe ReachDem<br/>{supportEmail}</p>
    </div>
  );
}
