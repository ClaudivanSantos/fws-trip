import Image from "next/image";

function Footer() {
  return (
    <div className=" p-5 justify-center flex flex-col items-center">
      <Image src="/logo.png" width={133} height={23} alt="Full Stack Week" />
      <p className="text-sm font-semibold text-primaryDarker mt-1">Todos os direitos reservados</p>
    </div>
  );
}

export default Footer;
