import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");

  let val = "";
  useEffect(() => {
    console.log(val);
  }, val);

  function handleGenerateQrCode() {
    setQrCode(input);
    setInput("");
  }

  return (
    <div>
      <h1>QR Code Generator</h1>
      <div>
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          name="qr-code"
          size={20}
          value={input}
          placeholder="Enter your input here..."
        />
        <button
          disabled={input && input.trim() !== "" ? false : true}
          onClick={handleGenerateQrCode}
        >
          Generate
        </button>
      </div>
      <div>
        <QRCode
          id="qr-code-value"
          value={qrCode}
          size={400}
          bgColor="#fff"
        ></QRCode>
      </div>
    </div>
  );
}
