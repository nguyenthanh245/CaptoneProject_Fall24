import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import chatWidget from "../assets/images/chatbot-widget.svg";

type TChatbox = {
  isUser: boolean;
  chatContent: string;
};

export default function () {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [listMessage, setListMessage] = useState<TChatbox[]>([]);
  const [messageContent, setMessageContent] = useState<string>("");

  const messages = [
    "Welcome to LynxGuard - SOC Manager",
    "I'm AI assistant, how can i help you",
    "I support your problem",
  ]; // Các thông điệp luân phiên

  useEffect(() => {
    const typingSpeed = 80; // Tốc độ gõ nhanh hơn
    const deletingSpeed = 110; // Tốc độ xóa nhanh hơn
    const pauseTime = 1500; // Tạm dừng trước khi xóa

    const handleTyping = setInterval(
      () => {
        const currentMessage = messages[index];

        if (!deleting) {
          // Hiệu ứng gõ chữ
          setText((prev) => currentMessage.substring(0, prev.length + 1));
          if (text === currentMessage) {
            setDeleting(true); // Bắt đầu xóa chữ
            clearInterval(handleTyping); // Tạm dừng trước khi xóa
            setTimeout(() => setDeleting(true), pauseTime);
          }
        } else {
          // Hiệu ứng xóa chữ
          setText((prev) => currentMessage.substring(0, prev.length - 1));
          if (text === "") {
            setDeleting(false); // Chuyển sang gõ chữ mới
            setIndex((prev) => (prev + 1) % messages.length); // Đổi thông điệp
          }
        }
      },
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearInterval(handleTyping);
  }, [text, deleting, index, messages]);

  return (
    <div className="fixed bottom-5 right-5 flex items-center space-x-2">
      {!isOpen && (
        <div className="bg-gray-100 text-gray-700 font-semibold px-3 py-2 rounded-lg shadow-md text-sm">
          {text}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <img src={chatWidget} alt="Chat Widget" />
      </button>

      <div
        className={`transition-transform transform ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } origin-bottom-right absolute bottom-16 right-0 shadow-lg rounded-lg z-50`}
      >
        {isOpen && (
          <ChatWindow
            onClose={() => setIsOpen(false)}
            listMessage={listMessage}
            setListMessage={setListMessage}
            messageContent={messageContent}
            setMessageContent={setMessageContent}
          />
        )}
      </div>
    </div>
  );
}
