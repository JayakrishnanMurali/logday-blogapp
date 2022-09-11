import React from "react";

interface Props {
  type?: "DEFAULT" | "PRIMARY" | "SECONDARY" | "LINK" | "MENU";
  text: string;
  bold?: boolean;
  logo?: boolean;
}

const Typo: React.FC<Props> = ({
  type = "DEFAULT",
  text,
  bold = false,
  logo = false,
}) => {
  let typo;

  if (type == "DEFAULT") {
    typo = <h1>{text}</h1>;
  }

  if (type == "LINK") {
    typo = (
      <a
        className={`cursor-pointer font-playfair ${
          logo && "text-[#5C7F67] text-2xl"
        }`}
      >
        {text}
      </a>
    );
  }

  if (type == "MENU") {
    typo = (
      <a className="cursor-pointer font-roboto p-4 hover:underline underline-offset-8 decoration-[#5C7F67] hover:text-[#5C7F67] hover:transition-all hover:duration-300 hover:ease-in-out hover:delay-150 ">
        {text}
      </a>
    );
  }

  return <div className={`${bold && "font-bold"}`}>{typo}</div>;
};

export default Typo;
