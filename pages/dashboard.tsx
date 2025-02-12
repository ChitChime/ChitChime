"use client";

import styled, { createGlobalStyle, keyframes } from "styled-components";
import Head from "next/head";
import { useState, useEffect } from "react";
import colors from "../styles/colors";
import Image from "next/image";
import IndexExtensionThree from "../components/IndexExtensionThree";
import LoadingComponent from "../components/LoadingComponent";

const GlobalStyle = createGlobalStyle`
  /* Font imports from page.tsx */
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'Kodchasan';
    src: url('/fonts/Kodchasan-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Kodchasan', sans-serif;
    background-color: #FDFDFF; /* تغییر رنگ پس‌زمینه به #F7F9FB */
    color: ${colors.backgroundTop};
  }
`;

// Keyframe for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation wrapper
const AnimatedElement = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  padding: 50px 20px;
  background-color: ${colors.backgroundTop}; /* Match background color with Header */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative; /* اضافه کردن position برای کنترل بهتر */
  top: 0; /* قرار دادن لوگو در بالای دیو */

  img {
    object-fit: contain;
    width: 70px; /* کوچک‌تر کردن لوگو */
    height: 49px; /* متناسب با عرض جدید */
  }
`;

const MainContainer = styled.div`
  display: flex;
  height: 100vh; /* تنظیم ارتفاع به اندازه کل صفحه */
  overflow: hidden; /* جلوگیری از اسکرول در کل صفحه */
`;

const LeftSection = styled.div`
  flex: 0.3;
  background-color: transparent;
  display: flex;
  flex-direction: column; /* تنظیم جهت به صورت ستونی تا لوگو بالا و آیکن‌ها پایین قرار گیرند */
  justify-content: flex-start;
  align-items: center; /* مرکز کردن محتوا به صورت افقی */
  padding-top: 20px;
`;

const MiddleSection = styled.div`
  flex: 3;
  background-color: transparent;
  padding: 20px;
  overflow-y: auto; /* اضافه کردن اسکرول به دیو وسطی */
  /* مخفی کردن اسکرول بار */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* برای Firefox */
`;

const RightSection = styled.div`
  flex: 1;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  font-size: 4rem; 
  font-weight: bold;
  color: ${colors.text};
  margin: 0;
  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const Divider = styled.div`
  width: 150px;
  height: 8px;
  background-color: ${colors.dividerPrimary};
  border-radius: 10px;
  margin: 20px auto;
  @media (max-width: 600px) {
    width: 100px;
    height: 6px;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${colors.text};
  margin: 10px 0 30px;
  line-height: 1.5;
  padding: 0 400px;
  margin-bottom: 30px; /* Add margin-bottom */
  @media (max-width: 1024px) {
    padding: 0 200px;
  }
  @media (max-width: 768px) {
    padding: 0 80px;
  }
  @media (max-width: 600px) {
    padding: 0 20px;
    font-size: 0.85rem;
  }
  @media (min-width: 1190px) {
    padding: 0 300px; /* Change padding for screens larger than 1190px */
  }
`;

const AboutSection = styled.div`
  background-color: ${colors.text};
  padding: 100px 150px; /* تغییر مقدار padding */
  display: flex;
  flex-wrap: wrap;
  gap: 5%;
  justify-content: space-between;
  color: ${colors.backgroundTop};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  @media (max-width: 1024px) {
    padding: 80px 100px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 60px 40px;
  }
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
`;

const FormWrapper = styled(AnimatedElement)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 15px; /* فاصله بین فیلدها */
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const FormInput = styled(AnimatedElement).attrs({ as: 'input' })`
  background-color: ${colors.backgroundTop};
  border: none;
  border-radius: 30px; /* Change border-radius to 30px */
  padding: 17px 22px; /* Slightly increase padding */
  font-size: 1rem;
  color: ${colors.text};
  outline: none;
  flex: 1; /* برای تقسیم مساوی عرض */
  font-family: 'Kodchasan', sans-serif; /* Apply font */
  width: -webkit-fill-available; /* Ensure email input is the same size */
  @media (max-width: 600px) {
    padding: 14px 16px;
  }
`;

const FormTextArea = styled(AnimatedElement).attrs({ as: 'textarea' })`
  background-color: ${colors.backgroundTop};
  border: none;
  border-radius: 30px; /* Change border-radius to 30px */
  padding: 17px 22px; /* Slightly increase padding */
  font-size: 1rem;
  color: ${colors.text};
  outline: none;
  resize: none;
  height: -webkit-fill-available;
  width: -webkit-fill-available; /* Stretch the message input */
  font-family: 'Kodchasan', sans-serif; /* Apply font */
  @media (max-width: 600px) {
    padding: 14px 16px;
  }
`;

const SubmitButton = styled(AnimatedElement).attrs({ as: 'button' })`
  background-color: ${colors.cardSecondary};
  border: none;
  border-radius: 30px; /* Change border-radius to 30px */
  color: ${colors.text};
  padding: 17px 32px; /* Slightly increase padding */
  font-size: 1rem;
  cursor: pointer;
  width: fit-content;
  font-family: 'Kodchasan', sans-serif; /* Apply font */
  &:hover {
    background-color: ${colors.dividerPrimary};
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 12px 24px;
  }
  @media (max-width: 1190px) {
    margin-bottom: 50px; /* Add margin-bottom for screens with a maximum width of 1190px */
  }
`;

const NewsletterWrapper = styled(AnimatedElement)`
  flex: 1;
  min-width: 300px;
  background-color: ${colors.backgroundBottom};
  border-radius: 30px; /* Change border-radius to 30px */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${colors.text}; /* Set text color */
  @media (max-width: 1190px) {
    margin-top: 50px; /* Add margin-top for screens larger than 1190px */
  }
  @media (max-width: 1190px) {
    aspect-ratio: auto; /* Remove aspect-ratio for screens larger than 1190px */
  }
  @media (max-width: 768px) {
    width: auto; /* Set width to auto for screens with a maximum width of 768px */
  }
  h3 {
    font-size: 1.5rem; /* Increase font size */
    margin-bottom: 10px; /* Add margin-bottom */
    margin-top: 50px; /* Increase top margin */
  }
  width: 100%; /* Ensure it takes full width */
  aspect-ratio: 1; /* Ensure it is always a square */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  @media (max-width: 600px) {
    padding: 20px 15px;
  }
`;

const NewsletterInput = styled(AnimatedElement).attrs({ as: 'input' })`
  background-color: ${colors.backgroundTop};
  border: none;
  border-radius: 30px; /* Change border-radius to 30px */
  padding: 17px 22px; /* Slightly increase padding */
  font-size: 1rem;
  width: -webkit-fill-available;
  margin-bottom: 15px;
  font-family: 'Kodchasan', sans-serif; /* Apply font */
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 14px 16px;
  }
`;

const InfoCardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 0; /* Set top margin to 0 */
  background-color: ${colors.text}; /* Change background color to text color */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  padding: 50px 150px; /* Increase padding at the top and bottom */
  padding-bottom: 200px; /* Add padding-bottom */
  padding-top: 0px; /* Add padding-top */
  @media (max-width: 1024px) {
    padding: 40px 80px;
  }
  @media (max-width: 768px) {
    flex-direction: column; /* Set flex-direction to column for screens with a maximum width of 768px */
    align-items: center;
    padding: 30px 40px;
    padding-bottom: 60px;
  }
  @media (max-width: 600px) {
  }
`;

const InfoCard = styled(AnimatedElement)`
  flex: 1;
  max-width: 350px;
  background-color: ${colors.backgroundBottom};
  border-radius: 30px; /* Change border-radius to 30px */
  padding: 50px 20px; /* Increase padding at the top and bottom */
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${colors.text};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
  }
  @media (max-width: 600px) {
    padding: 30px 20px;
  }
`;

const IconWrapper = styled.button<{ selected?: boolean }>`
  font-size: 2rem;
  color: ${colors.backgroundBottom};
  font-family: "Material Symbols Outlined";
  background-color: transparent;
  border: none;
  border-radius: 50%;
  padding: 7px 10px;
  margin: 0;
  transition: all 0.2s ease-in-out;
  opacity: 1;

  &:hover {
    ${({ selected }) =>
      !selected &&
      `
      background-color: ${colors.dividerPrimary};
      color: ${colors.backgroundBottom};
    `}
  }

  ${({ selected }) =>
    selected &&
    `
    background-color: ${colors.backgroundBottom};
    color: ${colors.text};
  `}

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 10px;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const InfoDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const NewSection = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 100px;
  padding-bottom: 200px;
  background-color: ${colors.text};
  color: ${colors.backgroundTop};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 30px;
  }
`;

const TextBlock = styled.div`  flex: 1;
  min-width: 300px;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 20px;
  }
`;

const ImageBlock = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const RectangularDiv = styled.div`
  background-color: #fff; /* fallback background */
  background-image: url('/index-images/Background.png'); /* اضافه کردن عکس به عنوان پس‌زمینه */
  background-size: cover; /* پوشش کامل کادر */
  background-position: center; /* قرارگیری مرکزی عکس */
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* اضافه کردن سایه */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    max-width: 50%; /* محدود کردن عرض متن به 50% از عرض مستطیل */
    word-wrap: break-word; /* شکستن کلمات بلند */
    font-size: 1.5rem; /* بزرگ‌تر کردن اندازه فونت */
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const TextLeft = styled.h2`
  flex: 1;
  text-align: left;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #000;
  &:hover {
    color: #555;
  }
`;

const ExploreButton = styled.button`
  background-color: ${colors.backgroundBottom};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.dividerPrimary};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  /* اسکرول داخلی کارت حذف شده است */
`;

const Card = styled.div`
  flex: 1 1 calc(33.333% - 0px); /* افزایش عرض کارت‌ها */
  background-color: ${colors.backBlue};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 240px; /* افزایش حداقل عرض کارت */
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column; /* تغییر جهت به ستون برای قرارگیری بالا و پایین */
  width: 100%;
`;

const CardSection = styled.div`
  padding: 0; /* حذف padding */
  margin: 0; /* حذف margin */
  text-align: center;
  width: 100%; /* اطمینان از اینکه بخش کل عرض را می‌گیرد */
  &:first-child {
    /* ارتفاع ثابت حذف شده تا با ابعاد عکس تنظیم شود */
    position: relative;
  }
  &:last-child {
    text-align: left; /* تنظیم متن بخش دوم به سمت چپ */
    h3 {
      margin: 10px; /* اعمال مارجین ۱۰ پیکسلی */
      padding-left: 10px; /* اضافه کردن پدینگ چپ ۱۰ پیکسلی */
    }
    p {
      margin: 10px; /* اعمال مارجین ۱۰ پیکسلی */
      padding-left: 10px; /* اضافه کردن پدینگ چپ ۱۰ پیکسلی */
      padding-bottom: 15px; /* اضافه کردن پدینگ پایین ۱۵ پیکسلی فقط برای متن */
    }
  }
`;

const InnerRectangle = styled.div`
  background-color: #e0e0e0; /* رنگ پس‌زمینه مستطیل */
  width: 100%; /* تنظیم عرض مستطیل به اندازه کل بخش */
  height: 100%; /* ناحیه به اندازه والد (200px) تنظیم شود */
  display: flex; /* استفاده از flexbox برای چپ و راست کردن محتوا */
  justify-content: space-between; /* فاصله بین محتوا */
  align-items: center; /* مرکز کردن محتوا به صورت عمودی */
  border-radius: 10px 10px 0 0; /* تنظیم گوشه‌های بالایی به 10 پیکسل */
  /* حذف padding و margin */
  position: relative; /* برای قرار دادن تصویر در پس‌زمینه */
  overflow: hidden; /* برای جلوگیری از خروج تصویر از محدوده */
`;

const InnerImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0; /* قرار دادن تصویر در پس‌زمینه */
  opacity: 1; /* حذف شفافیت برای وضوح تصویر */
`;

const InnerContent = styled.div`
  position: relative;
  z-index: 1; /* قرار دادن محتوا در بالای تصویر */
  padding: 10px; /* اضافه کردن padding برای فاصله از لبه‌ها */
  display: flex; /* استفاده از flexbox برای چپ و راست کردن محتوا */
  justify-content: space-between; /* فاصله بین محتوا */
  align-items: center; /* مرکز کردن محتوا به صورت عمودی */
  width: 100%; /* اطمینان از اینکه محتوا کل عرض را می‌گیرد */
`;

const BlueBox = styled.div`
  background-color: transparent;
  width: 48%; /* تنظیم عرض برای قرارگیری در کنار هم */
  height: 50px;
  margin-top: 5px;
  display: flex; /* استفاده از flexbox برای قرار دادن تصویر و متن */
  align-items: center; /* مرکز کردن محتوا به صورت عمودی */
  padding: 5px 20px 20px 20px;
`;

const NameText = styled.span`
  color: #242275;
  margin-left: 10px; /* فاصله از تصویر */
  font-weight: bold;
  font-size: 1.2rem; /* افزایش اندازه فونت برای name */
`;

const RedBox = styled.div`
  background-color: transparent;
  width: 48%; /* تنظیم عرض برای قرارگیری در کنار هم */
  height: 50px;
  margin-top: 5px;
  display: flex; /* استفاده از flexbox برای قرار دادن دکمه */
  align-items: center; /* مرکز کردن محتوا به صورت عمودی */
  justify-content: center; /* مرکز کردن محتوا به صورت افقی */
  padding: 5px 20px 20px 20px;
`;

const RedBoxButton = styled.button`
  background-color: ${colors.backgroundBottom};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px;
  width: 100%;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.dividerPrimary};
  }
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between; /* فاصله بین دیوها */
  width: 100%;
  margin-top: 10px;
`;

// اضافه کردن کامپوننت جدید برای دیو وسط با رنگ آبی
const BlueCenterDivMiddle = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 70%;
  height: 80px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
  gap: 10px;
  border-radius: 5px;
  padding: 2px;
  backdrop-filter: blur(5px);
`;

// اضافه کردن کامپوننت جدید برای دیو سمت راست با رنگ آبی
const BlueCenterDivRight = styled(BlueCenterDivMiddle)`
  font-size: 1rem;
  height: 25%;
`;

// کامپوننت Countdown برای نمایش شمارش معکوس
function Countdown({ initialSeconds = 300 }: { initialSeconds?: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const hours = String(Math.floor(secs / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return <>{formatTime(seconds)}</>;
}

// اضافه کردن کامپوننت برای container آیکون‌ها
const IconContainer = styled.div`
  background-color: #fff; /* رنگ پس‌زمینه سفید */
  padding: 10px;
  border-radius: 5px;
  flex: 1; /* استفاده از فضای باقی‌مانده کل بخش (کل صفحه) */
  display: flex;
  flex-direction: column; /* قرار دادن آیکون‌ها به صورت عمودی */
  justify-content: center;
  align-items: center;
  gap: 30px; /* افزایش فاصله بین آیکون‌ها */
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileCircle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileName = styled.h2`
  font-size: 1.1rem;
  margin-top: 8px;
  margin-bottom: 2px;
  color: ${colors.text};
`;

const FloatingCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  animation: ${floatAnimation} 3s infinite ease-in-out;
`;

const Circle1 = styled(FloatingCircle)`
  width: 15px;
  height: 15px;
  bottom: 35%;
  left: 5%;
  animation-delay: 0s;
`;

const Circle2 = styled(FloatingCircle)`
  width: 20px;
  height: 20px;
  top: 5px;
  right: 12px;
  animation-delay: 1s;
`;

const Circle3 = styled(FloatingCircle)`
  width: 25px;
  height: 25px;
  bottom: 20%;
  right: 5px;
  animation-delay: 2s;
`;

const ProfileContainer = styled.div`
  width: 80%;
  height: 25%;
  background-color: ${colors.backgroundBottom};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
`;

const ProfileBorder = styled.div`
  width: 100px;
  height: 100px;
  padding: 5px 0;
  border-radius: 50%;
  border: 4px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileDetails = styled.div`
  text-align: center;
  color: white;
`;

const ProfileJob = styled.p`
  font-size: 0.9rem;
  color: ${colors.dividerPrimary};
  margin: 0;
`;

const RegisteredClubsSection = styled.div`
  width: 100%;
  margin-top: 0px;
`;

const RegisteredClubsTitle = styled.h2`
  margin: 0;
  padding: 10px;
  font-size: 1.5rem;
  color: ${colors.backgroundTop};
`;

const RegisteredClubsScroll = styled.div`
  max-height: 320px;  /* تغییر ارتفاع حداکثر به 320 پیکسل */
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    width: 0;  /* مخفی کردن اسکرول بار در مرورگرهای WebKit */
  }
`;

// افزودن کامپوننت‌های جدید برای کارت‌های سمت راست
const RightCard = styled.div`
  background-color: ${colors.backBlue};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 240px;
  margin-bottom: 20px;
`;

const RightCardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RightCardSection = styled.div`
  padding: 0;
  margin: 0;
  text-align: center;
  width: 100%;
  &:first-child {
    position: relative;
  }
  &:last-child {
    text-align: left;
    h3 {
      margin: 10px;
      padding-left: 10px;
    }
    p {
      margin: 10px;
      padding-left: 10px;
      padding-bottom: 15px;
    }
  }
`;

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string>("home");

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }

    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
      rootMargin: "0px 0px -10% 0px"
    });

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 100);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </Head>
      <GlobalStyle />
      <LoadingComponent loading={loading} />
      <MainContainer>
        <LeftSection>
          <LogoButton>
            <Image src="/assets/ChitChime-Logo-2.webp" alt="Chit-Chime Logo" width={70} height={49} />
          </LogoButton>
          <IconContainer>
            <IconWrapper
              selected={selectedIcon === "home"}
              onClick={() => setSelectedIcon("home")}
            >
              home
            </IconWrapper>
            <IconWrapper
              selected={selectedIcon === "search"}
              onClick={() => setSelectedIcon("search")}
            >
              search
            </IconWrapper>
            <IconWrapper
              selected={selectedIcon === "star_rate"}
              onClick={() => setSelectedIcon("star_rate")}
            >
              star_rate
            </IconWrapper>
            <IconWrapper
              selected={selectedIcon === "settings"}
              onClick={() => setSelectedIcon("settings")}
            >
              settings
            </IconWrapper>
          </IconContainer>
        </LeftSection>
        <MiddleSection>
          <h1 style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '5px' }}>Dashboard</h1>
          <p>Buy and sell digital artwork, NFT collection</p>
          <RectangularDiv>
            <h2>Find a collection of best artwork here</h2>
            <ExploreButton>Explore Now</ExploreButton>
          </RectangularDiv>
          <ButtonGroup>
            <TextLeft>All Clubs</TextLeft>
            <div>
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
              <Button>Button 4</Button>
            </div>
          </ButtonGroup>
          <CardContainer>
            {[...Array(6)].map((_, index) => {
              return (
                <Card key={index}>
                  <CardContent>
                    <CardSection>
                      <InnerRectangle>
                        <InnerImage
                          src="/index-images/Background.png"
                          alt="Background"
                          layout="responsive"
                          width={300}
                          height={200}
                          objectFit="contain"
                        />
                        <BlueCenterDivMiddle>
                          <div style={{ width: "100%", textAlign: "center" }}>
                            Price:
                            <div style={{ fontSize: "0.8rem", marginTop: "4px" }}>
                              200$
                            </div>
                          </div>
                          <div style={{ 
                            width: "100%", 
                            textAlign: "center", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center", 
                            flexDirection: "column"
                          }}>
                            <span style={{ fontSize: "1.3rem" }}>Opening:</span>
                            <span style={{ fontSize: "0.8rem", marginTop: "4px" }}>
                              <Countdown initialSeconds={300} />
                            </span>
                          </div>
                        </BlueCenterDivMiddle>
                        <InnerContent>
                          {/* Removed texts */}
                        </InnerContent>
                      </InnerRectangle>
                    </CardSection>
                    <CardSection>
                      <h3>Section 2</h3>
                      <p>Content for section 2 of card {index + 1}.</p>
                      <BoxContainer>
                        <BlueBox>
                          <Image
                            src="/index-images/a_cat_reading_book_with_colorful_background_8w6w89k8ldm56x4vb2uh_2.png"
                            alt="A cat reading a book"
                            width={60}
                            height={60}
                            style={{ borderRadius: '50%' }}
                          />
                          <NameText>name</NameText>
                        </BlueBox>
                        <RedBox>
                          <RedBoxButton>Click Me</RedBoxButton>
                        </RedBox>
                      </BoxContainer>
                    </CardSection>
                  </CardContent>
                </Card>
              );
            })}
          </CardContainer>
        </MiddleSection>
        <RightSection>
          <ProfileContainer>
            <CircleWrapper>
              <Circle1 />
              <Circle2 />
              <Circle3 />
              <ProfileBorder>
                <ProfileCircle>
                  <Image 
                    src="/index-images/a_cat_reading_book_with_colorful_background_6ti23teyit2y4wpvflt3_1.png"
                    alt="Profile"
                    width={120}
                    height={120}
                  />
                </ProfileCircle>
              </ProfileBorder>
              <ProfileDetails>
                <ProfileName>John Doe</ProfileName>
                <ProfileJob>Software Engineer</ProfileJob>
              </ProfileDetails>
            </CircleWrapper>
          </ProfileContainer>
          <RegisteredClubsSection>
            <RegisteredClubsTitle>Registered Clubs</RegisteredClubsTitle>
            <RegisteredClubsScroll>
              <RightCard>
                <RightCardContent>
                  <RightCardSection>
                    <InnerRectangle>
                      <InnerImage
                        src="/index-images/Background.png"
                        alt="Background"
                        layout="responsive"
                        width={300}
                        height={200}
                        objectFit="contain"
                      />
                      <BlueCenterDivRight>
                        <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1rem" }}>
                          Opening: <Countdown initialSeconds={300} />
                        </div>
                      </BlueCenterDivRight>
                      <InnerContent>
                        {/* Removed texts */}
                      </InnerContent>
                    </InnerRectangle>
                  </RightCardSection>
                  <RightCardSection>
                    <h3>Section 2</h3>
                    <p style={{ display: "none" }}>Content for section 2 of card 1.</p>
                    <BoxContainer>
                      <BlueBox style={{ marginTop: "5px" }}>
                        <Image
                          src="/index-images/a_cat_reading_book_with_colorful_background_8w6w89k8ldm56x4vb2uh_2.png"
                          alt="A cat reading a book"
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%" }}
                        />
                        <NameText style={{ fontSize: "1rem", marginLeft: "7px" }}>name</NameText>
                      </BlueBox>
                      <RedBox style={{ marginTop: "5px" }}>
                        <RedBoxButton style={{ width: "80%", padding: "12px" }}>Join</RedBoxButton>
                      </RedBox>
                    </BoxContainer>
                  </RightCardSection>
                </RightCardContent>
              </RightCard>
              <RightCard>
                <RightCardContent>
                  <RightCardSection>
                    <InnerRectangle>
                      <InnerImage
                        src="/index-images/Background.png"
                        alt="Background"
                        layout="responsive"
                        width={300}
                        height={200}
                        objectFit="contain"
                      />
                      <BlueCenterDivRight>
                        <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1rem" }}>
                          Opening: <Countdown initialSeconds={300} />
                        </div>
                      </BlueCenterDivRight>
                      <InnerContent>
                        {/* Removed texts */}
                      </InnerContent>
                    </InnerRectangle>
                  </RightCardSection>
                  <RightCardSection>
                    <h3>Section 2</h3>
                    <p style={{ display: "none" }}>Content for section 2 of card 2.</p>
                    <BoxContainer>
                      <BlueBox>
                        <Image
                          src="/index-images/a_cat_reading_book_with_colorful_background_8w6w89k8ldm56x4vb2uh_2.png"
                          alt="A cat reading a book"
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%" }}
                        />
                        <NameText>name</NameText>
                      </BlueBox>
                      <RedBox>
                        <RedBoxButton>Join</RedBoxButton>
                      </RedBox>
                    </BoxContainer>
                  </RightCardSection>
                </RightCardContent>
              </RightCard>
            </RegisteredClubsScroll>
          </RegisteredClubsSection>
        </RightSection>
      </MainContainer>
    </>
  );
}



