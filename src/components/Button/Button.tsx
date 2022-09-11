import React, { FC } from "react";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const Button: FC<ButtonProps> = () => {
  return (
    <button
      style={{
        padding: "10px 20px",
        background: "red",
        color: "white",
      }}
    >
      Submit
    </button>
  );
};

export default Button;
