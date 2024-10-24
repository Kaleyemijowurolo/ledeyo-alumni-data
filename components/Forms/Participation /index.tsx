"use client";
import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  decryptData,
  encryptData,
  encryptionKey,
  encryptionKeyIV,
} from "@/lib";

// Define TypeScript types for Country and State
interface State {
  name: string;
}

interface Country {
  name: string;
  states?: State[];
}

const formSchema = z.object({
  ledeyoSet: z.string().min(2, { message: "required" }),
  workshops: z.string().min(2, { message: "required." }),
  nationality: z.string().min(2, { message: "required." }),
  commissioning: z.string().min(2, { message: "required." }),
  state: z.string().optional(), // Make state optional
  country: z.string().min(1, { message: "required." }),
  city: z.string().min(1, { message: "required." }),
  contactsAttended: z.string().min(1, { message: "required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Participation() {
  const router = useRouter();

  const st =
    typeof window !== "undefined" ? sessionStorage.getItem("countries") : "";
  const storedCountries = JSON.parse(st!);
  const [countries] = useState<Country[]>(storedCountries || []); // Use Country type
  const [states, setStates] = useState<State[]>([]); // Use State type

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ledeyoSet: "",
      workshops: "",
      nationality: "",
      commissioning: "",
      state: "",
      city: "",
      contactsAttended: "",
      country: "",
    },
  });

  // Handle country selection and update state options
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find(
      (country: Country) => country.name === event.target.value
    );

    setStates(selectedCountry?.states || []); // Set states or an empty array if none
    form.setValue("country", event.target.value); // Set the country in the form
  };

  // Handle form submission
  const handleSubmit = async (values: FormValues) => {
    // Retrieve existing data from localStorage
    const existingData = localStorage.getItem("data");
    if (existingData) {
      // Decrypt the existing data
      const decrypt = decryptData(existingData, encryptionKey, encryptionKeyIV);
      console.log(decrypt, "decrypt in participation");
      // Parse the decrypted data or use an empty object if decryption fails
      const updatedData = decrypt ? JSON.parse(decrypt) : {};
      // Merge the existing data with the new form values
      const mergedData = { ...updatedData, ...values };

      // Convert merged data to a string and encrypt it
      const encryptValuesString = JSON.stringify(mergedData);
      const encryptValues = encryptData(
        encryptValuesString,
        encryptionKey,
        encryptionKeyIV
      );
      // Store the encrypted data back in localStorage
      localStorage.setItem("data", encryptValues);

      // Redirect to the next form
      router.replace("/form/education-career");
    }
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

  // Updated formFields array
  const formFields: {
    name: FormFieldNames;
    label: string;
    type: string;
    options?: string[] | number[];
    placeholder?: string;
  }[] = [
    {
      type: "select",
      name: "ledeyoSet",
      label: "Which LEDEYO Set do you belong to",
      options: ["Set 1", "Set 2", "Set 3", "Set 4", "Set 5"],
    },
    {
      type: "select",
      options: [1, 2],
      name: "contactsAttended",
      label: "How many LEDEYO contacts did you attend?",
      placeholder: "Enter number of Contacts Attended",
    },
    {
      type: "select",
      name: "commissioning",
      options: ["Yes", "No"],
      label: "Did you attend the Commissioning?",
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
        "Politics & Governance",
        "Construction & Engineering",
      ],
    },
    {
      type: "select",
      name: "nationality",
      label: "Nationality",
      options: countries.map((country: Country) => country.name),
    },
    {
      name: "country",
      type: "select",
      label: "Country of Residence",
      placeholder: "Enter your Country",
      options: countries.map((country: Country) => country.name),
    },

    // Conditionally render the state field if states are available
    ...(states.length > 0
      ? [
          {
            name: "state" as FormFieldNames,
            label: "State/Province of Residence",
            type: "select",
            options: states.map((state: State) => state.name),
          },
        ]
      : []),
    {
      name: "city",
      type: "text",
      label: "City/Town of Residence",
      placeholder: "Enter your city",
    },
  ];

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
                            onChange={
                              field.name === "country"
                                ? handleCountryChange // Only handle country change
                                : formField.onChange
                            }
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
