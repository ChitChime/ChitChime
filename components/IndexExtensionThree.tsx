import styled from "styled-components";
import colors from "../styles/colors";
import Image from 'next/image'; // Import Next.js Image component

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.text};
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const CenteredImage = styled(Image)` // Update to use Image component
  max-width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Ensure the footer spans the full width */
  padding: 20px 0px 50px 0px; /* Add padding to the top and sides */
  background-color: ${colors.backgroundTop};
`;

const FooterText = styled.span`
  font-size: 1.5rem; /* Updated font size */
  font-weight: bold;
  color: ${colors.text};
  font-family: 'Kodchasan', sans-serif;
  margin-left: 50px; /* Add margin to the left */

  @media (max-width: 400px) {
    font-size: 1.2rem; /* Updated font size for small screens */
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px; /* Updated gap */
  margin-right: 50px; /* Add margin to the right */

  @media (max-width: 400px) {
    gap: 5px; /* Updated gap for small screens */
  }

  img {
    width: 30px; /* Increased icon size */
    height: 30px; /* Increased icon size */
    cursor: pointer;
    transition: transform 0.2s ease;
    filter: invert(1); /* Invert colors to match text color */

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default function CenteredImageWithFooter() {
  return (
    <PageContainer>
      <CenteredImage src="/index-images/footer-pic.png" alt="Centered Footer Image" width={500} height={300} />
      <Footer>
        <FooterText>ChitChime</FooterText>
        <SocialIcons>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image src="/index-images/instagram.png" alt="Instagram" width={30} height={30} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Image src="/index-images/linkedin.png" alt="LinkedIn" width={30} height={30} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Image src="/index-images/youtube.png" alt="YouTube" width={30} height={30} />
          </a>
        </SocialIcons>
      </Footer>
    </PageContainer>
  );
}
