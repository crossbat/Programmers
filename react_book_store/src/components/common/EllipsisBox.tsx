import React, { useState } from "react"
import styled from "styled-components"
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  clamp: number
  children: React.ReactNode;
}

export default function EllipsisBox({ children, clamp }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <EllipsisBoxStyle clamp={clamp} $isExpanded={isExpanded} >
      <p>{children}</p>
      <div className="toggle">
        <Button size="small" scheme="normal" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '접기' : '더보기'}<FaAngleDown /></Button>
      </div>
    </EllipsisBoxStyle>
  )
}

interface EllipsisBoxStyleProps {
  clamp: number;
  $isExpanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
p{
  overflow : hidden;
  text-overflow : ellipsis;
  display : -webkit-box;
  -webkit-line-clamp: ${({ clamp, $isExpanded }) => ($isExpanded ? 'none' : clamp)};
  -webkit-box-orient: vertical;
  padding : 20px 0 0 0;
  margin : 0;
}
.toggle{
  display : flex;
  justify-content : end;
  svg{
    transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0)')};
  }
}

`

