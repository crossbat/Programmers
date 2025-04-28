import { useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

export default function FindAddressButton({ onCompleted }: Props) {
  // 스크립트 로드

  // 핸들러
  const handleOpen = () => {
    new window.daum.Postcode({
      onComplete: (data: any) => {
        onCompleted(data.address as string);
      }
    }).open()
  }
  // 입력

  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    }
  }, [])

  return (
    <Button scheme="normal" size="medium" type="button" onClick={handleOpen}>주소 찾기</Button>
  )
}

const FindAddressButtonStyle = styled.div``
