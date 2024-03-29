import admin from 'firebase-admin'
interface FirebaseAdminResult {
  app: admin.app.App
  firestore: admin.firestore.Firestore
  auth: admin.auth.Auth
  database: admin.database.Database
  serverTimestamp: admin.firestore.FieldValue
  getDataWithId: <T>(doc: admin.firestore.DocumentSnapshot) => T
}

export default function firebaseAdmin(): FirebaseAdminResult {
  if (!admin.apps.length) {
    admin.initializeApp({
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: String(
          process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
        ).replace(/\\n/g, '\n'),
      }),
    })
  }

  const getDataWithId = <T>(doc: admin.firestore.DocumentSnapshot): T => {
    return ({
      ...doc.data(),
      id: doc.id,
    } as unknown) as T
  }

  return {
    app: admin.app(),
    auth: admin.auth(),
    database: admin.database(),
    firestore: admin.firestore(),
    serverTimestamp: admin.firestore.FieldValue.serverTimestamp(),
    getDataWithId,
  }
}
