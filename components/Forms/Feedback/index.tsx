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
  expectations: z.string(),
  suggestions: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Feedback() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expectations: "",
      suggestions: "",
    },
  });

  // const onSubmit = () => {
  //   router.push("/form/thankyou");
  // };

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        console.log(response);
        router.push("/form/thankyou");
      } else {
        alert("Form submission failed.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
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
    },
  ];

  // ... existing code ...

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
                    <FormLabel className="text-sm">{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={field.placeholder}
                        {...formField}
                        type={field.type || "text"}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="float-right my-3 border">
            <Button type="submit">Finish</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
