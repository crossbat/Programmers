import { useContext } from "react"
import { ThemeContext } from "../../context/themeContext"
import { ThemeName } from "../../style/styled"

export default function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>{themeName}</button>
  )
}
