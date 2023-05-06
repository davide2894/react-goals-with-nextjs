export default function mapFirestoreGoalObject(goalObjectFromFirestore: any) {
  return {
    title: goalObjectFromFirestore.title,
    score: goalObjectFromFirestore.score,
    id: goalObjectFromFirestore.id,
    userIdRef: goalObjectFromFirestore.userIdRef,
    timestamp: goalObjectFromFirestore.timestamp,
  };
}
