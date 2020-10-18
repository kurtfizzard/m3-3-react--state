import React from "react";
import styled from "styled-components";

const TheWord = ({ word }) => {
  console.log(word);

  // render empty characters, unless the letter has been guessed, in which case, render the letter
  return (
    <Wrapper>
      {word.revealed.map((element) => {
        return <Letter>{element ? element : "_"}</Letter>;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

const Letter = styled.span`
  margin: 5px;
`;

export default TheWord;
