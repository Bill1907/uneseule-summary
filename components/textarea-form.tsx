"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface TextareaFormProps {
    onSubmit: (data: string) => void
    isLoading: boolean
}

const schema = z.object({
    contents: z.string(),
})
  
export default function TextareaForm({onSubmit, isLoading}: TextareaFormProps) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema)
    })

    const handleSubmit = (data: z.infer<typeof schema>) => {
      onSubmit(data.contents);
    }

    
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>contents</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the contents"
                    className="w-[900px] min-h-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
          {isLoading ? '요약 중...' : '요약하기'}
        </Button>
        </form>
      </Form>
    )
}