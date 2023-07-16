import QuickSearchIcon from "./QuickSeachIcon";


export default function QuickSearch() {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className=" px-5 font-medium text-grayPrimary whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>

      <div className="flex w-full justify-between mt-4">
      <QuickSearchIcon alt="icone holtel" src="/iconsQuickSearch/hotel-icon.png" text="Hotel" />
      <QuickSearchIcon alt="icone Fazenda" src="/iconsQuickSearch/farm-icon.png" text="Fazenda" />
      <QuickSearchIcon alt="icone chalé" src="/iconsQuickSearch/cottage-icon.png" text="Chalé" />
      <QuickSearchIcon alt="icone Pousada" src="/iconsQuickSearch/inn-icon.png" text="Pousada" />
      </div>
    </div>
  );
}
