"use client";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "react-datepicker";
import { FaRegCalendarDays } from "react-icons/fa6";
import { Input } from "@/components/ui/input";

const CustomForm = ({ data, control }) => {
  return (
    <div>
      {data.type === "textarea" ? (
        <FormField
          control={control}
          name={data.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{data.label}</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={data.placeholder}
                  {...field}
                  className="outline-blue-300 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : data.type === "date" ? (
        <div>
          <FormField
            control={control}
            name={data.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{data.label}</FormLabel>
                <div className="flex  gap-4 border rounded-lg w-full py-1 px-2">
                  <div className="text-xl font-semibold text-blue-500">
                    <FaRegCalendarDays />
                  </div>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      className=" "
                      placeholderText={data.placeholder}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <FormField
          control={control}
          name={data.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{data.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={data.placeholder}
                  {...field}
                  className="outline-blue-300 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default CustomForm;
