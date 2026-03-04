import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AskGpt from "../services/chatbot-api";
import { OpenAIOutlined } from "@ant-design/icons";

type TProps = {
  onClose: () => void;
  listMessage: TChatbox[];
  setListMessage: React.Dispatch<React.SetStateAction<TChatbox[]>>;
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
};

type TChatbox = {
  isUser: boolean;
  chatContent: string;
};

export default function ChatWindow({
  onClose,
  listMessage,
  setListMessage,
  messageContent,
  setMessageContent,
}: TProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const suggestions = [
    "Bạn muốn biết thêm về dự án của chúng mình không?",
    "Bạn có muốn tìm hiểu về dự án của chúng mình không?",
    "Cách liên hệ với cửa hàng?",
  ];

  const handleUserSendMessage = async () => {
    if (listMessage) {
      setListMessage((prev) => [
        ...prev,
        { isUser: true, chatContent: messageContent },
      ]);
      setMessageContent("");
      try {
        setIsLoading(true);
        const response = await AskGpt({ question: messageContent });
        if (response) {
          setListMessage((prev) => [
            ...prev,
            { isUser: false, chatContent: response.data.answer },
          ]);
        }
      } catch (error) {
        setMessageContent("");
        toast.error("Fail send message to chat bot");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [listMessage]);

  return (
    <div className="bg-white w-80 h-96 rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-bold">
          AI Assistant{" "}
          <span>
            <OpenAIOutlined />
          </span>
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          ✖
        </button>
      </div>

      {listMessage.length == 0 && (
        <>
          {/* Suggestions */}
          <div className="mt-2 mb-4">
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessageContent(suggestion)}
                  className="block w-full text-left p-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto my-4">
        {listMessage &&
          listMessage.map((item) => (
            <div
              className={`mb-2 flex ${
                !item.isUser ? "items-start" : "items-end justify-end"
              }`}
            >
              <div
                className={`p-2 rounded-lg max-w-xs ${
                  !item.isUser
                    ? "text-gray-700 bg-gray-100"
                    : "text-white bg-blue-500"
                }`}
              >
                {item.chatContent}
              </div>
            </div>
          ))}

        {/* Loading message */}
        {isLoading && (
          <div className="mb-2 flex items-start">
            <div className="p-2 rounded-lg max-w-xs text-gray-700 bg-gray-100 flex items-center space-x-1">
              <span className="flex space-x-1">
                <span className="animate-bounce font-extrabold">.</span>
                <span className="animate-bounce delay-200 font-extrabold">
                  .
                </span>
                <span className="animate-bounce delay-400 font-extrabold">
                  .
                </span>
              </span>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      <div className="flex items-center">
        <input
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && messageContent) {
              handleUserSendMessage();
            }
          }}
          type="text"
          placeholder="Type your message..."
          className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <button
          className={`ml-2 p-2 rounded-lg transition ${
            messageContent
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-slate-300 text-white"
          }`}
          disabled={!messageContent}
          onClick={handleUserSendMessage}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
