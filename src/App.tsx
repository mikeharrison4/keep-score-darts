import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { GlobalStyle } from './globalStyles';
import GameConfiguration from './components/GameConfiguration';
import Scoreboard from './components/Scoreboard';

export type Config = {
  gameStarted: boolean;
  players: Array<string>;
  scoreOption: number;
};

const Container = styled.div({
  maxWidth: '1000px',
  color: 'white',
});

const MainHeading = styled.h1({
  color: 'white',
  padding: '1.2rem',
  borderBottom: '4px solid',
});

const CONFIG_LOCAL_STORAGE_KEY = 'keep-score-darts-config';
const INITIAL_CONFIG_STATE = {
  gameStarted: false,
  players: [],
  scoreOption: 301,
};

function App() {
  function getConfig(): Config {
    const gameData: Config = getDataFromStorage();

    if (Object.keys(gameData).length) {
      return gameData;
    } else {
      return INITIAL_CONFIG_STATE;
    }
  }

  const [config, setConfig] = useState<Config>(getConfig());

  function handleStartGame() {
    const gameConfig: Config = {
      gameStarted: true,
      players: config.players,
      scoreOption: config.scoreOption,
    };

    setConfig(gameConfig);

    localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(gameConfig));
  }

  function getDataFromStorage(): Config {
    const storedData = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY) || '{}';

    return JSON.parse(storedData);
  }

  function handleAddPlayer(player: string) {
    setConfig((prevState) => {
      return {
        ...prevState,
        players: [...prevState.players, player],
      };
    });
  }

  function handleSetScoreOption(score: number) {
    setConfig((prevState) => {
      return {
        ...prevState,
        scoreOption: score,
      };
    });
  }

  function clearGame() {
    setConfig(INITIAL_CONFIG_STATE);

    localStorage.removeItem(CONFIG_LOCAL_STORAGE_KEY);
  }

  return (
    <Container>
      <GlobalStyle />

      <MainHeading>KeepScore Darts 🎯</MainHeading>
      {config.gameStarted ? (
        <>
          <Scoreboard config={config} />
          <button onClick={clearGame}>Clear game</button>
        </>
      ) : (
        <>
          <GameConfiguration
            onAddPlayer={handleAddPlayer}
            players={config.players}
            setScoreOption={handleSetScoreOption}
            scoreOption={config.scoreOption}
          />
          {config.players.length > 0 && (
            <button onClick={handleStartGame}>Start</button>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
