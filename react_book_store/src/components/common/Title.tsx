import { ReactNode } from "react";
import { styled } from "styled-components"
import { ColorKey, HeadingSize } from "../../style/styled";

interface Props {
  children: ReactNode;
  size: HeadingSize;
  color?: ColorKey;

}

export default function Title({ children, size, color }: Props) {
  return (
    <TitleStyle size={size} color={color}>{children}</TitleStyle>
  )
}

const TitleStyle = styled.h1<Omit<Props, "children">>`
font-size : ${({ theme, size }) => theme.heading[size].fontSize};
color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.primary}
`;
