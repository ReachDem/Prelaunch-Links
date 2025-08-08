import * as React from 'react';

interface FeedbackOwnerCopyProps {
  email: string;
  name: string;
  message: string;
}

export default function FeedbackOwnerCopy({ email, name, message }: FeedbackOwnerCopyProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
      <h2 style={{ margin: '0 0 16px' }}>Nouveau feedback reçu</h2>
      <p><strong>De :</strong> {name ? `${name} <${email}>` : email}</p>
      <p style={{ margin: '16px 0 8px' }}><strong>Message :</strong></p>
      <pre style={{ whiteSpace: 'pre-wrap', background:'#f7f7f9', padding:12, borderRadius:6, fontSize:14, fontFamily:'monospace' }}>{message}</pre>
      <p style={{ fontSize:12, color:'#666' }}>— Collecte automatique ReachDem</p>
    </div>
  );
}
