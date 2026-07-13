import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';

export default function SearchBar({ placeholder = 'Search address or zone...', showLocation = false }) {
    return (
        <View style={styles.container}>
            <MaterialIcons name="search" size={22} color={Colors.outline} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={Colors.outline + '99'}
            />
            {showLocation && (
                <TouchableOpacity>
                    <MaterialIcons name="my-location" size={22} color={Colors.outline} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        ...Shadows.md,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: Colors.onSurface,
    },
});
