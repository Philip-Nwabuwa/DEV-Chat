"use client";

import axios from "axios";
import { FC, SetStateAction, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import Button from "./ui/Button";
import { Mic, Paperclip, Send, SmilePlus } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState(false);

  const addEmoji = (e: { unified: string }) => {
    const sym = e.unified.split("_");
    const codeArray: number[] = [];
    sym.forEach((el) => codeArray.push(parseInt(`0x${el}`, 16)));
    let emoji = String.fromCodePoint(...codeArray);
    setInput(input + emoji);
  };

  const sendMessage = async () => {
    if (!input) return;
    setIsLoading(true);

    try {
      await axios.post("/api/message/send", { text: input, chatId });
      setInput("");
      textareaRef.current?.focus();
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-2 mx-4 flex justify-center rounded-lg shadow-sm overflow-hidden ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 items-center border-t border-gray-200 p-[6px] sm:mb-0">
        <Paperclip className="ml-2" />
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className="w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-sm sm:leading-6"
        />
        <SmilePlus
          className="mr-8 cursor-pointer"
          onClick={() => setShowEmoji(!showEmoji)}
        />
        {showEmoji && (
          <div className="absolute top-[230px] right-[130px]">
            <Picker
              data={data}
              emojiSize={20}
              emojiButtonSize={28}
              onEmojiSelect={addEmoji}
              maxFrequentRows={0}
            />
          </div>
        )}
        <Button isLoading={isLoading} onClick={sendMessage} type="submit">
          <Send />
        </Button>
      </div>
    </>
  );
};

export default ChatInput;
