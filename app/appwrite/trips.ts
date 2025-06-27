// fetching all trips or any trip by id

import { Query } from "appwrite";
import { appwriteconfig, database } from "./client";

// fetch all trips
export const getAllTrips = async (limit: number, offset: number) => {
  const allTrips = await database.listDocuments(
    appwriteconfig.databaseId,
    appwriteconfig.tripsCollectionId,
    [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
  );

  if (allTrips.total === 0) {
    console.error("NO trips found");
    return { allTrips: [], total: 0 };
  }

  return {
    allTrips: allTrips.documents,
    total: allTrips.total,
  };
};

// fetch single trip
export const getTripById = async (tripId: number) => {
  const trip = await database.getDocument(
    appwriteconfig.databaseId,
    appwriteconfig.tripsCollectionId,
    //@ts-ignore
    tripId
  );
if(!trip){
  console.log(`No Trip with id : ${tripId} found`);
  return null;
}

return trip;

};
