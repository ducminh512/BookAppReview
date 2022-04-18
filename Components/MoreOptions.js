import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import React, { useState } from 'react';

export function MoreOptions() {

    return (
        <View style={styles.container}>
            <Text>This is the more options screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        padding: 20
    }
})