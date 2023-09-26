import { z } from "zod";

export const CurrentInputMessage = z.object({
  message: z.string().max(200,"Please enter a shorter message")
});

export type MessageInputBoxFormData = z.infer<typeof CurrentInputMessage>;