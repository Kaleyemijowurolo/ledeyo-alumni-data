"use client";
import React, { useEffect, useState } from "react";
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
// import { Input, TextArea } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  decryptData,
  encryptData,
  encryptionKey,
  encryptionKeyIV,
} from "@/lib";

const formSchema = z.object({
  expectations: z.string(),
  suggestions: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Feedback() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expectations: "",
      suggestions: "",
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
          console.log("decryptedData", decryptedData);
          form.reset(decryptedData); // Set the decrypted data as form's initial values
        } catch (error) {
          console.error("Error decrypting data:", error);
        }
      }
    }
  }, []);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Retrieve data from local storage
      const localStorageData = localStorage.getItem("data"); // Replace "yourKey" with the actual key

      // Decrypt the existing data
      if (!localStorageData) return;
      const decrypt = decryptData(
        localStorageData,
        encryptionKey,
        encryptionKeyIV
      );

      const formData = decrypt ? JSON.parse(decrypt) : {};

      // Merge local storage data with form values
      const combinedValues = { ...values, ...formData };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(combinedValues),
      });

      if (response.ok) {
        const responseData = await response.json(); // Extract response data
        toast.success(responseData.message || "Form submitted successfully!"); // Use the message from the response

        // // Set the flag in cookies for the middleware to track
        // document.cookie = "visitedThankYouPage=true; path=/";

        // toast.success("Form submitted successfully!");
        console.log(response);
        router.push("/form/thankyou");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        const errorData = await response.json(); // Extract error data
        toast.error(errorData.message || "Form submission failed."); // Use the error message from the response
        console.log(response);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error, "error");
    }
  };

  // Define an array of form fields
  const formFields: {
    name: "expectations" | "suggestions";

    label: string;
    placeholder?: string;
    type?: string;
    options?: string[];
  }[] = [
    {
      name: "expectations",
      label: "What are your expectations from the LEDEYO Alumni Family?",
      placeholder: "We love to hear from you",
      type: "text",
    },
    {
      name: "suggestions",
      label:
        "Any suggestions to improve the LEDEYO Alumni Family's inclusivity and engagement?",
      type: "text",
      placeholder: "We're open to your opinions",
    },
  ];

  const handlePrevious = async () => {
    const existingData = localStorage.getItem("data");

    if (existingData) {
      const decrypt = await decryptData(
        existingData,
        encryptionKey,
        encryptionKeyIV
      );
      const updatedData = decrypt ? JSON.parse(decrypt) : {};
      const mergedData = { ...updatedData, ...form.getValues() };

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
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="">
          <div className="grid grid-cols-1 gap-3 items-start">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                control={form.control}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel className="text-base">{field.label}</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full border text-sm placeholder:text-sm h-28 p-2 rounded-lg"
                        placeholder={field.placeholder}
                        {...formField}
                        // type={field.type || "text"}
                      />
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
              disabled={isLoading}
              type="button"
            >
              Previous
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Submiting..." : "Finish"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
