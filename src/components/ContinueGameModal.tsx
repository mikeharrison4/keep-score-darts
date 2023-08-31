import React, { useState } from 'react';
import styled from 'styled-components/macro';

type ContinueGameModalProps = {
  clearGame: () => void;
};

const Container = styled.div({
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: 'rgba(0, 0, 0, 0.75)',
});

const Modal = styled.div({
  background: 'oldlace',
  width: '50%',
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '12px',
  color: 'black',
});

const Heading = styled.h4({
  marginBottom: '12px',
});

const ButtonContainer = styled.div({
  display: 'flex',
  width: '25%',
  justifyContent: 'space-between',
});

function ContinueGameModal({ clearGame }: ContinueGameModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  if (!isModalOpen) {
    return null;
  }

  return (
    <Container>
      <Modal>
        <Heading>Do you want to continue the game?</Heading>
        <ButtonContainer>
          <button onClick={() => setIsModalOpen(false)}>Yes</button>
          <button onClick={clearGame}>No</button>
        </ButtonContainer>
      </Modal>
    </Container>
  );
}

export default ContinueGameModal;
