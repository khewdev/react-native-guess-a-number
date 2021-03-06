import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        //the regex is replacing anything not from 0 - 9 to empty string
        // setEnteredValue(inputText.replace(/[^0-9]/g), '');
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }

        setConfirmed(true);
        setEnteredValue('');
        //setSelectedNumber can still access enteredValue after setEnteredValue(''); because setEnteredValue(''); will be queue and will only be processed the next time the component is rendered
        //it mean setSelectedNumber still can access enteredValue in this moment
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();

        //setConfirmed(true); setEnteredValue(''); setSelectedNumber(chosenNumber); will be batch in one render cycle
    };
    let confirmedOuptut;

    if (confirmed) {
        confirmedOuptut = (
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>

                <MainButton
                    onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (

        //when touch outside of keyboard will dismiss the keyboard
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Reset"
                                color={Colors.accent}
                                onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Confirm"
                                onPress={confirmInputHandler}
                                color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOuptut}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'OpenSans-Bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        fontFamily: 'open-sans'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;