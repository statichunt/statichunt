import Base from "@/layouts/Baseof";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { useChat } from "@ai-sdk/react";
import React from "react";

export default function Ai() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();

  console.log(messages);

  return (
    <Base>
      <MobileSidebar />
      <section className="section">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3 mx-auto">
              <div className="bg-theme-light rounded-lg shadow-lg overflow-hidden h-[calc(100vh-200px)] flex flex-col">
                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start ${
                        message.role === "user" ? "justify-end" : ""
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 flex items-center justify-center text-light">
                          AI
                        </div>
                      )}
                      <div
                        className={`${
                          message.role === "user"
                            ? "mr-4 bg-gradient-to-r from-primary to-secondary text-white"
                            : "ml-4 bg-theme-light dark:bg-darkmode-theme-light"
                        } rounded-lg p-4 max-w-[80%]`}
                      >
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <React.Fragment key={`${message.id}-${i}`}>
                                  {part.text}
                                </React.Fragment>
                              );
                            case "tool-invocation":
                              return (
                                <React.Fragment>
                                  {part.toolInvocation.result}
                                </React.Fragment>
                              );
                          }
                        })}
                      </div>
                      {message.role === "user" && (
                        <div className="w-10 h-10 rounded-full bg-theme-light dark:bg-darkmode-theme-light flex-shrink-0 flex items-center justify-center text-dark dark:text-darkmode-dark">
                          You
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4 bg-theme-light">
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-4"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-primary dark:bg-darkmode-theme-light dark:text-darkmode-dark dark:border-darkmode-border"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary px-6 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                      disabled={status === "streaming"}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Base>
  );
}
