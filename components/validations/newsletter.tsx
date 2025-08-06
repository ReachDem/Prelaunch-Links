import { z } from "zod"

const FormSchema = z.object({
	email: z.string().email({
		message: "L'email doit être valide.",
	}),
})

export type FormSchemaType = z.infer<typeof FormSchema>

export { FormSchema}
