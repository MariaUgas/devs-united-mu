import React, { useContext } from "react";
import { colors, PainterContext } from "../context/PainterContext";

function ColorPicker() {
  /** TODO mejorar visualizacion de color que queda seleccionado */
  const { setColor } = useContext(PainterContext);
  const colorOption = (color) => {
    return (
      <div
        key={color.name}
        className="config-color"
        style={{ backgroundColor: color.hex }}
        onClick={() => setColor(color.name)}
      />
    );
  };

  const colorOptions = () => {
    return colors.map((color) => {
      return colorOption(color);
    });
  };

  return <div className="flex-row-around">{colorOptions()}</div>;
}

export default ColorPicker;
