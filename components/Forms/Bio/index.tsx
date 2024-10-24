"use client";
import React from "react";
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

  const handleSubmit = async (values: FormValues) => {
    localStorage.setItem("data", JSON.stringify(values));
    router.replace("/form/participation");

    // try {
    //   const response = await fetch("/api/submit", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   if (response.ok) {
    //     alert("Form submitted successfully!");
    //     console.log(response);
    //     router.replace("/form/participation");
    //   } else {
    //     alert("Form submission failed.");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert("An error occurred");
    // }
  };
  // Define an array of form fields
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
          <div className="float-right my-3 border">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
