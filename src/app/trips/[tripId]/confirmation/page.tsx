"use client";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/Button";

export default function TripConfirmation({
  params,
}: {
  params: { tripId: string };
}) {
  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = searchParams.get("guests");

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate,
          endDate,
        }),
      });
      const { trip, totalPrice } = await response.json();

      setTrip(trip);
      setTotalPrice(totalPrice);
    };
    fetchTrip();
  }, []);

  if (!trip) return null;

  return (
    <div className="container mx-auto p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>
      {/* Card */}
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-grayLighter border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              alt={trip.name}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>
        <h3 className="font-semibold text-sm text-primaryDarker mt-3">
          Informações sobre o preço
        </h3>

        <div className="flex justify-between">
          <p className="font-medium text-primaryDarker">Total</p>
          <p className="font-medium">R${totalPrice}</p>
        </div>
      </div>
      <div className="flex flex-col mt-5 text-primaryDarker">
        <h3 className="font-semibold">Data</h3>
        <div className="flex gap-1 items-center mt-1">
          <p>
            {format(new Date(startDate as string), "dd 'de' MMM", {
              locale: ptBR,
            })}
          </p>
          {" - "}
          <p>
            {format(new Date(endDate as string), "dd 'de' MMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        <h3 className="font-semibold mt-5">Hóspedes</h3>
        <p>{guests} hóspedes</p>

        <Button className="mt-5">Finalizar compra</Button>
      </div>
    </div>
  );
}
