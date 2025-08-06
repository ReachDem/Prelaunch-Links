'use client'
import React, { useState } from 'react'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSchema, FormSchemaType } from "@/components/validations/newsletter";
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

export default function NewsLetterInput() {
	const [isLoading, setIsLoading] = useState(false);
	
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	})

	const onSubmit = async (data: FormSchemaType) => {
		setIsLoading(true);
		try {
			const result = await subscribeToNewsletter(data.email);
			
			if (result.success) {
				toast.success(result.message);
				form.reset();
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error('Une erreur est survenue lors de l\'inscription.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 mx-auto space-y-6">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<div className="flex w-full items-center gap-2">
								<FormControl>
									<Input placeholder="entrez votre email" {...field} />
								</FormControl>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? 'Inscription...' : 'Soumettre'}
								</Button>
							</div>
							<FormDescription>
								Recevez nos updates et soyez le premier informé des le lancement.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
