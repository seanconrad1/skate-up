import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import BannerAds from './BannerAds'
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import { terms } from '../data/skate-up-terms.json';
import { styles } from './style'
const countdown = 10;

const getRemainingTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time - (min * 60);
  return { min, sec };
}

export default function Game() {

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

  const [remainingSec, setRemainingSec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { min, sec } = getRemainingTime(remainingSec);
  const [gamma, setGamma] = useState(0);
  const [gameState, setGameState] = useState(3);
  const [gameMsg, setMsg] = useState();
  const [index, setIndex] = useState(0);
  const [stater, setStater] = useState(0);
  const [playedWords, setPlayedWords] = useState([{ name: 'Brooklyn banks', status: 'correct' }, { name: 'Tony Hawk', statu: 'pass' }, { name: 'Kickflip', status: 'correct' }]);



  // Checks motion every 50ms
  // DeviceMotion.setUpdateInterval(50);
  DeviceMotion.setUpdateInterval(50);


  const randomTerm = terms[Math.floor(Math.random() * terms.length)];

  //   gameMsg Airwalk Shoes
  //   index 4
  //   gameState 2
  //   stater 1
  //   correctWords 1
  //   passedWords 0 
  //   remainingSec 10


  // log all state


  // Handles the game state/gyro state
  useEffect(() => {
    if (gameState === 1) {
      setMsg(randomTerm);
      setGameState(2);
    }
    if (gameState === 2) {
      setRemainingSec(countdown);
      DeviceMotion.addListener(({ rotation }) => {
        const gamma_t = Math.abs(rotation.gamma);
        setGamma(gamma_t);

        // range to win  > 2.7
        // range to pass < .5

        // range on rest >.5 && < 2.7

        // Winning spot
        if ((stater !== 1) && (gamma_t > 2.7)) {
          // Move down up to get it correct
          setStater(1);
        }
        // Passing spot
        else if ((stater !== 2) && (gamma_t < .5)) {
          // console.log('UP?');
          // Move phone up to pass
          setStater(2);
        }

      });
    }
    else if (gameState === 3) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      DeviceMotion.removeAllListeners();
    }
  }, [gameState]);

  // Handles the clock and flow of the game
  useEffect(() => {
    let interval = null;
    if ((isActive) && (remainingSec > 0)) {
      interval = setInterval(() => {
        setRemainingSec(remainingSec => remainingSec - 1);
      }, 1000
      );

    }
    else if ((isActive) && (remainingSec <= 0)) {
      if (gameState === 1) {
        setGameState(2);
      }
      else if (gameState === 2) {
        setGameState(3);
      }
      clearInterval(interval);
    }
    else if (!isActive && remainingSec !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSec]);

  // Handles what to render
  useEffect(() => {
    // Renders the terms

    // Renders when you get it right
    if (stater === 1) {
      setMsg("Correct!");

      setPlayedWords([...playedWords, { randomTerm, status: 'correct' }])
      // If we reached the end of the list (won't happen lol)
      if (index >= terms.length - 1) {
        setIndex(0);
      }
      // Otherwise, we just move to the next term
      else {
        setIndex(index => index + 1);
        setTimeout(() => {
          setStater(0)
          setMsg(randomTerm);
        }, 2000);
      }
    }
    // Renders when you pass
    else if (stater == 2) {

      setMsg("Pass!");

      setPlayedWords([...playedWords, { randomTerm, status: 'pass' }])
      // If we reached the end of the list (won't happen lol)
      if (index >= terms.length - 1) {
        setIndex(0);
      }
      // Otherwise, we just move to the next term
      else {
        setIndex(index => index + 1);
        setTimeout(() => {
          setStater(0)
          setMsg(randomTerm);
        }, 2000);
      }
    }
  }, [stater])

  const restartGame = () => {
    setGameState(1);
    setIsActive(true);
    setPlayedWords([])
  }
  const startGame = () => {
    setGameState(1);
    setRemainingSec(60);
    setIsActive(true);
  }
  const goHome = () => [
    setGameState(0),
    setIsActive(false),
    setRemainingSec(0),
    setPlayedWords([]),
  ]

  return (
    <View style={[styles.container, stater === 1 ? styles.correct : stater === 2 ? styles.pass : '']}>

      {gameState === 0 ? (
        <View style={styles.startScreen}>
          <Text style={styles.title}>Skate Up!</Text>
          <TouchableOpacity style={styles.startGameButton} onPress={() => startGame()}>
            <Text style={styles.buttonText}>Start game</Text>
          </TouchableOpacity>
          <BannerAds />
        </View>
      ) : null}
      {gameState === 1 ? (
        <Text>"Get Ready!"</Text>
      ) : null}
      {gameState === 2 ? (
        <Fragment>
          <Text style={styles.textTimer}>
            {`${sec}`}
          </Text>
          <Text style={styles.text}>{gameMsg}</Text>
        </Fragment>
      ) : null}
      {gameState === 3 ? (
        <SafeAreaView style={styles.endScreen}>
          <Text style={styles.gameOverText}>
            {"You got " + playedWords.filter(i => i.status === 'correct').length + " correct!"}
          </Text>
          <ScrollView style={styles.endScreenScrollList}>
            {playedWords.map((word, index) => {
              return <Text style={[styles.scrollItem, word.status === 'correct' ? styles.scrollItemCorrect : styles.scrollItemPass]} key={index}>{word.name}</Text>
            })}
          </ScrollView>
          <TouchableOpacity style={styles.startGameButton} onPress={() => restartGame()}>
            <Text style={styles.buttonText}>Restart game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startGameButton} onPress={() => goHome()}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        null
      )
      }
    </View >
  );
}
