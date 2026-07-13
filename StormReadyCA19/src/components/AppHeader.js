import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../theme';

export default function AppHeader({
    title = 'StormReady CA19',
    showAvatar = true,
    showBack = false,
    showShare = false,
    showAddReport = false,
    showLanguage = true,
    onBack,
    onShare,
    onAddReport,
    rightContent,
}) {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                {showBack ? (
                    <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
                        <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                ) : showAvatar ? (
                    <View style={styles.avatar}>
                        <MaterialIcons name="person" size={24} color={Colors.onPrimary} />
                    </View>
                ) : null}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.right}>
                {showAddReport && (
                    <TouchableOpacity style={styles.addReportBtn} onPress={onAddReport}>
                        <MaterialIcons name="add" size={20} color="#FFF" />
                        <Text style={styles.addReportText}>+ Report</Text>
                    </TouchableOpacity>
                )}
                {showShare && (
                    <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
                        <MaterialIcons name="share" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                )}
                {showLanguage && (
                    <TouchableOpacity style={styles.langToggle}>
                        <Text style={styles.langText}>EN | ES</Text>
                    </TouchableOpacity>
                )}
                {rightContent}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.lg,
        backgroundColor: Colors.surface,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    title: {
        ...Typography.titleLg,
        fontFamily: 'Inter_900Black',
        color: Colors.primary,
        letterSpacing: -1,
    },
    iconBtn: {
        padding: 8,
        borderRadius: 20,
    },
    langToggle: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    langText: {
        ...Typography.titleLg,
        fontFamily: 'Inter_700Bold',
        color: Colors.primary,
        letterSpacing: -0.5,
    },
    addReportBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.mapAccent,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
        gap: 4,
    },
    addReportText: {
        color: '#FFF',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
    },
});
