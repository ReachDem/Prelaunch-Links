import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Nom trop court." }).max(100),
  email: z.string().email({ message: "Email invalide." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message trop court." }).max(2000, { message: "Message trop long." }),
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
