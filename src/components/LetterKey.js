import React from "react";
import styled from "styled-components";
import { colors } from "./GlobalStyles";

const LetterKey = ({ alphabet, usedLetters, keyTrigger }) => {
  // render a button for each letter of the alphabet
  return alphabet.map((element) => {
    return (
      <Wrapper
        // if the letter is in usedLetters, disable it
        disabled={usedLetters.includes(element)}
        onClick={() => {
          keyTrigger(element);
        }}
      >
        {element}
      </Wrapper>
    );
  });
};

const Wrapper = styled.button`
  background: ${colors.green};
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 32px;
  transition: all linear 400ms;

  &:hover {
    background: ${colors.fuchsia};
  }

  &:disabled,
  &:hover:disabled {
    background: #707070;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export default LetterKey;
