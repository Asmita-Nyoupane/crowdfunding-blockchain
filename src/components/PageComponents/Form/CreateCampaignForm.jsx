"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { campaignSchema } from "./validation";
import { formfield } from "./formfield";
import CustomForm from "./CustomForm";

const FormValue = {
  title: "",
  description: "",
  amount: "",
  deadline: "",
};

const CreateCampaignForm = ({ createCampaign }) => {
  const form = useForm({
    resolver: zodResolver(campaignSchema),
    defaultValues: FormValue,
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit = (data) => {
    createCampaign(data);
    reset();
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-white p-6 rounded-xl shadow-md">
      <h2 className="header">Add New Campaign</h2>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-4"
        >
          {formfield.map((field) => (
            <CustomForm key={field.name} data={field} control={control} />
          ))}
          <Button type="submit" size="lg" className="shadBtn w-fit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateCampaignForm;
