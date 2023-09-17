import { z } from "zod";

export const JoinRoomSchema = z.object({
  room: z.string().min(4).max(4),
  username: z.string().min(3).max(25),
});

export type JoinRoomFormData = z.infer<typeof JoinRoomSchema>;