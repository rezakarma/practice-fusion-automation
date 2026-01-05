"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useTransition } from "react";
import { Spinner } from "../ui/spinner";
const HumanValidationForm = () => {
  const form = useForm<z.infer<typeof userValidationSchema>>({
    resolver: zodResolver(userValidationSchema),
    defaultValues: {
      assessment: "",
      chiefComplaint: "",
      healthConcerns: "",
      medications: true,
      objective: "",
      plan: "",
      sharedViaPHR: "",
      subjective: "",
    },
  });

  const [isLoading, startTransition] = useTransition();

  async function onSubmit(data: z.infer<typeof userValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    startTransition(async () => {
      const response = await fetch("/api/automate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Data sent and external form filled!");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="chiefComplaint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chief Complaint</FormLabel>
                <FormControl>
                  <Input placeholder="chiefComplaint" {...field} />
                </FormControl>
                <FormDescription>This is chief complaint.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="healthConcerns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Health concerns</FormLabel>
                <FormControl>
                  <Textarea placeholder="healthConcerns" {...field} />
                </FormControl>
                <FormDescription>This is health concerns.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="subjective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subjective</FormLabel>
                <FormControl>
                  <Textarea placeholder="Subjective" {...field} />
                </FormControl>
                <FormDescription>This is subjective.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objective</FormLabel>
                <FormControl>
                  <Textarea placeholder="objective" {...field} />
                </FormControl>
                <FormDescription>This is objective.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="assessment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assessment</FormLabel>
                <FormControl>
                  <Textarea placeholder="assessment" {...field} />
                </FormControl>
                <FormDescription>This is assessment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="plan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <FormControl>
                  <Textarea placeholder="plan" {...field} />
                </FormControl>
                <FormDescription>This is plan.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isLoading}
            control={form.control}
            name="sharedViaPHR"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shared with your patient via the PHR</FormLabel>
                <FormControl>
                  <Textarea placeholder="sharedViaPHR" {...field} />
                </FormControl>
                <FormDescription>
                  This is the shared with your patient via the PHR.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="medications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medications</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ? "1" : "0"}
                    onValueChange={(value) => {
                      console.log(value, " value");
                      field.onChange(value === "1" ? true : false);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select medications" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Medications</SelectLabel>

                        <SelectItem value={"1"}>yes</SelectItem>
                        <SelectItem value={"0"}>no</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  This is the shared with your patient via the PHR.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-3">
          <Button type="submit" variant={"default"} disabled={isLoading}>
            {isLoading ? <Spinner /> : null}
            Submit
          </Button>
          <Button
            disabled={isLoading}
            type="button"
            className="border-2 border-primary"
            variant={"outline"}
          >
            Regenerate
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HumanValidationForm;
