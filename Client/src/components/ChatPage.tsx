import * as React from "react";

interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

interface iMessage {
  role: "assistant" | "user";
  content?: string;
  docs?: Doc[];
}

const ChatPage: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<iMessage[]>([]);

  const handleSendchatMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");

    try {
      const res = await fetch(`http://localhost:3000/chat?message=${message}`);
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.message,
          docs: data.docs,
        },
      ]);
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-800 text-slate-200 overflow-hidden">
     x``
      <div className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            <p>Start a conversation about your uploaded PDF...</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap break-words leading-relaxed">
                  {msg.content}
                </p>

                {/* Docs section for assistant */}
                {msg.role === "assistant" && msg.docs && msg.docs.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-slate-400 font-medium">
                      📚 Sources ({msg.docs.length})
                    </div>
                    {msg.docs.slice(0, 3).map((doc, i) => (
                      <div
                        key={i}
                        className="bg-slate-900 text-sm text-slate-300 p-3 rounded-lg border-l-2 border-blue-500"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {doc.metadata?.loc?.pageNumber && (
                            <span className="bg-slate-800 px-2 py-1 rounded text-xs font-medium">
                              Page {doc.metadata.loc.pageNumber}
                            </span>
                          )}
                        </div>
                        {doc.pageContent && (
                          <p className="text-slate-200 text-sm leading-relaxed">
                            {doc.pageContent.length > 200
                              ? doc.pageContent.slice(0, 200) + "..."
                              : doc.pageContent}
                          </p>
                        )}
                        {doc.metadata?.source && (
                          <p className="text-xs text-slate-500 mt-2 truncate">
                            {doc.metadata.source}
                          </p>
                        )}
                      </div>
                    ))}
                    {msg.docs.length > 3 && (
                      <div className="text-xs text-slate-500 text-center">
                        +{msg.docs.length - 3} more sources...
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input box */}
      <div className="flex-shrink-0 p-4 border-t border-slate-700 bg-slate-800">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question about your PDF..."
              className="w-full px-4 py-3 rounded-xl bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32 overflow-y-auto scrollbar-hide"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendchatMessage();
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
              }}
            />
          </div>
          <button
            disabled={!message.trim()}
            onClick={handleSendchatMessage}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>

      <style >{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ChatPage;