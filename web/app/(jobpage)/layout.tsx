import { Navbar } from "@/components/navbar";
import { NavbarMobile } from "@/components/navbarMobile";

const JobpageLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <div className="h-full dark:bg-[#1F1F1F]">
      <div className="lg:block sm:hidden">
        <Navbar />
      </div>
      <div className="lg:hidden sm:block">
        <NavbarMobile/>
      </div>
      <main className="h-full pt-[9rem]">
        {children}
      </main>
    </div>
   );
}
 
export default JobpageLayout;