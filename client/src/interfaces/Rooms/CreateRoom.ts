import { z } from "zod";

export const CreateRoomSchema = z.object({
  username: z.string().min(3).max(25),
});

export type CreateRoomFormData = z.infer<typeof CreateRoomSchema>;