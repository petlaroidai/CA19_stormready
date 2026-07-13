import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../theme';

export default function FilterChips({ chips = [], activeIndex = 0, onSelect }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {chips.map((chip, index) => {
                const isActive = index === activeIndex;
                return (
                    <TouchableOpacity
                        key={chip}
                        style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
                        onPress={() => onSelect?.(index)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>
                            {chip}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 10,
    },
    chip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    chipActive: {
        backgroundColor: Colors.primary,
        ...Shadows.sm,
    },
    chipInactive: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderWidth: 1,
        borderColor: Colors.outlineVariant + '33',
    },
    chipText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
    },
    chipTextActive: {
        color: Colors.onPrimary,
    },
    chipTextInactive: {
        color: Colors.onSurfaceVariant,
    },
});
