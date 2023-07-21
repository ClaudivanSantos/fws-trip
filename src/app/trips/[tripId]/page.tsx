import { prisma } from "@/lib/prisma";
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "./components/TripReservation";
import { TripDescription } from "./components/TripDescription";
import { TripsHighlights } from "./components/TripsHighlights";
import { TripLocation } from "./components/TripLocation";

const getTripsDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });
  return trip;
};

export default async function TripDetails({
  params,
}: {
  params: { tripId: string };
}) {
  const trip = await getTripsDetails(params.tripId);

  return (
    <>
      {trip ? (
        <div className="container mx-auto">
          <TripHeader trip={trip}/>
          <TripReservation trip={trip}/>
          <TripDescription description={trip.description}/>
          <TripsHighlights highlights={trip.highlights}/>
          <TripLocation locationDescription={trip.locationDescription} location={trip.location}/>
        </div>
      ) : (
        <div>
          <h2>Não foi encontrada esse local</h2>
        </div>
      )}
    </>
  );
}
