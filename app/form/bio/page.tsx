import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Bio from "@/components/Forms/Bio";

export default function BioPage() {
  return (
    <div className="px-2 flex flex-col md:px-24 py-12 bg-blue-100 h-screen">
      <Breadcrumb pageName="Bio" />

      <div className="flex flex-1 justify-center items-center">
        <div className="w-full md:w-3/5 p-4 sm:p-12.5 xl:p-15 rounded-[10px] border-[0.5px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Bio />
        </div>
      </div>
    </div>
  );
}
