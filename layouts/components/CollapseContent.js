import { markdownify } from "@/lib/utils/textConverter";
import { useState } from "react";

const CollapseContent = ({ content, contentLimit = 30, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedContent =
    content.split(" ").slice(0, contentLimit).join(" ") + " ";
  const isTruncated = content.split(" ").length > contentLimit;

  return (
    <div className={className}>
      {isExpanded ? (
        <>
          {markdownify(content, "p", "inline")}
          {isTruncated && (
            <button
              onClick={toggleExpanded}
              className="inline text-primary underline"
            >
              Read Less
            </button>
          )}
        </>
      ) : (
        <>
          {markdownify(truncatedContent, "p", "inline")}
          {isTruncated && (
            <button
              onClick={toggleExpanded}
              className="inline text-primary underline"
            >
              Read More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CollapseContent;
