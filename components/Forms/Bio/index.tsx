"use client";
import React, { useEffect } from "react";
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
  firstName: z.string().min(2, { message: "required" }),
  middleName: z.string().optional(),
  surname: z.string().min(2, { message: "required" }),
  gender: z.string().min(2, { message: "required" }),
  phone: z.string().min(11, {
    message: "phone must be at least 11 digits.",
  }),
  email: z.string().email(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Bio() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      surname: "",
      gender: "",
      phone: "",
      email: "",
    },
  });

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
      const encryptValues = encryptData(
        encryptValuesString,
        encryptionKey,
        encryptionKeyIV
      );
      localStorage.setItem("data", encryptValues);
      router.push("/form/participation");
    } else {
      const encryptValuesString = JSON.stringify(values);
      const encryptValues = encryptData(
        encryptValuesString,
        encryptionKey,
        encryptionKeyIV
      );
      localStorage.setItem("data", encryptValues);
      router.push("/form/participation");
    }
  };

  const formFields: {
    name: "firstName" | "middleName" | "surname" | "gender" | "phone" | "email";
    label: string;
    placeholder: string;
    type?: string;
    options?: string[];
  }[] = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
    },
    {
      name: "middleName",
      label: "Middle Name",
      placeholder: "Enter your middle name",
    },
    { name: "surname", label: "Surname", placeholder: "Enter your surname" },
    {
      name: "phone",
      label: "Phone Number (WhatsApp preferred)",
      placeholder: "Enter your phone number",
    },
    {
      name: "gender",
      label: "Gender",
      placeholder: "Select your gender",
      type: "select",
      options: ["Male", "Female"],
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
    },
  ];

  const handlePrevious = async () => {
    router.push("/");
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
          <div className="float-right my-3 flex gap-x-4 mt-6">
            <Button
              onClick={handlePrevious}
              className="bg-transparent border text-black hover:bg-transparent hover:opacity-70"
              type="button"
            >
              Back
            </Button>
            <Button type="submit">{"Next"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
