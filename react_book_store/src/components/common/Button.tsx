import React, { ReactNode } from "react";
import styled from "styled-components"
import { BorderRadius, ButtonScheme, ButtonSize } from "../../style/styled";

type Tbutton = 'button' | 'submit'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  border?: BorderRadius;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type?: Tbutton;
}

export default function Button({ children, size, scheme, disabled, isLoading, type, onClick }: Props) {
  return (
    <ButtonStyle size={size} scheme={scheme} disabled={disabled} isLoading={isLoading} onClick={onClick} type={type}>{children}</ButtonStyle>
  )
}

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
font-size: ${({ theme, size }) => theme.button[size].fontSize};
padding : ${({ theme, size }) => theme.button[size].padding};
color : ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
background-color : ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
border : 0;
border-radius: ${({ theme, border }) => theme.borderRadius['default'].borderRadius};
opacity : ${({ disabled }) => (disabled ? 0.5 : 1)};
pointer-events : ${({ disabled }) => (disabled ? 'none' : 'auto')};
cursor : ${({ disabled }) => (disabled ? 'none' : 'pointer')};
`;
