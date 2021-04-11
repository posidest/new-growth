import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './Animation.css'
// import './styles.css';

function Animation() {
  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageNum, setMessageNum] = useState(0)
  const messages = ["new growth is a place to track your plants' growth!", 'discover plants and care information', 'compare notes with other gardeners!']
  const history = useHistory()
  const getStarted = (e) => {
    history.push('/sign-up')
  }

  const next = (e) => {
  setMessageNum(messageNum + 1) 
  }

  return (
    <Container>
      {showButton && (
        <Button
          onClick={() => setShowMessage(true)}
          size="lg"
        >
          what is new growth?
        </Button>
      )}
      <CSSTransition
        in={showMessage}
        timeout={500}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <Alert
          variant="primary"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          <p className='message'>
            {messages[messageNum]}
          </p>
          {messageNum < 3 && (
          <Button onClick={next}>
            tell me more!
          </Button>
          )}
          <Button onClick={getStarted}>
            get started!
          </Button>
         </Alert>
      </CSSTransition>
    </Container>
  );
}

export default Animation;

