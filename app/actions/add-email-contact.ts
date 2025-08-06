import React from 'react'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function AddEmailContact(email: string) {
    await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.AUDIENCE_ID || '',
    });
}

export default AddEmailContact