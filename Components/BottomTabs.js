import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserScreen } from './UserScreen';
import { MyBooks } from './MyBooks';
import { Discover } from './Discover';
import { Icon } from 'react-native-elements';
import { Settings } from './Settings';

export function BottomTabs() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#121212', borderTopColor: 'black' } ,
                tabBarInactiveTintColor: 'white',
                tabBarActiveTintColor: 'teal'
            }}
        >
            <Tab.Screen name="Home" component={UserScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name='home' color={color} />
                ),
                headerShown: false
            }} />
            <Tab.Screen name="My Books" component={MyBooks} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name='bookmark' color={color} />
                ),
                headerShown: false
            }} />
            <Tab.Screen name="Discover" component={Discover} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name='search' color={color} />
                ),
                headerShown: false
            }} />
            <Tab.Screen name="You" component={Settings} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name='person' color={color} />
                ),
                headerShown: false
            }} />
        </Tab.Navigator>
    )
}