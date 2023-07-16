import Image from "next/image";

interface IconProps{
  src: string;
  alt: string;
  text: string;
}

export default function QuickSearchIcon(props: IconProps) {
  return (
    <div className="flex">
      <div className="flex flex-col items-center gap-1">
        <Image
          width={30}
          height={30}
          src={props.src}
          alt={props.alt}
        />
        <p className="text-sm text-grayPrimary">{props.text}</p>
      </div>
    </div>
  );
}
