'use client';
import { useState } from "react";

import TextareaForm from "@/components/textarea-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export default async function Index() {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(contents: string) {
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: contents}),
      })

      if (!response.ok) {
        throw new Error('요약 중 오류가 발생했습니다.');
      }
      
      const { summary } = await response.json();
      setSummary(summary);
    } catch (error) {
      console.error('Error:', error);
      setSummary("요약을 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
}
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center justify-center">
      <Tabs defaultValue="script" className="w-[1000px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="script">Script</TabsTrigger>
          <TabsTrigger disabled value="video">Video</TabsTrigger>
        </TabsList>
        <TabsContent value="script">
          <Card>
            <CardHeader>
              <CardTitle>Script</CardTitle>
              <CardDescription>
                스크립트를 제공하면 내용을 요약해 드립니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <TextareaForm onSubmit={onSubmit} isLoading={isLoading}/>
              {summary && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">요약 결과:</h3>
                  <p className="p-4 bg-gray-100 rounded-md">{summary}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video</CardTitle>
              <CardDescription>
                We are going to create a video from the script you provide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="new">New video</Label>
                <Input id="new" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Summary</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
