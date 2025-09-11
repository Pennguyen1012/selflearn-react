import { useEffect, useState } from "react";

function RandomColor() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  function randomColorUltility(length) {
    return Math.floor(Math.random() * length);
  }

  function handleCreateRandomHEXColor() {
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUltility(hex.length)];
    }

    setColor(hexColor);
  }

  function handleCreateRandomRGBColor() {
    const r = randomColorUltility(256);
    const g = randomColorUltility(256);
    const b = randomColorUltility(256);

    const rgb = `rgb(${r}, ${g}, ${b})`;

    setColor(rgb);
  }

  useEffect(() => {
    typeOfColor === "hex"
      ? handleCreateRandomHEXColor()
      : handleCreateRandomRGBColor();
  }, [typeOfColor]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
      }}
    >
      <button onClick={() => setTypeOfColor("hex")}>Create HEX color</button>
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB color</button>
      <button
        onClick={
          typeOfColor === "hex"
            ? () => handleCreateRandomHEXColor()
            : () => handleCreateRandomRGBColor()
        }
      >
        Generate Random Color
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "50px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>{typeOfColor === "hex" ? "HEX Color" : "RGB Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}

export default RandomColor;
