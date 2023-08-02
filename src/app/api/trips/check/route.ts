import { prisma } from "@/lib/prisma";
import { isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const trip = await prisma.trip.findUnique({
    where:{
      id: req.tripId
    }
  })

  if(!trip){
    return new NextResponse(
      JSON.stringify({
        error:{
          code:"TRIP_NOT_FOUND"
        }
      })
    )
  }


  const reservations = await prisma.tripReservation.findMany({
    where: {
      tripId: req.tripId,
      // VERIFICA SE EXISTE RESERVA ENTRE AS DATAS
      startDate: {
        lte: new Date(req.endDate),
      },
      endDate: {
        gte: new Date(req.startDate),
      },
    },
  });


  if (reservations.length > 0) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_ALREADY_RESERVED",
        },
      })
    );
  }
  return new NextResponse(
    JSON.stringify({
      success: true,
    })
  );
}
