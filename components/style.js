import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingLeft: 5,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  correct: {
    backgroundColor: 'darkgreen',
  },
  pass: {
    backgroundColor: 'darkred',
  },
  startScreen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },



  title: {
    fontSize: 100,
    margin: 5,
    color: "#fff",
    textAlign: "center"
  },

  startGameButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    margin: 10
  },

  buttonText: {
    fontSize: 10,
    color: '#fff'
  },

  text: {
    fontSize: 100,
    margin: 5,
    color: "#fff",
    textAlign: "center"
  },

  gameOverText: {
    fontSize: 50,
    margin: 5,
    color: "#fff",
    textAlign: "center"
  },

  endScreen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollItem: {
    fontSize: 40,
    textAlign: 'center'
  },
  scrollItemCorrect: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  },
  scrollItemPass: {
    color: 'grey',
    fontSize: 40,
    textAlign: 'center'
  },

  textTimer: {
    fontSize: 20,
    margin: 5,
    color: "#fff",
    textAlign: "center"
  },
  button: {
    borderWidth: 3,
    width: screen.height / 2,
    height: screen.height / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: screen.height / 2

  },
  buttonText: {
    fontSize: 30,
    color: '#fff'
  },
  titular: {
    fontSize: 35,
    margin: 5,
    color: "#fff"
  }
});