import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function useTheme() {
    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error("useContext must be used within the scope of a contextProvider")
    }


    return context
}
