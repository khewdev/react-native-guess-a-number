import React from 'react';
import { View, StyleSheet } from 'react-native';

//props.children is a special prop in React\
//basically the content you passed in between the opening and closing tags
const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        //shadow properties here only works on ios
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        //elevation only for android
        elevation: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
});

export default Card;
