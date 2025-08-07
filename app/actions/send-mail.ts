import { Resend } from 'resend';
import { render } from '@react-email/components';
import NewsletterWelcome from '@/components/email-templates/NewsletterWelcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMail(to: string, subject: string, html: string) {
    await resend.emails.send({
        from: 'Links by ReachDem <prelaunch@updates.reachdem.cc>',
        to,
        subject,
        html,
    });
}

export async function sendWelcomeEmail(to: string, unsubscribeUrl?: string) {
    const emailHtml = await render(NewsletterWelcome({ 
        unsubscribeUrl: unsubscribeUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(to)}`
    }));
    
    await resend.emails.send({
        from: 'Links by ReachDem <prelaunch@updates.reachdem.cc>',
        to,
        subject: 'Bienvenue dans notre newsletter !',
        html: emailHtml,
    });
}
