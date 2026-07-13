import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../theme';

const BADGE_CONFIG = {
    fire: {
        bg: Colors.errorContainer,
        text: Colors.onErrorContainer,
        icon: 'local-fire-department',
        label: 'FIRE HAZARD',
    },
    earthquake: {
        bg: Colors.tertiaryContainer,
        text: Colors.onTertiaryContainer,
        icon: 'waves',
        label: 'EARTHQUAKE',
    },
    flood: {
        bg: Colors.secondaryContainer + '33',
        text: Colors.onSecondaryContainer,
        icon: 'water',
        label: 'FLOOD',
    },
    tsunami: {
        bg: Colors.primary + '22',
        text: Colors.primary,
        icon: 'tsunami',
        label: 'TSUNAMI',
    },
    highRisk: {
        bg: Colors.error + '15',
        text: Colors.error,
        icon: 'warning',
        label: 'HIGH RISK',
        borderColor: Colors.error + '33',
    },
};

export default function HazardBadge({ type = 'fire' }) {
    const config = BADGE_CONFIG[type] || BADGE_CONFIG.fire;
    return (
        <View style={[styles.badge, { backgroundColor: config.bg }, config.borderColor && { borderWidth: 1, borderColor: config.borderColor }]}>
            <MaterialIcons name={config.icon} size={14} color={config.text} />
            <Text style={[styles.label, { color: config.text }]}>{config.label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 6,
    },
    label: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 11,
        letterSpacing: -0.3,
        textTransform: 'uppercase',
    },
});
