import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme';

export default function OfflineBanner() {
    return (
        <View style={styles.container}>
            <MaterialIcons name="cloud-off" size={18} color="#FFF" />
            <Text style={styles.text}>You are offline — showing cached data</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.offline,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 8,
    },
    text: {
        color: '#FFF',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
    },
});
