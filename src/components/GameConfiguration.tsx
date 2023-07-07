import React, { useState } from 'react';
import styled from 'styled-components/macro';

type PlayerConfigurationProps = {
  onAddPlayer: (player: string) => void;
  players: Array<string>;
  setScoreOption: (score: number) => void;
  scoreOption: number;
};

const Container = styled.div({
  margin: '1.2rem 0',
});

const EnterNamesHeading = styled.h4({
  color: 'white',
  marginBottom: '1.2rem',
});

const ConfigContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const ScoreOptions = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ScoreOption = styled.div({
  display: 'flex',
});

const RadioInput = styled.input({});

const Input = styled.input({
  marginBottom: '0.6rem',
  padding: '6px',
});

const PlayerList = styled.ul({
  listStyle: 'none',
  marginTop: '1.2rem',
  color: 'white',
});

const scoreOptions: Array<number> = [301, 401, 501];

function GameConfiguration({
  onAddPlayer,
  players,
  setScoreOption,
  scoreOption,
}: PlayerConfigurationProps) {
  const [name, setName] = useState('');

  function handleAddPlayer(name: string) {
    onAddPlayer(name);
    setName('');
  }

  return (
    <Container>
      <EnterNamesHeading>Enter players names below:</EnterNamesHeading>
      <ConfigContainer>
        <div>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter name here"
          />
          <button
            onClick={() => handleAddPlayer(name)}
            disabled={name.length === 0}
          >
            Add player
          </button>
        </div>
        <ScoreOptions>
          {scoreOptions.map((option) => (
            <ScoreOption key={option}>
              <RadioInput
                type="radio"
                id={option.toString()}
                checked={scoreOption === option}
                value={option}
                onChange={() => setScoreOption(option)}
              />
              <label htmlFor={option.toString()}>{option}</label>
            </ScoreOption>
          ))}
        </ScoreOptions>
      </ConfigContainer>
      {players.length > 0 && (
        <PlayerList>
          {players.map((player, index) => (
            <li key={`${player}-${index}`}>{player}</li>
          ))}
        </PlayerList>
      )}
    </Container>
  );
}

export default GameConfiguration;
