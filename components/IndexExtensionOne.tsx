"use client";

import styled from "styled-components";
import colors from "../styles/colors";
import { useEffect } from "react";

const SpotlightWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.text};
  padding: 100px 150px;
  font-family: 'Kodchasan', sans-serif;

  @media (max-width: 1300px) {
    padding: 100px 100px; /* Update padding */
  }

  @media (max-width: 1100px) {
    padding: 100px 60px; /* Add padding */
  }

  @media (max-width: 800px) {
    align-items: center; /* Center content */
    justify-content: center; /* Center content */
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 55%;

  @media (max-width: 1200px) {
    width: 50%; /* Update width */
  }

  @media (max-width: 1050px) {
    gap: 13px; /* Update gap */
  }

  @media (max-width: 1000px) {
    gap: 10px; /* Update gap */
  }

  @media (max-width: 800px) {
    display: none; /* Hide the main div containing the images */
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.dividerPrimary};
  width: 100%;
  aspect-ratio: 1;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: auto; /* تطبیق ارتفاع با عرض */
    border-radius: 15px;
    object-fit: cover;
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: brightness(0.5);

    @media (max-width: 1000px) {
      filter: none; /* Remove background color change */
    }
  }

  .text-wrapper {
    position: absolute;
    bottom: -45px;
    left: 0;
    right: 0;
    background-color: rgba(${parseInt(colors.backgroundBottom.slice(1, 3), 16)}, ${parseInt(colors.backgroundBottom.slice(3, 5), 16)}, ${parseInt(colors.backgroundBottom.slice(5, 7), 16)}, 0.85);
    padding: 15px 20px 10px 20px;
    text-align: left;
    transition: bottom 0.3s ease, background-color 0.3s ease;

    @media (max-width: 1000px) {
      transition: background-color 0.3s ease; /* Remove transform animation */
    }

    h3 {
      font-size: 1rem;
      margin: 0 0 15px 0;
      color: ${colors.text};

      @media (max-width: 1200px) {
        margin: 0 0 22px 0; /* Add margin */
      }

      @media (max-width: 1000px) {
        margin: 0 0 50px 0 !important; /* Update margin */
      }
    }

    p {
      font-size: 0.9rem;
      margin: 0;
      color: ${colors.text};
      transition: none; /* Remove animation */
    }
  }

  &:hover .text-wrapper {
    bottom: 0;
    background-color: rgba(${parseInt(colors.backgroundBottom.slice(1, 3), 16)}, ${parseInt(colors.backgroundBottom.slice(3, 5), 16)}, ${parseInt(colors.backgroundBottom.slice(5, 7), 16)}, 0.95);

    @media (max-width: 1000px) {
      bottom: -45px; /* Keep background position */
    }
  }

  @media (max-width: 1200px) {
    h3 {
      font-size: 0.9rem; /* Update font size */
    }

    p {
      font-size: 0.8rem; /* Update font size */
    }
    .text-wrapper h3 {
      font-size: 0.9rem; /* Update font size */
      margin: 0 0 22px 0; /* Add margin */
    }

    .text-wrapper p {
      font-size: 0.7rem; /* Update font size */
    }
  }

  @media (max-width: 1000px) {
    .text-wrapper p {
      display: none; /* Remove paragraph */
    }
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
  color: ${colors.text};

  h2, p, button {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    font-size: 4rem;
    line-height: 1.2;
    margin-bottom: 15px;
    padding-bottom: 5px;
    background: linear-gradient(
      330deg,
      ${colors.cardPrimary},
      ${colors.cardSecondary},
      ${colors.dividerPrimary}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
    color: ${colors.cardPrimary};
  }

  button {
    padding: 20px 30px;
    font-size: 1rem;
    color: ${colors.backgroundBottom};
    background-color: transparent;
    border: 2px solid transparent;
    border-radius: 100px;
    cursor: pointer;
    background-image: linear-gradient(
      ${colors.text}, 
      ${colors.text}
    ), linear-gradient(
      330deg,
      ${colors.cardPrimary},
      ${colors.cardSecondary},
      ${colors.dividerPrimary}
    );
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: background-color 0.3s ease, background-image 0.3s ease, transform 0.3s ease, color 0.3s ease;
    font-family: 'Kodchasan', sans-serif; /* Add font family */

    &:hover {
      background-image: linear-gradient(
        330deg,
        ${colors.cardPrimary},
        ${colors.cardSecondary},
        ${colors.dividerPrimary}
      ), linear-gradient(
        330deg,
        ${colors.cardPrimary},
        ${colors.cardSecondary},
        ${colors.dividerPrimary}
      );
      color: ${colors.text};
      transform: scale(1.05);
    }
  }

  @media (max-width: 1200px) {
    width: 45%; /* Update width */

    h2 {
      margin-top: 0; /* Update margin */
    }

    button {
      font-size: 0.9rem; /* Update font size */
    }
  }

  @media (max-width: 1000px) {
    h2 {
      font-size: 3rem; /* Update font size */
    }

    p {
      font-size: 0.9rem; /* Update font size */
      margin-top: 0px; /* Add margin-top */
    }

    button {
      font-size: 0.8rem; /* Update font size */
    }
  }

  @media (max-width: 900px) {
    h2 {
      font-size: 2.5rem; /* Update font size */
    }

    p {
      font-size: 0.8rem; /* Update font size */
    }

    button {
      padding: 15px 25px; /* Update padding */
    }
  }

  @media (max-width: 800px) {
    align-items: center; /* Center align items */
    width: 100%; /* Update width */

    h2, p, button {
      text-align: center; /* Center text */
    }

    h2 {
      font-size: 4rem; /* Update font size */
    }

    p {
      font-size: 1rem; /* Update font size */
      margin-top: 20px; /* Update margin-top */
    }

    button {
      font-size: 1rem; /* Update font size */
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 3rem; /* Update font size */
    }

    p {
      font-size: 0.9rem; /* Update font size */
      margin-top: 10px; /* Update margin-top */
    }

    button {
      font-size: 0.9rem; /* Update font size */
    }
  }
`;

export default function SpotlightSection() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-element");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight * 0.75) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SpotlightWrapper>
      <CardGrid>
        <Card>
          <img src="/index-images/square-1.png" alt="Evil Dino" />
          <div className="text-wrapper">
            <h3>Evil Dino</h3>
            <p>A ferocious dinosaur ready to take on the world!</p>
          </div>
        </Card>
        <Card>
          <img src="/index-images/square-6.png" alt="Sweet Monkey" />
          <div className="text-wrapper">
            <h3>Sweet Monkey</h3>
            <p>A cheerful monkey spreading joy and laughter.</p>
          </div>
        </Card>
        <Card>
          <img src="/index-images/square-2.png" alt="Bad King Boy" />
          <div className="text-wrapper">
            <h3>Bad King Boy</h3>
            <p>A mischievous character ruling with charm and wit.</p>
          </div>
        </Card>
        <Card>
          <img src="/index-images/square-9.png" alt="Gin Gang" />
          <div className="text-wrapper">
            <h3>Gin Gang</h3>
            <p>An adventurous spirit exploring uncharted territories.</p>
          </div>
        </Card>
      </CardGrid>
      <DescriptionWrapper>
        <h2 className="scroll-element">Spotlight. Projects you'll love</h2>
        <p className="scroll-element">
          Buy, sell, and discover amazing new collections and creators.
        </p>
        <button className="scroll-element">Explore all Collections</button>
      </DescriptionWrapper>
    </SpotlightWrapper>
  );
}
