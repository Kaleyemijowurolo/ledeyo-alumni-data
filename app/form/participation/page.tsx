import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Participation from "@/components/Forms/Participation ";

export default function ParticipationPage() {
  return (
    <div
      style={{
        backgroundImage: 'url("/bg-line2.png")',
        backgroundSize: "cover", // Optional: to cover the entire background
        backgroundPosition: "center", // Optional: to center the image
        backgroundRepeat: "no-repeat",
      }}
      className="px-2 flex flex-col md:px-24 py-12 h-screen bg-purple-100/10"
    >
      <Breadcrumb pageName="Participation" />

      <div className="flex flex-1 justify-center items-center">
        <div className="w-full md:w-3/5 p-4 sm:p-12.5 xl:p-15 rounded-[10px] border-[0.5px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <Participation />
        </div>
      </div>
    </div>
  );
}