import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <code className="cursor-pointer" onClick={handleCopyClick}>
      {text}
      <span className="ml-0.5">{copied ? <FaCheck /> : <FaRegCopy />}</span>
    </code>
  );
};

export default CopyButton;
