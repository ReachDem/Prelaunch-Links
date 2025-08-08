"use client";
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { ContactFormSchema, type ContactFormSchemaType } from '@/components/validations/contact';
import { submitContact } from '@/app/actions/contact';
import { toast } from 'sonner';

export function ContactForm() {
  const form = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: ContactFormSchemaType) => {
    startTransition(async () => {
      const res = await submitContact(values);
      if (!res.ok) {
        toast.error('Erreur lors de l\'envoi.');
        return;
      }
      toast.success('Message envoyé. Vérifiez votre boîte mail.');
      form.reset();
    });
  };

  return (
    <section className="bg-background py-24">
      <div className="container px-4 lg:px-26">
        <Card className="rounded-4xl lg bg-muted w-full border-none">
          <CardContent className="lg:px-18 relative overflow-hidden py-8 lg:py-24">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6">
                <p className="text-muted-foreground text-sm font-semibold tracking-tight">REACHDEM</p>
                <div className="size-30 bg-foreground relative flex items-center justify-center rounded-3xl p-2.5 shadow-xl">
                  <div className="bg-background flex size-full items-center justify-center rounded-2xl p-4">
                    <Avatar className="size-full">
                      <AvatarImage src="https://github.com/reachdem.png" alt="avatar" className="object-cover" />
                      <AvatarFallback>RD</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <h1 className="text-foreground text-5xl font-bold tracking-tighter">Contact</h1>
                <ul className="max-w-lg space-y-2 tracking-tight text-sm">
                  <li className="flex items-center"><span className="mr-2 font-bold">Email:</span> <span className="text-foreground/80 underline">contact@reachdem.cc</span></li>
                  <li className="flex items-center"><span className="mr-2 font-bold">Téléphone:</span> <span className="text-foreground/80">+237233472836</span></li>
                  <li className="flex items-center"><span className="mr-2 font-bold">Horaire:</span> <span className="text-foreground/80">Lun - Ven. 8h-19h WAT (UTC+1)</span></li>
                </ul>
              </div>
              <div className="mt-6 flex h-auto flex-col gap-4 space-y-3 md:pl-3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" className="bg-background p-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="vous@exemple.com" className="bg-background p-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="+237..." className="bg-background p-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Votre message" className="bg-background p-6" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isPending} className="h-10 w-fit">
                      {isPending ? 'Envoi...' : 'Envoyer'}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
