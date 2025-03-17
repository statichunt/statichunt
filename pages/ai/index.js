import Base from "@/layouts/Baseof";
import MobileSidebar from "@/layouts/partials/MobileSidebar";
import { useChat } from "@ai-sdk/react";
import React from "react";

export default function Ai() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();

  const themeMessages = messages.find(
    (m) =>
      m.role === "assistant" &&
      m.parts.some((p) => p.type === "text" && p.text.startsWith("{")),
  );

  let themes = [];
  if (themeMessages) {
    try {
      const jsonPart = themeMessages.parts.find((p) => p.type === "text").text;
      themes = JSON.parse(jsonPart).themes || [];
    } catch (error) {
      console.error("Failed to parse theme response", error);
    }
  }

  console.log(themes);

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

                {/* Theme Cards */}
                {themes.length > 0 && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {themes.map((theme) => (
                      <div
                        key={theme.slug}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                      >
                        <img
                          src={`/${theme.img}`}
                          alt={theme.slug}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">
                            {theme.slug.replace(/-/g, " ")}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
