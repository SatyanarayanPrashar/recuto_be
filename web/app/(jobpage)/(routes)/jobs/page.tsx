import { HeroSection } from "../../_components/hero";
import { JobSection } from "../../_components/jobs";

const JobPage = () => {

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <HeroSection />
        <JobSection />   
        <p>Designed and Built by Satya</p>
      </div>
    </div>
  );
}

export default JobPage;