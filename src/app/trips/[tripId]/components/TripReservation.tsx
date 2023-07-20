"use client";
import Button from "@/app/components/Button";
import DatePicker from "@/app/components/DatePicker";
import Input from "@/app/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
  trip: Trip;
}

export function TripReservation({ trip }: TripReservationProps) {
  return (
    <div className="flex flex-col px-5 pb-10 border-b border-l-grayLighter">
      <div className="flex gap-4 px-5">
        <DatePicker
          className="w-full "
          placeholder="Data de Início"
          onChange={() => {}}
        />
        <DatePicker
          className="w-full"
          placeholder="Data final"
          onChange={() => {}}
        />
      </div>
      <Input
        className="mt-4"
        placeholder={`Numero de hóspedes (max: ${trip.maxGuests})`}
      />
      <div className="flex justify-between mt-3 ">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>
      <Button className="mt-3">Reservar agora</Button>
    </div>

    
  );
}
