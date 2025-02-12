"use client";

import styled, { createGlobalStyle, keyframes } from "styled-components";
import Head from "next/head";
import { useState, useEffect } from "react";
import colors from "../styles/colors";
import Image from "next/image";
import IndexExtensionThree from "../components/IndexExtensionThree";
import LoadingComponent from "../components/LoadingComponent";
import Link from 'next/link';

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
    background-color: ${colors.backgroundTop};
    color: ${colors.text};
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

    @media (max-width: 600px) {
      width: 110px;
      height: 70px;
    }
  }

  @media (max-width: 1100px) {
    margin-left: 40px;
  }

  @media (max-width: 600px) {
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

  @media (max-width: 600px) {
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

const ContactSection = styled.div`
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

const IconWrapper = styled.span`
  font-size: 2.5rem;
  color: ${colors.text};
  font-family: "Material Icons";
  @media (max-width: 600px) {
    font-size: 2rem;
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

export default function ContactUsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

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

    // Manual check after a short delay
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
        <title>Contact Us</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <LoadingComponent loading={loading} /> {/* Add LoadingComponent */}
      {/* Top menu */}
      <Header>
        <LogoButton>
          <Image src="/assets/ChitChime-Logo.webp" alt="Chit-Chime Logo" width={150} height={110} />
        </LogoButton>
        <NavWrapper>
          <NavContainer>
            <Nav>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about-us">About</NavLink>
              <NavLink href="/clubs">Clubs</NavLink>
              <NavLink href="/contact-us">Contact Us</NavLink>
            </Nav>
            <Link href="/dashboard">
              <ProfileButton>Dashboard</ProfileButton>
            </Link>
          </NavContainer>
        </NavWrapper>
        <HamburgerMenu className={menuOpen ? "open" : ""} onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
          <div />
        </HamburgerMenu>
        <MobileMenu className={menuOpen ? "open" : ""}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about-us">About</NavLink>
          <NavLink href="/clubs">Clubs</NavLink>
          <NavLink href="/contact-us">Contact Us</NavLink>
          <Link href="/dashboard">
            <ProfileButton>Dashboard</ProfileButton>
          </Link>
        </MobileMenu>
      </Header>
      <HeaderSection>
        <Title>Contact Us</Title>
        <Divider />
        <Description>
          Have questions or need assistance? We're here to help! Reach out to us for inquiries about book clubs, meetings, or anything else.
        </Description>
      </HeaderSection>
      {/* Contact Form Section */}
      <ContactSection>
        <FormWrapper className="animate-on-scroll">
          <RowWrapper>
            <FormInput className="animate-on-scroll" placeholder="Name" />
            <FormInput className="animate-on-scroll" placeholder="Phone" />
          </RowWrapper>
          <FormInput className="animate-on-scroll" placeholder="Email" />
          <FormTextArea className="animate-on-scroll" placeholder="Message"></FormTextArea>
          <SubmitButton className="animate-on-scroll">Submit Button</SubmitButton>
        </FormWrapper>
        <NewsletterWrapper className="animate-on-scroll">
          <h3>Our Newsletters</h3>
          <p>
            Subscribe to our newsletter for the latest book club updates, upcoming meetings, reading recommendations, and special events.
          </p>
          <NewsletterInput className="animate-on-scroll" placeholder="Email" />
          <SubmitButton className="animate-on-scroll">Submit Button</SubmitButton>
        </NewsletterWrapper>
      </ContactSection>
      {/* Info Cards Section */}
      <InfoCardsWrapper>
        <InfoCard className="animate-on-scroll">
          <Image src="/contactus-images/large-x-logo.png" alt="Twitter Logo" width={50} height={50} />
          <InfoContent>
            <InfoTitle>Twitter</InfoTitle>
            <InfoDescription>
              Follow us on X (Twitter) for updates
            </InfoDescription>
          </InfoContent>
        </InfoCard>
        <InfoCard className="animate-on-scroll">
          <IconWrapper className="material-icons">email</IconWrapper>
          <InfoContent>
            <InfoTitle>Email</InfoTitle>
            <InfoDescription>
              Reach out for inquiries and we'll get back to you soon!
            </InfoDescription>
          </InfoContent>
        </InfoCard>
        <InfoCard className="animate-on-scroll">
          <Image src="/contactus-images/linkedin-logo.png" alt="LinkedIn Logo" width={50} height={50} />
          <InfoContent>
            <InfoTitle>LinkedIn</InfoTitle>
            <InfoDescription>
              Connect with Zizi on LinkedIn for professional collaborations!
            </InfoDescription>
          </InfoContent>
        </InfoCard>
      </InfoCardsWrapper>
      <IndexExtensionThree />
    </>
  );
}