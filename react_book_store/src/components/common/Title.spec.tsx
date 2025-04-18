import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import Title from "./Title";

describe("타이틀 컴포넌트 테스트", () => {
  it('check render', () => {
    render(
      <BookStoreThemeProvider>
        <Title size='large'>Title</Title>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('size prop check', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size='large'>Title</Title>
      </BookStoreThemeProvider>
    );
    expect(container?.firstChild).toHaveStyle({ fontSize: '2rem' })
  });

  it('color props check', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large">Title</Title>
      </BookStoreThemeProvider>
    );
    expect(container?.firstChild).toHaveStyle({ color: 'brown' })
  })
})
