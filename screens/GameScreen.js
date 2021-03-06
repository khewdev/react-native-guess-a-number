import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-ionicons';


import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>
            #{numOfRound}
        </BodyText>

        <BodyText>
            {value}
        </BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //object destructuring
    //pulling userChoice, onGameOver out from props
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Icon name="md-remove" size={24} color="white" /></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}><Icon name="md-add" size={24} color="white" /></MainButton>
            </Card>

            <View style={styles.list}>
                {/* dont style directly on ScrollView but create a View component and style in instead, also dont style on the list item because it won't work for the width: '80%' */}
                {/* ScrollView nested in View is not working in Android if styles.list didn't set flex: 1, but it is working in iOS even flex: 1 is not set by default */}
                <ScrollView>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1, //if you dont set border width you wont see any border
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row', //default view box direction in react native is column( top to bottom ), to let numOfRounds and pastGuesses sit side by side, we have to set flexDirection to 'row' manually
        justifyContent: 'space-between'
    },
    list: {
        flex: 1,
        width: '80%'
    }
});


export default GameScreen;
