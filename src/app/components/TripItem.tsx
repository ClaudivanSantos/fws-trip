import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface TripItemProps {
  trip: Trip;
}

export default function TripItem(props: TripItemProps) {
  return (
    <Link href={`/trips/${props.trip.id}`}>
    <div className="flex flex-col">
      <div className="relative h-[280px] w-[280px]">
        <Image
          src={props.trip.coverImage}
          fill
          alt={props.trip.name}
          style={{ objectFit: "cover" }}
          className="rounded-lg shadow-md"
        />
      </div>
      <h3 className="text-primaryDarker font-medium text-sm">
        {props.trip.name}
      </h3>
      <div className="flex items-center gap-1 my-1">
        <ReactCountryFlag countryCode={props.trip.countryCode} svg />
        <p className="text-xs text-grayPrimary">{props.trip.location}</p>
      </div>
      <p className="text-xs text-grayPrimary mt-2">
        <span className="text-primary font-medium">
          R${props.trip.pricePerDay.toString()}{" "}
          
        </span>
        por dia
      </p>
    </div>
    </Link>
  );
}
