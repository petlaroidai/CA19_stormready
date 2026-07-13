import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';

// Screens
import ZoneFinderScreen from '../screens/ZoneFinderScreen';
import HazardMapScreen from '../screens/HazardMapScreen';
import HazardDetailScreen from '../screens/HazardDetailScreen';
import ReportFeedScreen from '../screens/ReportFeedScreen';
import SubmitReportScreen from '../screens/SubmitReportScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import EmergencyPDFScreen from '../screens/EmergencyPDFScreen';

const Tab = createBottomTabNavigator();
const ZoneStack = createNativeStackNavigator();
const ReportStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const ChecklistStack = createNativeStackNavigator();

function ZoneStackScreen() {
    return (
        <ZoneStack.Navigator screenOptions={{ headerShown: false }}>
            <ZoneStack.Screen name="ZoneFinder" component={ZoneFinderScreen} />
            <ZoneStack.Screen name="HazardDetail" component={HazardDetailScreen} />
        </ZoneStack.Navigator>
    );
}

function ReportStackScreen() {
    return (
        <ReportStack.Navigator screenOptions={{ headerShown: false }}>
            <ReportStack.Screen name="ReportFeed" component={ReportFeedScreen} />
            <ReportStack.Screen
                name="SubmitReport"
                component={SubmitReportScreen}
                options={{ presentation: 'transparentModal', animation: 'fade' }}
            />
        </ReportStack.Navigator>
    );
}

function MapStackScreen() {
    return (
        <MapStack.Navigator screenOptions={{ headerShown: false }}>
            <MapStack.Screen name="HazardMap" component={HazardMapScreen} />
            <MapStack.Screen name="HazardDetail" component={HazardDetailScreen} />
        </MapStack.Navigator>
    );
}

function ChecklistStackScreen() {
    return (
        <ChecklistStack.Navigator screenOptions={{ headerShown: false }}>
            <ChecklistStack.Screen name="ChecklistMain" component={ChecklistScreen} />
            <ChecklistStack.Screen name="EmergencyPDF" component={EmergencyPDFScreen} />
        </ChecklistStack.Navigator>
    );
}

const TABS = [
    { name: 'Zones', icon: 'explore', iconFill: 'explore' },
    { name: 'Reports', icon: 'list-alt', iconFill: 'list-alt' },
    { name: 'Map', icon: 'map', iconFill: 'map' },
    { name: 'Checklist', icon: 'assignment', iconFill: 'assignment' },
];

function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={tabStyles.bar}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const tab = TABS[index];

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={[tabStyles.tab, isFocused && tabStyles.tabActive]}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons
                            name={tab.icon}
                            size={24}
                            color={isFocused ? Colors.primary : '#44474E'}
                        />
                        <Text style={[tabStyles.tabLabel, isFocused && tabStyles.tabLabelActive]}>
                            {tab.name.toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function AppNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="ZonesTab" component={ZoneStackScreen} />
            <Tab.Screen name="ReportsTab" component={ReportStackScreen} />
            <Tab.Screen name="MapTab" component={MapStackScreen} />
            <Tab.Screen name="ChecklistTab" component={ChecklistStackScreen} />
        </Tab.Navigator>
    );
}

const tabStyles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Shadows.nav,
    },
    tab: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    tabActive: {
        backgroundColor: Colors.secondaryContainer + '33',
    },
    tabLabel: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
        letterSpacing: 1,
        color: '#44474E',
        marginTop: 4,
        textTransform: 'uppercase',
    },
    tabLabelActive: {
        color: Colors.primary,
        fontFamily: 'Inter_600SemiBold',
    },
});
