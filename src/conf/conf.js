const conf = {
    // appwrite url change in variable
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    // appwrite project Id change in variable
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    // appwrite database Id change in variable
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    // appwrite collection Id change in variable
    appwriteCollectioId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    // appwrite bucket Id change in variable
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf