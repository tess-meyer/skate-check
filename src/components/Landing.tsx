// src/components/LandingPage.tsx

import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { ExoFontStyles } from './ExoFontStyles';

const LandingPageContainer = styled.div`
  ${ExoFontStyles}
  background: url('https://www.surfertoday.com/images/skatepark-map.jpg') center no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    background: url('https://i.pinimg.com/564x/b3/c2/da/b3c2da62c5509d54aebdbbd757e9c4f6.jpg') center no-repeat;
    background-size: cover;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 90%;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

function LandingPage() {
  const [city, setCity] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleButtonClick = () => {
    console.log(`Let's go to ${city} for skating!`);
  };

  return (
    <LandingPageContainer>
      <Overlay>
        <Title>CHECK SKATE REPORT</Title>
        <Input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={handleInputChange}
        />
        <Button onClick={handleButtonClick}>Let's Go! 🤙</Button>
      </Overlay>
    </LandingPageContainer>
  );
}

export default LandingPage;
