import styled, { keyframes, createGlobalStyle } from "styled-components";
import colors from "../styles/colors";
import { useEffect, useState } from "react";

// انیمیشن چشمک‌زدن حروف
const loadingAnimation = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`;

// انیمیشن فیداؤتِ والد
const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-BoldItalic.ttf') format('truetype');
    font-weight: bold;
    font-style: italic;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-ExtraLight.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-ExtraLightItalic.ttf') format('truetype');
    font-weight: 200;
    font-style: italic;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Italic.ttf') format('truetype');
    font-weight: normal;
    font-style: italic;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-LightItalic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-MediumItalic.ttf') format('truetype');
    font-weight: 500;
    font-style: italic;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-SemiBoldItalic.ttf') format('truetype');
    font-weight: 600;
    font-style: italic;
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.backgroundTop};
  color: ${colors.text};
  font-family: "Kodchasan", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  z-index: 100;

  /* اگر $fadeOut=true باشد، انیمیشن 1 ثانیه‌ای فیداجرا می‌شود */
  animation: ${(props) => (props.$fadeOut ? fadeOutAnimation : "none")} 1s ease forwards;
`;

// هر حرف را فقط وقتی که در حال فیداوت نیستیم، چشمک بزند
const Letter = styled.span`
  animation: ${(props) => (!props.$fadeOut ? loadingAnimation : "none")} 1s infinite;
  animation-delay: ${(props) => props.delay || 0}ms;
`;

const LoadingComponent = ({ loading, text = "ChitChime" }) => {
  const [isVisible, setIsVisible] = useState(true); // برای حضور در DOM
  const [fadeOut, setFadeOut] = useState(false);    // شروع انیمیشن فید

  useEffect(() => {
    // هر بار که propِ 'loading' تغییر کند:
    if (!loading) {
      // یعنی صفحه کامل لود شده
      // ۱) یک ثانیه صبر می‌کنیم (نمایش همان انیمیشن چشمک‌زن)
      const stayTimer = setTimeout(() => {
        // ۲) انیمیشن فید اوت را شروع کنیم
        setFadeOut(true);

        // ۳) پس از 1 ثانیه (مدت فیداوت) کاملاً از DOM حذف شود
        const fadeTimer = setTimeout(() => {
          setIsVisible(false);
        }, 1000);

        return () => clearTimeout(fadeTimer);
      }, 1000);

      return () => clearTimeout(stayTimer);
    } else {
      // اگر دوباره loading=true شد (مثلاً بازدید از صفحه دیگر و بازگشت)،
      // اینجا مطمئن می‌شویم همه چیز ریست شود
      setIsVisible(true);
      setFadeOut(false);
    }
  }, [loading]);

  // اگر اجازه رندر نداریم، خالی برگرد
  if (!isVisible) return null;

  return (
    <>
      <GlobalStyle />
      <LoadingScreen $fadeOut={fadeOut}>
        {[...text].map((char, index) => (
          <Letter key={index} delay={index * 100} $fadeOut={fadeOut}>
            {char}
          </Letter>
        ))}
      </LoadingScreen>
    </>
  );
};

export default LoadingComponent;
