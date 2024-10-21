"use client";
import React from "react";
import // useState, ChangeEvent,
// FormEvent,
"react";

// interface FormData {
//   firstName: string;
//   middleName?: string;
//   surname: string;
//   gender: string;
//   phone: string;
//   email: string;
//   ledeyoSet: string;
//   contactsAttended: number;
//   commissioning: string;
//   workshops: string[];
//   nationality: string;
//   country: string;
//   state: string;
//   city: string;
//   education: string;
//   discipline: string;
//   occupation: string;
//   crossCareer: string;
//   crossCareerPath?: string;
//   callMinistry: string;
//   ministryCalling?: string;
//   expectations?: string;
//   suggestions?: string;
// }

// export default function Bio() {
//   const [formData, setFormData] = useState<FormData>({
//     firstName: "",
//     surname: "",
//     gender: "",
//     phone: "",
//     email: "",
//     ledeyoSet: "",
//     contactsAttended: 1,
//     commissioning: "Yes",
//     workshops: [],
//     nationality: "",
//     country: "",
//     state: "",
//     city: "",
//     education: "",
//     discipline: "",
//     occupation: "",
//     crossCareer: "No",
//     callMinistry: "No",
//   });

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  ledeyoSet: z.string(),
  workshops: z.string(),
  nationality: z.string(),
  city: z.string(),
  commissioning: z.string(),
  state: z.string(),
  country: z.string(),
  contactsAttended: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Participation() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ledeyoSet: "",
      workshops: "",
      nationality: "",
      city: "",
      commissioning: "",
      state: "",
      contactsAttended: "",
      country: "",
    },
  });

  // const handleSubmit = async (values: FormValues) => {
  // try {
  //   const response = await fetch("/api/submit", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   if (response.ok) {
  //     alert("Form submitted successfully!");
  //     console.log(response);
  //     router.replace("/form/education-career");
  //   } else {
  //     alert("Form submission failed.");
  //   }
  // } catch (error) {
  //   console.log(error);
  //   alert("An error occurred");
  // }
  // };

  const handleSubmit = async (values: FormValues) => {
    // Retrieve existing data from local storage
    const existingData = localStorage.getItem("data");
    const updatedData = existingData ? JSON.parse(existingData) : {};

    // Merge existing data with new values
    const mergedData = { ...updatedData, ...values };

    // Save the merged data back to local storage
    localStorage.setItem("data", JSON.stringify(mergedData));

    router.replace("/form/education-career");
  };

  // Define a type for the form field names
  type FormFieldNames =
    | "ledeyoSet"
    | "commissioning"
    | "workshops"
    | "nationality"
    | "country"
    | "state"
    | "city"
    | "contactsAttended";

  // Update the formFields array to use the new type
  const formFields: {
    name: FormFieldNames;
    label: string;
    type: string;
    options?: string[] | number[];
    placeholder?: string;
  }[] = [
    {
      name: "ledeyoSet",
      label: "Which LEDEYO Set do you belong to",
      type: "select",
      options: ["Set 1", "Set 2", "Set 3", "Set 4", "Set 5"],
    },
    {
      name: "contactsAttended",
      label: "How many LEDEYO contacts did you attend?",
      placeholder: "Enter number of Contacts Attended",
      type: "select",
      options: [1, 2],
    },
    {
      name: "commissioning",
      label: "Did you attend the Commissioning?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      name: "workshops",
      label: "Workshops Attended during LEDEYO",
      type: "select",
      options: [
        "ICT",
        "Health Practitioners",
        "Legal",
        "Youth in Ministry",
        "Business & Finance",
      ],
    },
    {
      name: "nationality",
      label: "Nationality",
      type: "select",
      options: ["Nigerian", "Foreigner"],
    },
    {
      name: "country",
      label: "Country of Residence",
      placeholder: "Enter your Country",
      type: "select",
      options: ["Nigeria", "International"],
    },
    {
      name: "state",
      label: "State/Province of Residence",
      type: "select",
      options: ["state", "state"],
    },
    {
      name: "city",
      label: "City of Residence",
      type: "select",
      options: ["city", "city"],
    },
  ];

  // ... existing code ...

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
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
                            className="border w-full rounded-md py-2 text-xs md:text-sm"
                          >
                            <option value="">Select </option>
                            {field?.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <Input
                          placeholder={field.placeholder}
                          {...formField}
                          type={field.type || "text"}
                        />
                      )}
                    </FormControl>
                    {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="float-right my-3 border">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
