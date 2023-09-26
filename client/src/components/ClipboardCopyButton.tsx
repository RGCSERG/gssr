import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import useMedia from "../hooks/useMedia";

const ClipboardCopyButton = () => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const isMobile = useMedia("(max-width: 768px");

  const handleButtonClick = () => {
    setButtonClicked(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setButtonClicked(false);
    }, 2000);
  };

  return (
    <button onClick={() => handleButtonClick()} className="text-2xl">
      {buttonClicked === true ? (
        <p className="text-black font-semibold">Copied room link!</p>
      ) : (
        <FaRegCopy size={isMobile ? "40" : "60"} />
      )}
    </button>
  );
};

export default ClipboardCopyButton;
