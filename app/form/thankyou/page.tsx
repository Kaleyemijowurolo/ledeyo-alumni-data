export default function FeedbackPage() {
  return (
    <div className="px-2 flex flex-col md:px-24 py-12 h-screen bg-orange-100/10">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-full md:w-3/5 p-4 sm:p-12.5 xl:p-15 rounded-[10px] border-[0.5px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          {`
         Thank you, [First Name], for taking the time to complete the LEDEYO Global Forum Database form. Your input is invaluable, and we appreciate your commitment to making this community stronger. We look forward to growing together!
         `}
        </div>
      </div>
    </div>
  );
}
