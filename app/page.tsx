"use client";

import styled, { createGlobalStyle, keyframes } from "styled-components"; // Update import statement
import { useEffect, useState } from "react";
import colors from "../styles/colors";
import Head from "next/head";
import IndexExtensionOne from "../components/IndexExtensionOne";
import IndexExtensionTwo from "../components/IndexExtensionTwo";
import IndexExtensionThree from "../components/IndexExtensionThree";
import LoadingComponent from "../components/LoadingComponent"; // ایمپورت کامپوننت لودینگ

/* انیمیشن گرادینت برای عنوان */
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// انیمیشن fade in
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// انیمیشن fade out
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.95;
    transform: scale(0.95);
  }
`;

// انیمیشن slide down
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// انیمیشن slide up
const slideUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

/* گلوبال استایل */
const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow-y: scroll;
    scrollbar-width: none;   
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    min-height: 100vh;

    @media (max-width: 768px) {
      overflow-y: auto;
    }
  }

  @media (min-width: 769px) {
    .fLPlOP {
      text-align: left;
      max-width: 100%;
    }
  }

  @media (max-width: 1100px) {
    .dWnjvK {
      margin-left: 40px;
      align-items: baseline;
    }
  }
`;

/* بقیه استایل‌ها... */
const Container = styled.div`
  font-family: 'Kodchasan', sans-serif;
  background: ${colors.backgroundTop};
  color: ${colors.text};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  margin: 0;
  box-sizing: border-box;
  border-radius: 0 0 150px 0;
  position: relative;
  padding: 0 20px;

  @media (max-width: 768px) {
    align-items: center;
    padding: 0 10px;
    border-radius: 0 0 100px 0;
  }

  @media (max-width: 480px) {
    margin-top: 0px;
  }
`;

const BackgroundCircle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 300px;
  background: ${colors.backgroundBottom};
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
  z-index: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const OutlineCircle = styled.div`
  position: absolute;
  border: 50px solid ${colors.text};
  border-radius: 50%;
  opacity: 0.02;
  background: transparent;
  width: 200px;
  height: 200px;
  bottom: -17%;
  left: 55%;
  transform: translateX(-50%);
  z-index: 0;

  @media (max-width: 850px) {
    display: none;
  }
`;

const LeftCircle = styled.div`
  position: absolute;
  border: 70px solid ${colors.text};
  border-radius: 50%;
  opacity: 0.02;
  background: transparent;
  width: 200px;
  height: 200px;
  top: 30%;
  left: 20%;
  transform: translateX(-50%);
  z-index: 0;
`;

const Header = styled.header`
  z-index: 10;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 50px;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const LogoButton = styled.button`
  font-family: 'Kodchasan', sans-serif;
  background: none;
  border: none;
  margin-left: 70px;
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    object-fit: contain;
    width: 150px;
    height: 110px;

    @media (max-width: 768px) {
      width: 100px;
      height: 80px;
      margin-left: 0;
    }

    @media (max-width: 900px) {
      width: 130px;
      height: 90px;
    }

    @media (max-width: 480px) {
      width: 110px;
      height: 70px;
    }
  }

  @media (max-width: 1100px) {
    margin-left: 40px;
  }

  @media (max-width: 480px) {
    margin-left: 20px;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
  margin-right: 70px;

  @media (max-width: 1100px) {
    margin-right: 40px;
  }

  @media (max-width: 1000px) {
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 480px) {
    margin-right: 30px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 70px;

  @media (max-width: 1100px) {
    gap: 40px;
  }

  @media (max-width: 800px) {
    gap: 30px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  letter-spacing: 1px;

  @media (max-width: 800px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const NavLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.text};
  font-size: 0.9rem;
  font-weight: 300;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.dividerPrimary};
  }

  @media (max-width: 1000px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ProfileIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 30; /* اطمینان از نمایش بالاتر از منوی پس‌زمینه */
  margin-right: 40px;
  position: relative; /* موقعیت‌دهی نسبی */

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    width: 25px;
    height: 3px;
    background-color: ${colors.text};
    margin: 4px 0;
    transition: 0.4s;
  }

  /* خطوط برای تبدیل به ضربدر */
  &.open div:nth-child(1) {
    transform: rotate(45deg) translate(3px, 5px);
    background-color: ${colors.dividerPrimary}; /* تغییر رنگ در صورت نیاز */
  }

  &.open div:nth-child(2) {
    transform: rotate(-45deg) translate(3px, -5px);
    background-color: #8291E4; /* تغییر رنگ در صورت نیاز */
  }

  &.open div:nth-child(3) {
    opacity: 0; /* خط وسط را مخفی می‌کنیم */
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10;
  transform: scale(0.5);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;

  &.open {
    display: flex;
    transform: scale(1);
    opacity: 1;
  }

  a {
    color: ${colors.text};
    font-size: 1.5rem;
    margin: 20px 0;
    transition: opacity 0.5s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const ProfileButton = styled.button`
  background: ${colors.text};
  border: none;
  color: ${colors.backgroundTop};
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${colors.cardSecondary};
    color: ${colors.text};
  }

  @media (max-width: 1000px) {
    font-size: 0.8rem;
  }

  @media (max-width: 800px) {
    padding: 10px 20px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
  }
`;

const TextContent = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 70px;
  align-items: center; /* Center align items */

  @media (max-width: 768px) {
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    max-width: 1000px;
  }

  @media (min-width: 769px) {
    align-items: baseline;
  }

  @media (max-width: 1100px) {
    margin-left: 40px;
  }

  @media (max-width: 480px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

/* عنوان گرادینت‌دار */
const Title = styled.h1`
  font-size: 3.7rem;
  font-weight: 700;
  line-height: 1.2;
  padding-bottom: 5px;
  margin-bottom: 5px;
  position: relative;
  z-index: 2;
  text-align: center; /* Center align text */

  @media (min-width: 769px) {
    text-align: left; /* Align text to the left */
  }

  background: linear-gradient(
    -45deg,
    ${colors.cardPrimary},
    ${colors.cardSecondary},
    ${colors.dividerPrimary}
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: ${gradientAnimation} 8s ease infinite;

  @media (max-width: 1000px) {
    font-size: 3.5rem;
  }

  @media (max-width: 900px) {
    font-size: 3rem;
  }

  @media (max-width: 800px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
    text-align: center;
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: ${colors.text};
  margin-top: 5px;
  margin-bottom: 20px;
  max-width: 90%;
  z-index: 2;
  position: relative;
  text-align: center; /* Center align text */

  @media (min-width: 769px) {
    text-align: left; /* Align text to the left */
    max-width: 100%;
    padding-right: 30px;
  }

  @media (max-width: 900px) {
    font-size: 0.9rem;
  }

  @media (max-width: 800px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  z-index: 2;
  position: relative;
  justify-content: center; /* Center align buttons */

  @media (min-width: 769px) {
    justify-content: flex-start; /* Align buttons to the left */
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

const StyledButton = styled.button`
  padding: 5px 5px 5px 30px;
  border: none;
  border-radius: 200px;
  font-size: 1rem;
  cursor: pointer;
  color: ${colors.backgroundTop};
  background: ${colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Kodchasan', sans-serif;

  &:hover {
    background: ${colors.cardSecondary};
    color: ${colors.text};
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${colors.text};
    border-radius: 50%;
    background: linear-gradient(
      330deg,
      ${colors.cardPrimary},
      ${colors.cardSecondary},
      ${colors.dividerPrimary}
    );
    padding: 10px;
    margin-left: 10px;
  }

  @media (max-width: 900px) {
    font-size: 0.9rem;
    gap: 5px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 1.2rem;
    gap: 0;
  }

  @media (max-width: 900px) {
    svg {
      width: 30px;
      height: 30px;
    }
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 1rem;
    padding-left: 20px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 140px);
  grid-template-rows: repeat(3, 140px);
  gap: 15px;
  align-self: flex-end;
  margin-right: 90px;
  position: relative;
  z-index: 1;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 120px);
    grid-template-rows: repeat(3, 120px);
  }

  @media (max-width: 850px) {
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  @media (max-width: 1100px) {
    margin-right: 40px;
  }

  @media (max-width: 1000px) {
    margin-right: 20px;
  }
`;

const GridItem = styled.div`
  width: auto;
  height: auto;
  background: ${colors.text};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const LargeGridItem = styled(GridItem)`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  width: auto;
  height: auto;
  border-radius: 40% 0 40% 0;
  background: url("/index-images/big-square.png") no-repeat center center;
  background-size: cover;
`;

const gridBorderRadius = [
  "50% 0 0 50%",
  "50% 50% 50% 50%",
  "40% 0 0 0",
  "0",
  "0",
  "0",
  "0",
  "0",
];

const gridBackgrounds = [
  "url('/index-images/square-1.png') no-repeat center center",
  "url('/index-images/square-2.png') no-repeat center center",
  "url('/index-images/square-3.png') no-repeat center center",
  "url('/index-images/big-square.png') no-repeat center center",
  "",
  "url('/index-images/square-6.png') no-repeat center center",
  "",
  "",
  "url('/index-images/square-9.png') no-repeat center center",
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // Add this line

  useEffect(() => {
    // اگر صفحه از قبل لود شده بود
    if (document.readyState === "complete") {
      setLoading(false);
      return;
    }

    // منتظر رویداد load بمانیم
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuVisible(true); // نمایش منو قبل از باز کردن
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
      setTimeout(() => setMenuVisible(false), 500); // حذف منو بعد از انیمیشن
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setTimeout(() => setMenuVisible(false), 500); // حذف منو بعد از انیمیشن
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=chevron_right"
        />
      </Head>
      <GlobalStyle />

      {/* لودینگ را همیشه رندر می‌کنیم و وضعیت را به‌صورت prop می‌فرستیم */}
      <LoadingComponent loading={loading} />

      <Container>
        <BackgroundCircle />
        <OutlineCircle />
        <LeftCircle />
        <Header>
          <LogoButton>
            <img src="/assets/ChitChime-Logo.webp" alt="ChitChime Logo" />
          </LogoButton>
          <HamburgerMenu className={menuOpen ? 'open' : ''} onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </HamburgerMenu>
          {menuVisible && (
            <MobileMenu className={menuOpen ? 'open' : ''} onClick={closeMenu}>
              <NavLink href="#">Home</NavLink>
              <NavLink href="#">About</NavLink>
              <NavLink href="#">Clubs</NavLink>
              <NavLink href="#">Contact</NavLink>
            </MobileMenu>
          )}
          <NavWrapper>
            <NavContainer>
              <Nav>
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">About</NavLink>
                <NavLink href="#">Clubs</NavLink>
                <NavLink href="#">Contact</NavLink>
              </Nav>
              <ProfileButton>Dashboard</ProfileButton>
            </NavContainer>
          </NavWrapper>
        </Header>

        <MainContent>
          <TextContent>
            <Title>Explore Clubs, Elevate Your Language</Title>
            <Subtitle>
              Dive into vibrant communities to learn, practice, and grow with
              language enthusiasts.
            </Subtitle>
            <ButtonGroup>
              <StyledButton>
                All Clubs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </StyledButton>
            </ButtonGroup>
          </TextContent>
          <GridContainer>
            {Array.from({ length: 9 }).map((_, index) => {
              if (index === 3) {
                return <LargeGridItem key={index}></LargeGridItem>;
              }
              if (index === 4 || index === 6 || index === 7) {
                return null;
              }
              if (index === 5) {
                return (
                  <GridItem
                    key={index}
                    style={{
                      gridColumn: "3 / span 1",
                      borderRadius: "50% 50% 50% 50%",
                      background: gridBackgrounds[5],
                      backgroundSize: "cover",
                    }}
                  ></GridItem>
                );
              }
              if (index === 8) {
                return (
                  <GridItem
                    key={index}
                    style={{
                      gridColumn: "3 / span 1",
                      borderRadius: "0% 0% 50% 50%",
                      background: gridBackgrounds[8],
                      backgroundSize: "cover",
                    }}
                  ></GridItem>
                );
              }
              return (
                <GridItem
                  key={index}
                  style={{
                    borderRadius: gridBorderRadius[index],
                    background: gridBackgrounds[index],
                    backgroundSize: "cover",
                  }}
                ></GridItem>
              );
            })}
          </GridContainer>
        </MainContent>
      </Container>

      <div
        style={{
          width: "100%",
          marginTop: "0px",
          padding: "0px 0",
          background: colors.text,
        }}
      >
        <IndexExtensionOne />
        <IndexExtensionTwo />
        <IndexExtensionThree />
      </div>
    </>
  );
}
