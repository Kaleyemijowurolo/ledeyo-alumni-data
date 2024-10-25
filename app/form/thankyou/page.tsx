"use client";
import { decryptData, encryptionKey, encryptionKeyIV } from "@/lib";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useEffect and useState
// import { toast } from "sonner";

export default function FeedbackPage() {
  const [firstName, setFirstName] = useState<string>(""); // State to hold firstName
  const [countdown, setCountdown] = useState<number>(15); // State for countdown
  const router = useRouter();

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("/api/getAllAlumni", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       console.log(response);
  //     } else {
  //       console.log("faled");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("An error occurred");
  //   }
  // };

  useEffect(() => {
    // Replace the current route in history with `/thankyou`
    router.replace("/form/thankyou");
  }, [router]);

  useEffect(() => {
    // handleSubmit();
    const formData = localStorage.getItem("data"); // Get firstName from localStorage
    if (!formData) return;
    const decrypt = decryptData(formData, encryptionKey, encryptionKeyIV);

    // Decrypt the existing data
    const dataObj = JSON.parse(decrypt!);
    if (formData) {
      setFirstName(dataObj?.firstName); // Set firstName state if it exists
    }

    // Countdown logic
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect after 15 seconds
    const redirectTimer = setTimeout(() => {
      // localStorage.clear();
      router.push("/"); // Redirect to home page
    }, 15000);

    return () => {
      clearInterval(timer); // Clear interval on component unmount
      clearTimeout(redirectTimer); // Clear timeout on component unmount
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <div className="px-2 flex flex-col md:px-24 py-12 h-screen bg-orange-100/10">
      <div className="flex flex-1 justify-center items-center">
        <div className="grid place-items-center">
          {/* <Image height={50} width={50} src={"/success.gif"} alt="success" /> */}
          {/* <Image height={300} width={300} src={"/suc.webp"} alt="success" /> */}
          <br />
          <div className="w-full md:w-3/5 p-4 sm:p-12.5 xl:p-15 rounded-[10px] border-[0.5px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            {`
         Thank you, ${firstName}, for taking the time to complete the LEDEYO Global Forum Database form. Your input is invaluable, and we appreciate your commitment to making this community stronger. We look forward to growing together!
         `}
            <div className="mt-4 text-sm">
              Redirecting to homepage in {countdown} seconds...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
