"use client";

import styled, { createGlobalStyle, keyframes } from "styled-components";
import Head from "next/head";
import { useState, useEffect } from "react";
import colors from "../styles/colors"; // Ensure this path is correct
import Image from "next/image"; // for smaller logo
import IndexExtensionThree from "../components/IndexExtensionThree"; // Ensure this path is correct
import LoadingComponent from "../components/LoadingComponent"; // Import LoadingComponent

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

// Add a top menu (simplified version)
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.backgroundTop};
  padding: 20px;
  top: 0;
  z-index: 999;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  display: flex;
  align-items: center;
  img {
    width: 110px; /* لوگوی بزرگ‌تر */
    height: 70px;
    object-fit: contain;
    @media (max-width: 480px) {
      width: 90px;
      height: 60px;
    }
  }
`;

const NavWrapper = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* Gap between menu and dashboard */
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${colors.text};
  font-size: 0.9rem; /* Font size for header */
  &:hover {
    color: ${colors.dividerPrimary};
  }
`;

const ProfileButton = styled.button`
  background: ${colors.text};
  border: none;
  color: ${colors.backgroundTop};
  padding: 10px 30px;
  border-radius: 20px;
  font-size: 0.9rem; /* Font size for header */
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s; /* Add transition for smooth color change */
  margin-right: 30px; /* Margin from the right */
  &:hover {
    background-color: ${colors.cardSecondary};
    color: ${colors.text};
  }
  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 0.8rem;
  }
`;

const HamburgerMenu = styled.div<{ open?: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    cursor: pointer;
  }
  div {
    width: 25px;
    height: 3px;
    background-color: ${colors.text};
    margin: 4px 0;
    transition: transform 0.4s, opacity 0.4s, background-color 0.3s; /* Ensure all transitions are included */
  }
  ${({ open }) =>
    open &&
    `
    div:nth-child(1) {
      transform: rotate(45deg) translate(4px, 6px);
    }
    div:nth-child(2) {
      opacity: 0;
    }
    div:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
  &:hover div {
    background-color: ${colors.dividerPrimary}; /* Change color on hover */
  }
`;

const MobileMenu = styled.div<{ open?: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    position: absolute;
    top: 70px;
    right: 20px;
    background: ${colors.backgroundBottom};
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    border-radius: 10px;
  }
  a {
    color: ${colors.text};
    &:hover {
      color: ${colors.dividerPrimary};
    }
  }
`;

const Title = styled.h1`
  font-size: 4rem; 
  font-weight: bold;
  color: ${colors.text};
  margin: 0;
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Divider = styled.div`
  width: 150px;
  height: 8px;
  background-color: ${colors.dividerPrimary};
  border-radius: 10px;
  margin: 20px auto;
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
    padding: 0 20px;
    font-size: 0.85rem;
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
  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const FormWrapper = styled(AnimatedElement)`
  flex: 1;
  min-width: 55%;
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
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 12px 24px;
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
  h3 {
    font-size: 1.5rem; /* Increase font size */
    margin-bottom: 10px; /* Add margin-bottom */
    margin-top: 50px; /* Increase top margin */
  }
  width: 100%; /* Ensure it takes full width */
  aspect-ratio: 1; /* Ensure it is always a square */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
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
    flex-direction: column;
    align-items: center;
    padding: 30px 40px;
    padding-bottom: 60px;
  }
  @media (max-width: 480px) {
    padding: 20px;
    padding-bottom: 40px;
  }
`;

const InfoCard = styled(AnimatedElement)`
  flex: 1;
  min-width: 300px;
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
  @media (max-width: 480px) {
    padding: 30px 20px;
  }
`;

const IconWrapper = styled.span`
  font-size: 2.5rem;
  color: ${colors.text};
  font-family: "Material Icons";
  @media (max-width: 480px) {
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
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const InfoDescription = styled.p`
  font-size: 0.9rem;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export default function ContactUsHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
            <NavLink href="/">Home</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Clubs</NavLink>
            <NavLink href="/contact-us">Contact Us</NavLink>
            <ProfileButton>Dashboard</ProfileButton>
          </NavContainer>
        </NavWrapper>
        <HamburgerMenu open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
          <div />
        </HamburgerMenu>
        <MobileMenu open={menuOpen}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Clubs</NavLink>
          <NavLink href="/contact-us">Contact Us</NavLink>
          <ProfileButton>Dashboard</ProfileButton>
        </MobileMenu>
      </Header>
      <HeaderSection>
        <Title>Contact Us</Title>
        <Divider />
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <NewsletterInput className="animate-on-scroll" placeholder="Email" />
          <SubmitButton className="animate-on-scroll">Submit Button</SubmitButton>
        </NewsletterWrapper>
      </ContactSection>
      {/* Info Cards Section */}
      <InfoCardsWrapper>
        <InfoCard className="animate-on-scroll">
          <IconWrapper className="material-icons">phone</IconWrapper>
          <InfoContent>
            <InfoTitle>(+876) 765 665</InfoTitle>
            <InfoDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </InfoDescription>
          </InfoContent>
        </InfoCard>
        <InfoCard className="animate-on-scroll">
          <IconWrapper className="material-icons">email</IconWrapper>
          <InfoContent>
            <InfoTitle>mail@influenca.id</InfoTitle>
            <InfoDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </InfoDescription>
          </InfoContent>
        </InfoCard>
        <InfoCard className="animate-on-scroll">
          <IconWrapper className="material-icons">location_on</IconWrapper>
          <InfoContent>
            <InfoTitle>London Eye London</InfoTitle>
            <InfoDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </InfoDescription>
          </InfoContent>
        </InfoCard>
      </InfoCardsWrapper>
      <IndexExtensionThree />
    </>
  );
}