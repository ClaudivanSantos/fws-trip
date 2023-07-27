"use client";
import Button from "@/app/components/Button";
import DatePicker from "@/app/components/DatePicker";
import Input from "@/app/components/Input";
import { Trip } from "@prisma/client";
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
    handleSubmit,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
              onChange={
                field.onChange
              }
              selected={field.value}
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
          className="w-full"
          placeholder="Data final"
          error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              onChange={
                field.onChange
              }
              selected={field.value}
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
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>
      <Button className="mt-3" onClick={() => handleSubmit(onSubmit)()}>
        Reservar agora
      </Button>
    </div>
  );
}
