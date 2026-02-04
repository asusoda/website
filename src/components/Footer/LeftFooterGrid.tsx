import { AllRightsReserved } from "./CopyrightsNotice";

export function LeftFooterGrid() {
  return (
    <section className="flex flex-col space-y-3 w-full h-full">
      <img
        src="logo/Soda_Logo_Dark_Mode.svg"
        width="314"
        height="132"
        className="w-28"
        alt="SoDA Logo"
      />
      <span className="text-soda-gray italic">Since 2008</span>
      <AllRightsReserved />
    </section>
  );
}
