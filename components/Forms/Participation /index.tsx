"use client";
import { z } from "zod";
import React, { useState, useLayoutEffect, useEffect } from "react";
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
  state: z.string().optional(),
  country: z.string().min(1, { message: "required." }),
  city: z.string().min(1, { message: "required." }),
  contactsAttended: z.string().min(1, { message: "required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Participation() {
  const router = useRouter();

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);

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
  // Load countries and initial form data from storage
  useLayoutEffect(() => {
    const storedCountriesString = sessionStorage.getItem("countries");
    if (storedCountriesString) {
      try {
        const parsedCountries = JSON.parse(storedCountriesString);
        setCountries(parsedCountries);
      } catch (error) {
        console.error("Error parsing countries:", error);
      }
    } else {
      console.warn("No countries found in sessionStorage.");
    }
  }, []);

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
          console.log("decryptedData", decryptedData);
          form.reset(decryptedData); // Set the decrypted data as form's initial values
        } catch (error) {
          console.error("Error decrypting data:", error);
        }
      }
    }
  }, []);

  // Handle country selection and update state options
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find(
      (country) => country.name === event.target.value
    );
    setStates(selectedCountry?.states || []);
    form.setValue("country", event.target.value);
  };

  // Handle form submission
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
      router.push("/form/education-career");
    }
  };

  // Define form fields
  const formFields: {
    name: keyof FormValues;
    label: string;
    type: string;
    options?: string[] | number[];
    placeholder?: string;
  }[] = [
    {
      type: "select",
      name: "ledeyoSet",
      label: "Which LEDEYO Set do you belong to",
      options: ["Set 1", "Set 2", "Set 3", "Set 4"],
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
        "Legal Practioners",
        "Medical/Health",
        "Academic Research",
        "Teachers",
        "Fine and Applied Art",
        "Public Servants ",
        "Politics and Governance",
        "Estate Development and Management ",
        "Money and Kingdom Investment ",
        "Entrepreneurship",
        "Agro Allied practioners",
      ],
    },
    {
      type: "select",
      name: "nationality",
      label: "Nationality",
      options: countries.map((country) => country.name),
    },
    {
      name: "country",
      type: "select",
      label: "Country of Residence",
      placeholder: "Enter your Country",
      options: countries.map((country) => country.name),
    },
    ...(states.length > 0
      ? [
          {
            name: "state" as keyof FormValues,
            label: "State/Province of Residence",
            type: "select",
            options: states.map((state) => state.name),
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

  const handlePrevious = async () => {
    router.push("/form/bio");
  };
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
                                ? handleCountryChange
                                : formField.onChange
                            }
                            className="border w-full rounded-md py-2 text-xs md:text-sm"
                          >
                            <option value="">Select</option>
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
