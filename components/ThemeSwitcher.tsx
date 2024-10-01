"use client";

import { Button } from "@nextui-org/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "dark" ? (
        <Button onClick={() => setTheme("light")}>
          <MdOutlineLightMode />
        </Button>
      ) : (
        <Button onClick={() => setTheme("dark")}>
          <MdDarkMode />
        </Button>
      )}
    </div>
  );
}
