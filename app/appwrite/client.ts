import { Account, Client, Databases, Storage } from "appwrite";

// getting all appwirte variables
export const appwriteconfig = {
  endpointUrl: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  apiKey: import.meta.env.VITE_APPWRITE_API_KEY,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_USERS_COLLECTION_ID, // <-- must match .env
  tripsCollectionId: import.meta.env.VITE_APPWRITE_DATABASE_TRIPS_COLLECTION_ID, // <-- must match .env
};

//  This connects your frontend to the Appwrite backend using the correct URL and project ID
const client = new Client()
  .setEndpoint(appwriteconfig.endpointUrl)
  .setProject("684425b00014aa1339b3");
const account = new Account(client); // for login , signup,logout
const database = new Databases(client); // for interact with collection
const storage = new Storage(client); // for file upload and download

export { client, account, database, storage };
