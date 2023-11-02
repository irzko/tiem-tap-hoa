"use client";
import { initDescription } from "@/lib/actions";
import { pusherClient } from "@/lib/pusher";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DescriptionGenerator({
  getInput,
  setOutput,
}: {
  getInput: () => string;
  setOutput: (output: string) => void;
}) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  useEffect(() => {
    if (!id) return;
    pusherClient.subscribe("new-product");
    pusherClient.bind("workflowRun.completed", (data: any) => {
      console.log(data);

      setIsProcessing(false);
      setOutput(data.output.output);
    });
    return () => {
      pusherClient.unsubscribe("new-product");
      pusherClient.unbind("workflowRun.completed");
    };
  }, [id, setOutput]);

  const handlePress = () => {
    setIsProcessing(true);
    initDescription(getInput()).then((id) => {
      setId(id);
      console.log(id);
    });
  };

  return (
    <>
      <Button
        onPress={() => handlePress()}
        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        isLoading={isProcessing}
      >
        Tự động tạo mô tả
      </Button>
    </>
  );
}
