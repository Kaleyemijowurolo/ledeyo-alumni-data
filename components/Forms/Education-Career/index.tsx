// "use client";
// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   // FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import {
//   decryptData,
//   encryptData,
//   encryptionKey,
//   encryptionKeyIV,
// } from "@/lib";

// const formSchema = z.object({
//   education: z.string().min(2, { message: "required" }),
//   discipline: z.string().min(2, { message: "required" }),
//   occupation: z.string().min(2, { message: "required" }),
//   crossCareerPath: z.string().min(2, { message: "required" }),
//   callMinistry: z.string().min(2, { message: "required" }),
//   ministryCalling: z.string().optional(),
// });

// type FormValues = z.infer<typeof formSchema>;

// export default function EducationCareer() {
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       education: "",
//       discipline: "",
//       occupation: "",
//       crossCareerPath: "",
//       callMinistry: "",
//     },
//   });

//   const router = useRouter();

//   const [showOtherInput, setShowOtherInput] = React.useState(false);
//   const [ministryCalling, setMinistryCalling] = React.useState(false);
//   const [crossCareerPath, setCrossCareerPath] = React.useState(false);

//   const handleEducationChange = (value: string, field: string) => {
//     if (field === "education") {
//       setShowOtherInput(value === "Other (Please specify)" ? true : false);
//     } else if (field === "callMinistry") {
//       setMinistryCalling(value === "Yes" ? true : false);
//     } else if (field === "") {
//       setCrossCareerPath(value === "Yes" ? true : false);
//     } else {
//       return;
//     }
//   };

//   // const onSubmit = () => {
//   //   router.push("/form/feedback");
//   // };

//   // const handleSubmit = async (values: FormValues) => {
//   //   try {
//   //     const response = await fetch("/api/submit", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(values),
//   //     });

//   //     if (response.ok) {
//   //       alert("Form submitted successfully!");
//   //       console.log(response);
//   //       router.push("/form/feedback");
//   //     } else {
//   //       alert("Form submission failed.");
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     alert("An error occurred");
//   //   }
//   // };

//   const handleSubmit = async (values: FormValues) => {
//     // Retrieve existing data from localStorage
//     const existingData = localStorage.getItem("data");
//     if (existingData) {
//       // Decrypt the existing data
//       const decrypt = decryptData(existingData, encryptionKey, encryptionKeyIV);
//       console.log(decrypt, "decrypt in participation");

//       // Parse the decrypted data or use an empty object if decryption fails
//       const updatedData = decrypt ? JSON.parse(decrypt) : {};

//       // Merge the existing data with the new form values
//       const mergedData = { ...updatedData, ...values };

//       // Encrypt the merged data
//       const encryptValuesString = JSON.stringify(mergedData);
//       const encryptValues = encryptData(
//         encryptValuesString,
//         encryptionKey,
//         encryptionKeyIV
//       );

//       // Store the encrypted data back in localStorage
//       localStorage.setItem("data", encryptValues);

//       // Redirect to the feedback page
//       router.push("/form/feedback");
//     }
//   };

//   // Define an array of form fields
//   const formFields: {
//     name:
//       | "education"
//       | "discipline"
//       | "occupation"
//       | "crossCareerPath"
//       | "callMinistry";
//     label: string;
//     placeholder?: string;
//     type?: string;
//     options?: string[];
//   }[] = [
//     {
//       name: "education",
//       label: "Highest Level of Education",
//       type: "select",
//       options: [
//         "High School Diploma",
//         "Vocational/Technical Certificate",
//         "Associate's Degree (Diploma)",
//         "Bachelor's Degree",
//         "Master's Degree",
//         "Doctorate (PhD or equivalent)",
//         "Professional Certification",
//         "Currently Enrolled in Undergraduate Program",
//         "Currently Enrolled in Postgraduate Program",
//         "Other (Please specify)",
//       ],
//     },
//     {
//       name: "discipline",
//       label: "Discipline  (Course of study you graduated with)",
//       placeholder: "Enter your Discipline",
//       type: "text",
//     },
//     {
//       name: "occupation",
//       label: "Occupation (Your present job)",
//       placeholder: "Enter your Occupation",
//       type: "text",
//     },
//     {
//       name: "crossCareerPath",
//       label: "Do you intend to cross into another career path?",
//       type: "select",
//       options: ["Yes", "No"],
//     },

//     {
//       name: "callMinistry",
//       label: "Do you sense the call of God outside your career path?",
//       type: "select",
//       options: ["Yes", "No"],
//     },
//   ];

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)} className="">
//           <div className="grid md:grid-cols-2 gap-3 items-start">
//             {formFields.map((field) => (
//               <FormField
//                 key={field.name}
//                 name={field.name}
//                 control={form.control}
//                 render={({ field: formField }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm">{field.label}</FormLabel>
//                     <FormControl>
//                       {field.type === "select" ? (
//                         <div>
//                           <select
//                             {...formField}
//                             onChange={(e) => {
//                               formField.onChange(e);
//                               handleEducationChange(e.target.value, field.name);
//                             }}
//                             className="border w-full rounded-md py-2 text-xs md:text-sm"
//                           >
//                             <option value="">Select </option>
//                             {field?.options?.map((option) => (
//                               <option key={option} value={option} className="">
//                                 {option}
//                               </option>
//                             ))}
//                           </select>
//                           {field.name === "education" && showOtherInput && (
//                             <div className="mt-2">
//                               <Input
//                                 placeholder="Please specify"
//                                 {...form.register(
//                                   `Other (Please specify)` as never
//                                 )}
//                                 type="text"
//                               />
//                             </div>
//                           )}
//                           {field.name === "callMinistry" && ministryCalling && (
//                             <div className="mt-2">
//                               <Input
//                                 placeholder="please mention the calling"
//                                 {...form.register(`ministryCalling` as never)}
//                                 type="text"
//                               />
//                             </div>
//                           )}
//                           {field.name === "crossCareerPath" &&
//                             crossCareerPath && (
//                               <div className="mt-2">
//                                 <Input
//                                   placeholder="please mention the career path"
//                                   {...form.register(`crossCareerPath` as never)}
//                                   type="text"
//                                 />
//                               </div>
//                             )}
//                         </div>
//                       ) : (
//                         <Input
//                           placeholder={field.placeholder}
//                           {...formField}
//                           type={field.type || "text"}
//                         />
//                       )}
//                     </FormControl>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             ))}
//           </div>
//           <div className="float-right my-3">
//             <Button type="submit">Next</Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  decryptData,
  encryptData,
  encryptionKey,
  encryptionKeyIV,
} from "@/lib";

const formSchema = z.object({
  education: z.string().min(2, { message: "required" }),
  discipline: z.string().min(2, { message: "required" }),
  occupation: z.string().min(2, { message: "required" }),
  crossCareerPath: z.string().min(2, { message: "required" }),
  callMinistry: z.string().min(2, { message: "required" }),
  ministryCalling: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EducationCareer() {
  const router = useRouter();

  const [showOtherInput, setShowOtherInput] = useState(false);
  const [ministryCalling, setMinistryCalling] = useState(false);
  const [crossCareerPath, setCrossCareerPath] = useState(false);
  // const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: "",
      discipline: "",
      occupation: "",
      crossCareerPath: "",
      callMinistry: "",
    },
  });

  // Load initial values from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const encryptedData = localStorage.getItem("data");
      if (encryptedData) {
        try {
          const decryptedDataString = decryptData(
            encryptedData,
            encryptionKey,
            encryptionKeyIV
          );
          const decryptedData = JSON.parse(decryptedDataString);
          console.log("decryptedData:", decryptedData);
          form.reset(decryptedData); // Set the decrypted data as form's initial values
        } catch (error) {
          console.error("Error decrypting data:", error);
        }
      }
    }
  }, []);

  const handleEducationChange = (value: string, field: string) => {
    if (field === "education") {
      setShowOtherInput(value === "Other (Please specify)");
    } else if (field === "callMinistry") {
      setMinistryCalling(value === "Yes");
    } else if (field === "crossCareerPath") {
      setCrossCareerPath(value === "Yes");
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const existingData = localStorage.getItem("data");
    if (existingData) {
      const decrypt = await decryptData(
        existingData,
        encryptionKey,
        encryptionKeyIV
      );
      const updatedData = decrypt ? JSON.parse(decrypt) : {};
      const mergedData = { ...updatedData, ...values };

      const encryptValuesString = JSON.stringify(mergedData);
      const encryptValues = await encryptData(
        encryptValuesString,
        encryptionKey,
        encryptionKeyIV
      );
      localStorage.setItem("data", encryptValues);
      router.push("/form/feedback");
    }
  };

  const formFields: {
    name:
      | "education"
      | "discipline"
      | "occupation"
      | "crossCareerPath"
      | "callMinistry";
    label: string;
    placeholder?: string;
    type?: string;
    options?: string[];
  }[] = [
    {
      name: "education",
      label: "Highest Level of Education",
      type: "select",
      options: [
        "High School Diploma",
        "Vocational/Technical Certificate",
        "Associate's Degree (Diploma)",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate (PhD or equivalent)",
        "Professional Certification",
        "Currently Enrolled in Undergraduate Program",
        "Currently Enrolled in Postgraduate Program",
        "Other (Please specify)",
      ],
    },
    {
      name: "discipline",
      label: "Discipline (Course of study you graduated with)",
      placeholder: "Enter your Discipline",
      type: "text",
    },
    {
      name: "occupation",
      label: "Occupation (Your present job)",
      placeholder: "Enter your Occupation",
      type: "text",
    },
    {
      name: "crossCareerPath",
      label: "Do you intend to cross into another career path?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "callMinistry",
      label: "Do you sense the call of God outside your career path?",
      type: "select",
      options: ["Yes", "No"],
    },
  ];

  const handlePrevious = async () => {
    router.push("/form/participation");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="grid md:grid-cols-2 gap-3 items-start">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                control={form.control}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-sm">{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <div>
                          <select
                            {...formField}
                            onChange={(e) => {
                              formField.onChange(e);
                              handleEducationChange(e.target.value, field.name);
                            }}
                            className="border w-full rounded-md py-2 text-xs md:text-sm"
                          >
                            <option value="">Select</option>
                            {field?.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          {field.name === "education" && showOtherInput && (
                            <div className="mt-2">
                              <Input
                                placeholder="Please specify"
                                {...form.register(
                                  "Other (Please specify)" as never
                                )}
                                type="text"
                              />
                            </div>
                          )}
                          {field.name === "callMinistry" && ministryCalling && (
                            <div className="mt-2">
                              <Input
                                placeholder="please mention the calling"
                                {...form.register("ministryCalling" as never)}
                                type="text"
                              />
                            </div>
                          )}
                          {field.name === "crossCareerPath" &&
                            crossCareerPath && (
                              <div className="mt-2">
                                <Input
                                  placeholder="please mention the career path"
                                  {...form.register("crossCareerPath" as never)}
                                  type="text"
                                />
                              </div>
                            )}
                        </div>
                      ) : (
                        <Input
                          placeholder={field.placeholder}
                          {...formField}
                          type={field.type || "text"}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="float-right my-3 flex gap-x-4 mt-6">
            <Button
              onClick={handlePrevious}
              className="bg-transparent border text-black hover:bg-transparent hover:opacity-70"
              type="button"
            >
              Previous
            </Button>
            <Button type="submit">{"Next"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
