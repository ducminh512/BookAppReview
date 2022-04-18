import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import React, { useState } from 'react';

export function Discover() {

    return (
        <View style={styles.container}>
            <View style={{ padding: 50 }}>
                <Text style={{ color: 'white' }}>This is the discover screen</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginTop: 50,
        padding: 20,
        backgroundColor: '#121212',
        height: 800
    }
})