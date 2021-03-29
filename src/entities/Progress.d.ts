import admin from 'firebase-admin'

export default interface Progress {
  userId: string
  videoId: string
  animeId: string
  progress: string
  completed: boolean
  createdAt: admin.firestore.FieldValue
  updatedAt: admin.firestore.FieldValue
}
