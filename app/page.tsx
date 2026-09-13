import StoryContainer from "@/components/StoryContainer";
import Chapter00 from "@/chapters/Chapter00";
import Chapter01 from "@/chapters/Chapter01";
import Chapter02 from "@/chapters/Chapter02";
import Chapter03 from "@/chapters/Chapter03";
import Chapter04 from "@/chapters/Chapter04";
import Chapter05 from "@/chapters/Chapter05";
import Chapter06 from "@/chapters/Chapter06";
import Chapter07 from "@/chapters/Chapter07";
import Chapter08 from "@/chapters/Chapter08";
import Chapter09 from "@/chapters/Chapter09";
import Chapter10 from "@/chapters/Chapter10";
import Chapter11 from "@/chapters/Chapter11";
import Chapter12 from "@/chapters/Chapter12";
import Chapter13 from "@/chapters/Chapter13";
import Chapter14 from "@/chapters/Chapter14";
import Chapter15 from "@/chapters/Chapter15";

export default function Home() {
  return (
    <StoryContainer totalChapters={16}>
      <Chapter00 />
      <Chapter01 />
      <Chapter02 />
      <Chapter03 />
      <Chapter04 />
      <Chapter05 />
      <Chapter06 />
      <Chapter07 />
      <Chapter08 />
      <Chapter09 />
      <Chapter10 />
      <Chapter11 />
      <Chapter12 />
      <Chapter13 />
      <Chapter14 />
      <Chapter15 />
    </StoryContainer>
  );
}
