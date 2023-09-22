import { useState } from "react";

const ClipboardCopyButton = () => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

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
        <p className="text-black font-semibold">Copied link!</p>
      ) : (
        <p className=" text-blue-500 underline">Copy room link</p>
      )}
    </button>
  );
};

export default ClipboardCopyButton;
