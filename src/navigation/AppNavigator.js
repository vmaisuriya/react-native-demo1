import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';

// Screens
import MenuScreen from '../screens/MenuScreen';
import StatsScreen from '../screens/StatsScreen';
import ScanScreen from '../screens/ScanScreen';
import MyBatchesScreen from '../screens/MyBatchesScreen';
import AllBatchesScreen from '../screens/AllBatchesScreen';
import BatchDetailsScreen from '../screens/BatchDetailsScreen';
import OrderPickingScreen from '../screens/OrderPickingScreen';
import ExceptionsScreen from '../screens/ExceptionsScreen';
import BoxDetailsScreen from '../screens/BoxDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.white },
                headerTintColor: theme.colors.gray[800],
                headerTitleStyle: { fontWeight: 'bold' },
                headerBackTitleVisible: false,
                contentStyle: { backgroundColor: theme.colors.gray[50] }
            }}
        >
            <Stack.Screen 
                name="Menu" 
                component={MenuScreen} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="Scan" 
                component={ScanScreen} 
                options={{ title: 'Scan to Claim' }} 
            />
            <Stack.Screen 
                name="MyBatches" 
                component={MyBatchesScreen} 
                options={{ title: 'My Active Batch' }} 
            />
            <Stack.Screen 
                name="AllBatches" 
                component={AllBatchesScreen} 
                options={{ title: 'All Batches' }} 
            />
            <Stack.Screen 
                name="BatchDetails" 
                component={BatchDetailsScreen} 
                options={{ title: 'Batch Details' }} 
            />
            <Stack.Screen 
                name="OrderPicking" 
                component={OrderPickingScreen} 
                options={{ headerShown: false }} // Custom header in screen
            />
            <Stack.Screen 
                name="BoxDetails" 
                component={BoxDetailsScreen} 
                options={{ headerShown: false }} 
            />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = 'home';
                    } else if (route.name === 'Exceptions') {
                        iconName = 'exclamation-triangle';
                    } else if (route.name === 'Stats') {
                        iconName = 'chart-bar';
                    } else if (route.name === 'Settings') {
                        iconName = 'cog';
                    }

                    return <FontAwesome5 name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.brand[600],
                tabBarInactiveTintColor: theme.colors.gray[400],
                tabBarStyle: {
                    backgroundColor: theme.colors.white,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.gray[200],
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
                headerShown: false,
            })}
        >
            <Tab.Screen 
                name="HomeStack" 
                component={HomeStack} 
                options={{ tabBarLabel: 'Home' }} 
            />
            <Tab.Screen 
                name="Exceptions" 
                component={ExceptionsScreen} 
                options={{ tabBarLabel: 'Exceptions' }} 
            />
            <Tab.Screen 
                name="Stats" 
                component={StatsScreen} 
                options={{ tabBarLabel: 'Stats', headerShown: false }} 
            />
            {/* Mock settings screen, just reuse Stats for visual temp */}
            <Tab.Screen 
                name="Settings" 
                component={StatsScreen} 
                options={{ tabBarLabel: 'Settings' }} 
            />
        </Tab.Navigator>
    );
}
