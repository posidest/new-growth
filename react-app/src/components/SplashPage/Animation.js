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
  const messages = ["New Growth is a place to track your plants' growth!", 'Discover plants and care information', 'Compare notes with your friends!']
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
        {/* {messages.map((message) => ( */}
        <Alert
          variant="primary"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          {/* <Alert.Heading>
            Animated alert message
          </Alert.Heading> */}
          <p>
            {messages[messageNum]}
          </p>
          {messageNum < 3 && (
          <Button onClick={next}>
            Tell me more!
          </Button>
          )}
          <Button onClick={getStarted}>
            Get Started!
          </Button>
        </Alert>

        {/* ))} */}

      </CSSTransition>
    </Container>
  );
}

export default Animation;

