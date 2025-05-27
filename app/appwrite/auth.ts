// for all authentication methods here

import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteconfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(OAuthProvider.Google,
      'http://localhost:5173/dashboard',
      'http://localhost:3000/login-failed',
    );
  } catch (error) {
    console.log("loginWithGoogle error :", error);
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();
    if (!user) return redirect("/sign-in");
    const { documents } = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.usersCollectionId,
      [
        Query.equal("accountId", user.$id), // 'accountId' is a field in your collection that links a document to a specific user account by storing their unique Appwrite user ID.
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );
    console.log("documents", documents);
  } catch (error) {
    console.log("loginWithGoogle error :", error);
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log("loginWithGoogle error :", error);
  }
};

export const getGooglePicture = async () => {
  try {
    // get the current user session
    const session = await account.getSession("current");
    // get the oAuth token from session
    const oAuthToken = session.providerAccessToken;
    if (!oAuthToken) {
      console.log("No oAuth Token available");
      return null;
    }

    // make a request to Google People API to get the profile photo
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          Authorization: `Bearer ${oAuthToken}`,
        },
      }
    );

    if (!response.ok) {
      console.log("Failed to fetch profile photo from Google People API");
      return null;
    }

    const data = response.json();

    // extract the profile photo url  from the response
    //@ts-ignore
    const photoUrl = data.photos && data.photos.length > 0 ? data.photos[0].url : null;

    return photoUrl;
  } catch (error) {
    console.log("loginWithGoogle error :", error);
  }
};

export const storeUserData = async () => {
  try {
    const user = await account.get();
    if (!user) console.log("User not found!");
    const { documents } = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.usersCollectionId,
      [Query.equal("accountId", user.$id)]
    );

    if (documents.length > 0) return documents[0];

    // get profile photo from google
    const imageUrl = await getGooglePicture();

    // create new user document
    const newUser = await database.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.usersCollectionId,
      ID.unique(),
      {
        accountId: user.$id,
        name: user.name,
        email: user.email,
        imageUrl: imageUrl || "",
        joinedAt: new Date().toISOString(),
      }
    );
    return newUser;
  } catch (error) {
    console.log("loginWithGoogle error :", error);
  }
};

export const getExistingUser = async () => {
  try {
    const user = await account.get();
    if (!user) {
      console.log("getExistingUser error : user not found !");
      return null;
    }
    const { documents } = await database.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.usersCollectionId,
      [Query.equal("accountId", user.$id)]
    );
    if (documents.length === 0) return null;

    return documents[0];
  } catch (error) {
    console.log("loginWithGoogle error :", error);
  }
};
