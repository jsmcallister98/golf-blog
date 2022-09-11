import React, { FC, useEffect, useState } from "react";
import { TGlobalThemeObject } from "types";

export interface NavBarProps extends React.HTMLProps<HTMLElement> {}

const NavBar: FC<NavBarProps> = () => {
  const [colorTheme, setColorTheme] =
    useState<TGlobalThemeObject["theme"]>(undefined);

  const handleThemeToggle = (theme: TGlobalThemeObject["theme"]) => {
    setColorTheme(theme);
  };

  const storeUserSetPreference = (pref: TGlobalThemeObject["theme"]) => {
    localStorage.setItem("theme", pref!);
  };

  useEffect(() => {
    const root = document.documentElement;

    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );

    setColorTheme(initialColorValue as TGlobalThemeObject["theme"]);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (colorTheme !== undefined) {
      if (colorTheme === "light") {
        root.removeAttribute("data-theme");
        storeUserSetPreference("light");
      } else {
        root.setAttribute("data-theme", colorTheme);
        storeUserSetPreference(colorTheme);
      }
    }
  }, [colorTheme]);

  return (
    <div>
      {colorTheme !== undefined && (
        <select
          onChange={(e) =>
            handleThemeToggle(e.target.value as TGlobalThemeObject["theme"])
          }
          name="colorTheme"
          id="colorTheme"
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
          <option value="golf">golf</option>
          <option value="christmas">christmas</option>
          <option value="christmas">christmas</option>
        </select>
      )}
    </div>
  );
};

export default NavBar;
