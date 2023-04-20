import { UserDocId } from "@types";

export default function getUserDocId(
  userEmail: string | null,
  userId: string | null
) {
  if (!userEmail) return;
  if (!userId) return;
  return `${userEmail}${userId}` as UserDocId;
}
