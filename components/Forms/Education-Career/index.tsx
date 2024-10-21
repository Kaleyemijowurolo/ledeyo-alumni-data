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
  education: z.string(),
  discipline: z.string(),
  occupation: z.string(),
  crossCareerPath: z.string(),
  callMinistry: z.string(),
  ministryCalling: z.string(),
});

export default function EducationCareer() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const router = useRouter();

  const [showOtherInput, setShowOtherInput] = React.useState(false);
  const [ministryCalling, setMinistryCalling] = React.useState(false);
  const [crossCareerPath, setCrossCareerPath] = React.useState(false);

  const handleEducationChange = (value: string, field: string) => {
    if (field === "education") {
      setShowOtherInput(value === "Other (Please specify)" ? true : false);
    } else if (field === "callMinistry") {
      setMinistryCalling(value === "Yes" ? true : false);
    } else if (field === "") {
      setCrossCareerPath(value === "Yes" ? true : false);
    } else {
      return;
    }
  };

  const onSubmit = () => {
    router.push("/form/feedback");
  };

  // Define an array of form fields
  const formFields = [
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
      label: "Discipline  (Course of study you graduated with)",
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

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
                            <option value="">Select </option>
                            {field?.options?.map((option) => (
                              <option key={option} value={option} className="">
                                {option}
                              </option>
                            ))}
                          </select>
                          {field.name === "education" && showOtherInput && (
                            <div className="mt-2">
                              <Input
                                placeholder="Please specify"
                                {...form.register(
                                  `Other (Please specify)` as never
                                )}
                                type="text"
                              />
                            </div>
                          )}
                          {field.name === "ministryCalling" &&
                            ministryCalling && (
                              <div className="mt-2">
                                <Input
                                  placeholder="please mention the calling"
                                  {...form.register(`ministryCalling` as never)}
                                  type="text"
                                />
                              </div>
                            )}
                          {field.name === "crossCareerPath" &&
                            crossCareerPath && (
                              <div className="mt-2">
                                <Input
                                  placeholder="please mention the career path"
                                  {...form.register(`crossCareerPath` as never)}
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
          <div className="float-right my-3 border">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
