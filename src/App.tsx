import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import { GlobalStyle } from './globalStyles';
import GameConfiguration from './components/GameConfiguration';
import Scoreboard from './components/Scoreboard';

export type GameConfig = {
  gameStarted: boolean;
  playersConfig: Array<PlayerConfig>;
  currentPlayerIndex: number;
};

export type PlayerConfig = {
  score: number;
  player: string;
};

const Container = styled.div({
  maxWidth: '1000px',
  color: 'white',
  margin: 'auto',
});

const MainHeading = styled.h1({
  color: 'white',
  padding: '1.2rem',
  borderBottom: '4px solid',
});

const CONFIG_LOCAL_STORAGE_KEY = 'keep-score-darts-config';

function getDataFromStorage(): GameConfig {
  const storedData = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY) || '{}';

  return JSON.parse(storedData);
}

const storedData = getDataFromStorage();

function App() {
  const [gameStarted, setGameStarted] = useState(
    storedData.gameStarted || false,
  );
  const [playersConfig, setPlayersConfig] = useState<Array<PlayerConfig>>(
    storedData.playersConfig || [],
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(
    storedData.currentPlayerIndex || 0,
  );

  const [scoreOption, setScoreOption] = useState(301);
  const [players, setPlayers] = useState<Array<string>>([]);

  useEffect(() => {
    localStorage.setItem(
      CONFIG_LOCAL_STORAGE_KEY,
      JSON.stringify({ gameStarted, playersConfig, currentPlayerIndex }),
    );
  }, [gameStarted, playersConfig, currentPlayerIndex]);

  function handleStartGame() {
    setGameStarted(true);
    setPlayersConfig(
      players.map((player) => ({
        player,
        score: scoreOption,
      })),
    );
  }

  function updatePlayersScore(score: number) {
    setPlayersConfig((config) => {
      config[currentPlayerIndex].score -= score;
      return config;
    });
  }

  function handleAddPlayer(player: string) {
    setPlayers((prevState) => [...prevState, player]);
  }

  function handleSetScoreOption(score: number) {
    setScoreOption(score);
  }

  function nextPlayer() {
    setCurrentPlayerIndex((prev) => {
      const amountOfPlayers = playersConfig.length;
      if (currentPlayerIndex < amountOfPlayers - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  }

  function clearGame() {
    setGameStarted(false);
    setPlayers([]);
    setScoreOption(301);
    setCurrentPlayerIndex(0);
    localStorage.removeItem(CONFIG_LOCAL_STORAGE_KEY);
  }

  return (
    <Container>
      <GlobalStyle />

      <MainHeading>KeepScore Darts 🎯</MainHeading>
      {gameStarted ? (
        <Scoreboard
          playersConfig={playersConfig}
          updatePlayersScore={updatePlayersScore}
          nextPlayer={nextPlayer}
          currentPlayerIndex={currentPlayerIndex}
          clearGame={clearGame}
        />
      ) : (
        <>
          <GameConfiguration
            players={players}
            onAddPlayer={handleAddPlayer}
            setScoreOption={handleSetScoreOption}
            scoreOption={scoreOption}
          />
          {players.length > 0 && (
            <button onClick={handleStartGame}>Start</button>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
