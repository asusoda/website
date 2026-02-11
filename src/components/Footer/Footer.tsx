import HorizontalLine from "../ui/HorizontalLine";
import { LeftFooterGrid } from "./LeftFooterGrid";
import RightFooterGrid from "./RightFooterGrid";

export default function Footer() {
  return (
    <div className=" pt-[100px]">
      <HorizontalLine />
      <footer className="flex mx-auto p-12 md:gap-0 gap-16  md:py-[100px] flex-col  w-full  md:flex-row md:items-center md:max-w-4xl justify-start">
        <LeftFooterGrid />
        <RightFooterGrid />
      </footer>
    </div>
  );
}
