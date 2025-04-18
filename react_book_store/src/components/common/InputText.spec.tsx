import { render, screen } from "@testing-library/react";
import { InputText } from "./InputText";
import { BookStoreThemeProvider } from "../../context/themeContext";
import React from "react";

describe("Input Component Test", () => {
  it("Render Check", () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="Type Here" />
      </BookStoreThemeProvider>
    );
    expect(screen.getByPlaceholderText("Type Here")).toBeInTheDocument();
  })

  it("ForwardRef Test", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="Type Here" ref={ref} />
      </BookStoreThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
