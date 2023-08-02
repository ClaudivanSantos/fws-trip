"use client";
import Button from "@/app/components/Button";
import DatePicker from "@/app/components/DatePicker";
import Input from "@/app/components/Input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  trip: Trip;
}

interface TripReservationForm {
  guests: number;
  startDate: Date;
  endDate: Date;
}

export function TripReservation({ trip }: TripReservationProps) {
  const {
    register,
    control,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId: trip.id,
        })
      ),
    });
    if (differenceInDays(endDate, startDate) * Number(trip.pricePerDay) == 0) {
      setError("endDate", {
        type: "manual",
        message: "A data final não pode ser menor ou igual a data inicial",
      });
    }

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Essa data já está reservada",
      });
      setError("endDate", {
        type: "manual",
        message: "Essa data já está reservada",
      });
    }

    if (res?.error?.code === "INVALID_END_DATE") {
      setError("startDate", {
        type: "manual",
        message: "Data inválida",
      });
    }
    if (res?.error?.code === "INVALID_START_DATE") {
      setError("endDate", {
        type: "manual",
        message: "Data inválida",
      });
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5 pb-10 border-b border-l-grayLighter">
      <div className="flex gap-4 px-5">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              className="w-full "
              placeholder="Data de Início"
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              minDate={trip.startDate && new Date()}
              maxDate={endDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: {
              value: true,
              message: "Data final é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              placeholder="Data Final"
              className="w-full"
              minDate={(startDate ? startDate : new Date()) ?? trip.startDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
        })}
        className="mt-4"
        placeholder={`Numero de hóspedes (max: ${trip.maxGuests})`}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
      />
      <div className="flex justify-between mt-3 ">
        <p className="font-medium text-sm text-primaryDarker">Total:</p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$${
                differenceInDays(endDate, startDate) * Number(trip.pricePerDay)
              }`
            : "R$0"}
        </p>
      </div>
      <Button className="mt-3" onClick={() => handleSubmit(onSubmit)()}>
        Reservar agora
      </Button>
    </div>
  );
}
