import React, { useState } from 'react';
import styled from 'styled-components/macro';

import type { PlayerConfig } from '../App';
import ContinueGameModal from './ContinueGameModal';

const SCORE_VALUES = [
  [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
    50, 0,
  ],
];

type ScoreboardProps = {
  playersConfig: Array<PlayerConfig>;
  updatePlayersScore: (score: number) => void;
  nextPlayer: () => void;
  currentPlayerIndex: number;
  clearGame: () => void;
};

const Container = styled.div({
  maxWidth: '75%',
  margin: '20px auto',
  padding: '12px',
});

const PlayerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px  solid lightgray',
});

const PlayerName = styled.h4<{ active: boolean }>(({ active }) => ({
  textTransform: 'uppercase',
  fontSize: '2rem',
  padding: '20px 0',
  letterSpacing: '3px',
  fontWeight: 100,

  ...(active && {
    fontWeight: 'bold',
  }),
}));

const PlayerScore = styled.div({
  letterSpacing: '5px',
  padding: '8px',
});

const ScoreValues = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  width: '100%',
  gridGap: '1px',
  margin: '20px 0px',

  '> *': {
    cursor: 'pointer',
    height: '40px',
  },

  '> *:last-child': {
    gridColumn: 'span 2',
  },
});

const ScoreInputs = styled.div({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  width: '25%',
});

const Input = styled.div({
  background: 'white',
  padding: '4px 10px',
  margin: '4px',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '30px',
});

const BoostScoresAndUndo = styled.div({
  display: 'flex',

  '> *': {
    width: '100%',
    cursor: 'pointer',
  },
});

const BoostButton = styled.button({
  border: 'none',
});

const DoubleBtn = styled(BoostButton)<{ selected: boolean }>(
  ({ selected }) => ({
    background: 'orange',
    ...(selected && { border: '3px solid black' }),

    ':hover': {
      opacity: '.8',
    },
  }),
);

const TripleBtn = styled(BoostButton)<{ selected: boolean }>(
  ({ selected }) => ({
    background: 'orangered',
    ...(selected && { border: '3px solid black' }),

    ':hover': {
      opacity: '.8',
    },
  }),
);

const UndoBtn = styled(BoostButton)({
  background: 'red',

  ':hover': {
    opacity: '.8',
  },
});

function Scoreboard({
  playersConfig,
  updatePlayersScore,
  nextPlayer,
  currentPlayerIndex,
  clearGame,
}: ScoreboardProps) {
  const [throws, setThrows] = useState(3);
  const [scores, setScores] = useState<Array<number>>([0, 0, 0]);
  const [playerScorePerRound, setPlayerScorePerRound] = useState(0);
  const [isDouble, setIsDouble] = useState(false);
  const [isTriple, setIsTriple] = useState(false);

  function handleUndo() {
    const currentPlayerScore = playersConfig[currentPlayerIndex].score;
    const scoreIndex = 3 - throws - 1;

    setPlayerScorePerRound((prev) => prev - scores[scoreIndex]);
    const newScores = [...scores];
    newScores[scoreIndex] = 0;

    setScores(newScores);
    updatePlayersScore(
      currentPlayerScore - (currentPlayerScore + scores[scoreIndex]),
    );
    setThrows((prev) => prev + 1);
  }

  function handleClickScoreValue(value: number) {
    let updatedScore = value;

    if (isDouble) {
      setIsDouble(false);
      updatedScore = updatedScore * 2;
    }
    if (isTriple) {
      setIsTriple(false);
      updatedScore = updatedScore * 3;
    }

    setThrows((prev) => prev - 1);

    setScores((prev) => {
      prev[3 - throws] = updatedScore;
      return prev;
    });

    setPlayerScorePerRound((prev) => prev + updatedScore);
    updatePlayersScore(updatedScore);

    if (throws - 1 === 0) {
      setThrows(3);
      setScores([0, 0, 0]);
      setPlayerScorePerRound(0);
      nextPlayer();
    }
  }

  return (
    <>
      {/*{showContinueGamePopup && <ContinueGameModal clearGame={clearGame} />}*/}
      <Container>
        {playersConfig.map(({ player, score }, index) => (
          <PlayerContainer key={player}>
            <PlayerName active={currentPlayerIndex === index}>
              {player}
              {currentPlayerIndex === index ? ` ${'🎯'.repeat(throws)}` : ''}
            </PlayerName>
            <PlayerScore>{score}</PlayerScore>
          </PlayerContainer>
        ))}
        <ScoreValues>
          {SCORE_VALUES[0].map((value) => (
            <button
              key={value}
              value={value}
              onClick={() => handleClickScoreValue(value)}
            >
              {value}
            </button>
          ))}
          <BoostScoresAndUndo>
            <DoubleBtn onClick={() => setIsDouble(true)} selected={isDouble}>
              Double
            </DoubleBtn>
            <TripleBtn onClick={() => setIsTriple(true)} selected={isTriple}>
              Triple
            </TripleBtn>
            <UndoBtn onClick={handleUndo}>Undo</UndoBtn>
          </BoostScoresAndUndo>
        </ScoreValues>
        <ScoreInputs>
          {scores.map((score, index) => {
            return <Input key={index}>{score === 0 ? '' : score}</Input>;
          })}
        </ScoreInputs>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={clearGame}>Clear game</button>
          <div>{playerScorePerRound}</div>
        </div>
      </Container>
    </>
  );
}

export default Scoreboard;
