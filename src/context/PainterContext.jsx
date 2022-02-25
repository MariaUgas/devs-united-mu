import React, { useState, createContext } from "react";
// definimos los colores
export const colors = [
  { name: "rojo", hex: "#F50D5A" },
  { name: "naranja", hex: "#FF865C" },
  { name: "amarillo", hex: "#FFEA5C" },
  { name: "verde", hex: "#00DA76" },
  { name: "azul", hex: "#0096CE" },
  { name: "purpura", hex: "#800FFF" },
];

export const PainterContext = createContext();

export const PainterProvider = (props) => {
  const [color, setColor] = useState(colors[0]);

  return (
    <PainterContext.Provider value={{ color, setColor }}>
      {props.children}
    </PainterContext.Provider>
  );
};
