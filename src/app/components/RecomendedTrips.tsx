import { Trip } from "@prisma/client";
import TripItem from "./TripItem";
import { useState } from "react";
import { prisma } from "@/lib/prisma";

async function geTrips() {
  const trips = await prisma.trip.findMany({});
  
  return trips;
}

const RecomendedTrips = async () => {
  const data = await geTrips();
  return (
    <div className="container mx-auto p5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className=" px-5 font-medium text-grayPrimary whitespace-nowrap">
          Destinos recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
      <div className="flex flex-col items-center mt-5 gap-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default RecomendedTrips;
