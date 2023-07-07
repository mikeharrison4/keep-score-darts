import React, { useState } from 'react';
import styled from 'styled-components/macro';

import type { Config } from '../App';

type ScoreboardProps = {
  config: Config;
};

type ScoreboardType = Array<{
  player: string;
  score: number;
}>;

const Container = styled.div({
  maxWidth: '75%',
  margin: '20px auto',
  padding: '12px',
});

const PlayerContainer = styled.div<{ active: boolean }>(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px  solid lightgray',

  ...(active && {
    background: 'red',
  }),
}));

const PlayerHeading = styled.h4({
  textTransform: 'uppercase',
  fontSize: '2rem',
  padding: '20px 0',
  letterSpacing: '3px',
});

const PlayerScore = styled.div({
  letterSpacing: '5px',
});

function Scoreboard({ config: { players, scoreOption } }: ScoreboardProps) {
  const [scoreboard, setScoreboard] = useState<ScoreboardType>(
    players.map((player) => ({
      player,
      score: scoreOption,
    })),
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  return (
    <Container>
      {scoreboard.map(({ player, score }, index) => (
        <PlayerContainer key={player} active={currentPlayerIndex === index}>
          <PlayerHeading>{player}</PlayerHeading>
          <PlayerScore>{score}</PlayerScore>
        </PlayerContainer>
      ))}
    </Container>
  );
}

export default Scoreboard;
