import styled from "styled-components";
import colors from "../styles/colors";
import React, { useState, useEffect } from "react";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 50px;
  padding-top: 0;
  background-color: ${colors.text};

  @media (max-width: 768px) {
    padding: 20px;
    gap: 10px;
  }
`;

const Card = styled.div`
  background: ${colors.text};
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  width: auto;
  height: 200px;
  position: relative;
  margin: 10px;
  border-radius: 23px;
  background-image: url('/index-images/Background.png');
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 150px;
    margin: 5px;
  }
`;

const CardContent = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CardTag = styled.span`
  display: inline-block;
  background: ${colors.cardPrimary};
  color: white;
  padding: 5px 10px;
  border-radius: 100px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  position: absolute;
  top: 10px;
  left: 10px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
  color: ${colors.backgroundTop};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardSubtitle = styled.span`
  font-size: 0.7rem;
  color: ${colors.backgroundBottom};
  display: block;
  margin-bottom: 5px;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${colors.backgroundBottom};

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.text};
  padding: 55px;
  gap: 15px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Button = styled.button`
  background: #242275;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 100px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1d1c5d;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.75rem;
  }
`;

const BottomButton = styled.button`
  background: ${colors.cardPrimary};
  color: white;
  padding: 20px 40px;
  border: none;
  border-radius: 100px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: darken(${colors.cardPrimary}, 10%);
  }

  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1rem;
  }
`;

const ButtonLabel = styled.div`
  font-size: 1rem;
  color: ${colors.backgroundBottom};
  align-self: center;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.text};
  padding: 30px 0 250px 0;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 20px 0 100px 0;
  }
`;

const UpdatesDropdownContainer = styled.div`
  display: none;
  position: relative;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 900px) {
    display: none;
  }

  input {
    display: none;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* کل عرض صفحه */
    background: #ecf0f1;
    padding: 15px 0;
  }

  label,
  ul li {
    display: block;
    width: 200px;
    background: #242275;
    padding: 15px 20px;
    margin: 0;
    text-align: left;
    transition: all 0.3s ease;
    color: white;
  }

  label:hover,
  ul li:hover {
    background: #1d1c5d;
    color: #fff;
    cursor: pointer;
  }

  label {
    color: #1abc9c;
    border-left: 4px solid #1abc9c;
    border-radius: 0 5px 0 0;
    position: relative;
    z-index: 2;
    font-weight: bold;
  }

  ul {
    position: relative;
    visibility: hidden;
    opacity: 0;
    top: -20px;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 1;
    transition: all 0.3s ease;
  }

  input:checked + label {
    background: #1abc9c;
    color: #fff;
  }
  input:checked ~ ul {
    visibility: visible;
    opacity: 1;
    top: 0;
  }

  .float-right {
    float: right;
  }
`;

function UpdatesDropdown() {
  return (
    <UpdatesDropdownContainer>
      <input id="toggle-updates" type="checkbox" />
      <div>
        <label htmlFor="toggle-updates">
          Category
          <i className="fa fa-list float-right" />
        </label>
      </div>
      <ul>
        <li>
          Update 1
          <i className="fa fa-code float-right" />
        </li>
        <li>
          Update 2
          <i className="fa fa-code float-right" />
        </li>
        <li>
          Update 3
          <i className="fa fa-code float-right" />
        </li>
        <li>
          Update 4
          <i className="fa fa-code float-right" />
        </li>
        <li>
          Update 5
          <i className="fa fa-code float-right" />
        </li>
        <li>
          Update 6
          <i className="fa fa-code float-right" />
        </li>
      </ul>
    </UpdatesDropdownContainer>
  );
}

const courses = [
  {
    title: "Mastering CSS Grid Layouts: A Comprehensive Guide",
    image: "/images/css-grid.jpg",
    tag: "Updated",
    description: "Explore the fundamentals of CSS grid for modern layouts."
  },
  {
    title: "The Art of Website Typography: Best Practices and Tips",
    image: "/images/typography.jpg",
    tag: "Updated",
    description: "Discover the power of typography in web design."
  },
  {
    title: "Optimizing Website Performance for Lightning-Fast Loading Times",
    image: "/images/performance.jpg",
    tag: "Updated",
    description: "Learn top techniques to speed up your website."
  },
  {
    title: "The Role of Color in Web Design: Impact and Emotion",
    image: "/images/color-design.jpg",
    tag: "Updated",
    description: "Explore how color influences user perception and emotion."
  },
  {
    title: "UX/UI Design: Creating Intuitive and Engaging User Experiences",
    image: "/images/ui-design.jpg",
    tag: "Updated",
    description: "Gain insights into principles of UI/UX design."
  },
  {
    title: "Responsive Web Design: Designing for All Devices",
    image: "/images/responsive.jpg",
    tag: "Updated",
    description: "Master the essentials of responsive web design."
  },
  {
    title: "JavaScript Essentials: From Basics to Advanced",
    image: "/images/javascript.jpg",
    tag: "New",
    description: "Learn JavaScript from the ground up."
  },
  {
    title: "Advanced React Patterns: Building Scalable Apps",
    image: "/images/react.jpg",
    tag: "New",
    description: "Explore advanced patterns in React development."
  },
  {
    title: "Node.js and Express: Building Backend APIs",
    image: "/images/nodejs.jpg",
    tag: "New",
    description: "Create robust backend APIs with Node.js and Express."
  }
];

export default function CourseCards() {
  const [displayedCourses, setDisplayedCourses] = useState(courses);

  useEffect(() => {
    const updateDisplayedCourses = () => {
      if (window.innerWidth <= 1039) {
        setDisplayedCourses(courses.slice(0, 8)); // نمایش 8 کارت
      } else {
        setDisplayedCourses(courses); // نمایش همه کارت‌ها
      }
    };

    updateDisplayedCourses(); // فراخوانی در ابتدا
    window.addEventListener("resize", updateDisplayedCourses); // اضافه کردن listener برای تغییر اندازه

    return () => window.removeEventListener("resize", updateDisplayedCourses); // پاک کردن listener
  }, []);

  return (
    <>
      <ButtonContainer>
        <ButtonLabel>Category</ButtonLabel>
        <Button>Update 1</Button>
        <Button>Update 2</Button>
        <Button>Update 3</Button>
        <Button>Update 4</Button>
        <Button>Update 5</Button>
        <Button>Update 6</Button>
      </ButtonContainer>

      <UpdatesDropdown />

      <CardContainer>
        {displayedCourses.map((course, index) => (
          <Card key={index}>
            <CardImage>
              <img 
                src="/index-images/Background.png" 
                alt="Background" 
                style={{ width: '100%', height: '100%', borderRadius: '23px', objectFit: 'cover' }} 
              />
              <CardTag>{course.tag}</CardTag>
            </CardImage>
            <CardContent>
              <CardSubtitle>Coming Soon</CardSubtitle>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
      <BottomButtonContainer>
        <BottomButton>Click to view clubs</BottomButton>
      </BottomButtonContainer>
    </>
  );
}
