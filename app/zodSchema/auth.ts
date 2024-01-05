import {z} from "zod";

export const authSchema = z.object({
  email: z.string().email("email is not valid"),
});

export type Email = z.infer<typeof authSchema>;
