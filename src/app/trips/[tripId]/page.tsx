import { prisma } from "@/lib/prisma";
import { TripHeader } from "./components/TripHeader";

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
         
          {/* Reserva */}
        </div>
      ) : (
        <div>
          <h2>Não foi encontrada esse local</h2>
        </div>
      )}
    </>
  );
}
