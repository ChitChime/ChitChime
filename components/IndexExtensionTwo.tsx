import styled from "styled-components";
import colors from "../styles/colors";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: auto;
  background-color: ${colors.text};
  padding: 50px 150px;
  font-family: 'Kodchasan', sans-serif;
  margin-bottom: 200px;

  .scroll-element {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(
    330deg,
    ${colors.cardPrimary},
    ${colors.cardSecondary},
    ${colors.dividerPrimary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const Leaderboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;

const LeaderboardButtonWrapper = styled.div`
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* انیمیشن زوم */
  border-radius: 15px;

  &:hover {
    transform: scale(1.05); /* زوم کمتر هنگام هاور */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* سایه بیشتر */
  }
`;

const LeaderboardButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 15px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Kodchasan', sans-serif;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Username = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.backgroundTop};
  font-family: 'Kodchasan', sans-serif;
`;

const Stats = styled.span`
  font-size: 0.9rem;
  color: ${colors.dividerPrimary};
  font-family: 'Kodchasan', sans-serif;
  margin-top: 2px;
`;

const StyledAllClubsButton = styled.button`
  padding: 0 5px 0 0;
  margin-top: auto;
  border: none;
  border-radius: 200px;
  font-size: 1rem;
  cursor: pointer;
  color: #0E1039;
  background: #FDFDFF;
  transition: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Kodchasan', sans-serif;
  grid-column: 3;
  justify-self: end;

  &:hover svg {
    margin-left: 0px;
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
    transition: margin-left 0.3s ease;
  }
`;

export default function TopCollections() {
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

  const leaderboardData = [
    { avatar: "/index-images/circle-1.png", username: "Bali Showcase", stats: "+12%" },
    { avatar: "/index-images/circle-1.png", username: "Dream Reflections", stats: "+8%" },
    { avatar: "/index-images/circle-1.png", username: "Caribbean Wonders", stats: "+15%" },
    { avatar: "/index-images/circle-1.png", username: "Emerald Essence", stats: "+9%" },
    { avatar: "/index-images/circle-1.png", username: "Bronze Delights", stats: "+7%" },
    { avatar: "/index-images/circle-1.png", username: "Island Radiance", stats: "+10%" },
    { avatar: "/index-images/circle-1.png", username: "Silver Serenity", stats: "+14%" },
    { avatar: "/index-images/circle-1.png", username: "Golden Glow", stats: "+13%" },
    null,
  ];

  return (
    <Container>
      <Header>
        <Title className="scroll-element">Active Clubs</Title>
      </Header>
      <Leaderboard>
        {leaderboardData.map((item, index) => (
          item ? (
            <LeaderboardButtonWrapper key={index}>
              <LeaderboardButton className="scroll-element">
                <Avatar src={item.avatar} alt={item.username} />
                <Info>
                  <Username>{item.username}</Username>
                  <Stats>{item.stats}</Stats>
                </Info>
              </LeaderboardButton>
            </LeaderboardButtonWrapper>
          ) : (
            <StyledAllClubsButton key={index} className="scroll-element">
              All Clubs
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </StyledAllClubsButton>
          )
        ))}
      </Leaderboard>
    </Container>
  );
}
