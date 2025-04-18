import React, { ForwardedRef, forwardRef } from "react";
import { styled } from "styled-components";

interface Props {
  placeholder: string;
}

export const InputText = React.forwardRef(({ placeholder }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <InputTextStyled placeholder={placeholder} ref={ref}></InputTextStyled>
  )
})

const InputTextStyled = styled.input.attrs({ type: 'text' })`
  padding : 0.25rem 0.75rem;
  border : 1px solid ${({ theme }) => theme.colors.border};
  border-radius : ${({ theme }) => theme.borderRadius['default']};
  font-size : 1rem;
  line-height : 1.5;
  color : ${({ theme }) => theme.colors.text}
`;

