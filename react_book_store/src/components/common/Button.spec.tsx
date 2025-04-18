import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe('Button Component Test', () => {
  it("Render Check", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">Button</Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByText("Button")).toBeInTheDocument();
  })

  it("Prop Check", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">Button</Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({
      fontSize: '1.5rem',
      color: 'white',
      backgroundColor: 'midnightblue',
      borderRadius: '4px'
    })
  })
})
