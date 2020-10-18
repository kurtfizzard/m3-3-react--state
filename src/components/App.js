import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import words from "../data/words.json";

import { colors, contentWidth } from "./GlobalStyles";

// the initial game state
const initialGameState = {
  started: false,
  // add an extra key/value pair to alter the text of the button after the game starts
  paused: false,
  over: false,
  win: false,
};

const App = () => {
  const [game, setGame] = useState(initialGameState);
  // create a new state variable called word, by default it's an empty string
  const [word, setWord] = useState({ str: "" });
  // create a new state variable that collects the wrong guesses
  const [wrongGuesses, setWrongGuesses] = useState([]);
  // create a new state variable that collects the used letters
  const [usedLetters, setUsedLetters] = useState([]);

  // set game modifies game
  const handleStart = () => {
    // if the game hasn't started, start the game
    if (!game.started) {
      setGame({ ...game, started: !game.started });
      // if the game has started, pause the game
    } else {
      setGame({ ...game, paused: !game.paused });
    }
    // if there is not already a word, call getNewWord
    if (word.str === "") {
      getNewWord();
    }
  };

  // create a function that selects a random word within the array in words.json
  const getNewWord = () => {
    // create a variable that is a random word in the words.json array
    const randomWord = words[Math.floor(Math.random() * words.length)];
    // create an empty array
    const revealed = [];
    // push an empty string to the array for each letter in the randomWord
    for (let i = 0; i < randomWord.length; i++) {
      revealed.push("");
    }
    // set the state of word.str with the random word and create a second key, revealed, which is an array of empty strings equal to the randomWord's length
    setWord({ str: randomWord, revealed: revealed });
  };

  // create a function that handles the guesses
  const handleGuess = (ltr) => {
    // create a variable as a stand in so that we can modify usedLetters without modifying state
    let copy = [...usedLetters];
    // push the user selected letter to the stand in array
    copy.push(ltr);
    // call setUsedLetters to modify state and make usedLetters equal to the newly modified stand in
    setUsedLetters([...copy]);
    // if there are ten letters in the wrongGuesses array, end the game (lose)
    if (wrongGuesses.length === 10) {
      handleEndGame(false);
    }
    // if the user selected letter is not in the randomly selected word, add it to wrongGuesses
    if (word.str.includes(ltr) === false) {
      // create a variable as a stand in so that we can modify wrongGuesses without modifying state
      let dummy = [...wrongGuesses];
      // push the user selected letter to the stand in array
      dummy.push(ltr);
      // call setWrongGuesses to modify state and make wrongGuesses equal to the newly modified stand in
      setWrongGuesses([...dummy]);
      // if the user selected letter is in the randomly selected word, replace the empty character slot(s) with the letter
    } else {
      // convert the string to an array and carry out a function on each of them
      word.str.split("").forEach((element, index) => {
        // if any of elements in the string is equal to letter
        if (element === ltr) {
          // create a variable as a stand in so that we can modify word.revealed without modifying state
          let dummy = [...word.revealed];
          // let the empty string at [index] equal the element (which equals the user selected letter)
          dummy[index] = element;
          // call setWord to modify state and make word.revealed equal to the newly modified stand in
          setWord({ ...word, revealed: [...dummy] });
          if (word === word.revealed.toString()) {
            console.log(word.revealed.toString());
            handleEndGame(true);
          }
        }
      });
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("serert");
    getNewWord();
    setWrongGuesses([]);
    setUsedLetters([]);
    setGame({
      started: true,
      paused: false,
      over: false,
      win: false,
    });
  };

  const handleEndGame = (win) => {
    setGame({
      started: true,
      paused: false,
      over: true,
      win: { win },
    });
    alert(`Game Over! The word was ${word.str}! You ${win ? "win" : "lose"}!`);
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>
          {game.started ? (!game.paused ? "Pause" : "Continue") : "Start"}
        </Button>
        <Button onClickFunc={handleReset}>RESET</Button>
      </Nav>
      {/* if game is started, render the following components */}
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard usedLetters={usedLetters} keyTrigger={handleGuess} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
