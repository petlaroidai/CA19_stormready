import React from 'react';
import {
    View, Text, ScrollView, StyleSheet, Image,
    TouchableOpacity, Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Shadows } from '../theme';
import HazardBadge from '../components/HazardBadge';

const ACTIONS = [
    { icon: 'inventory-2', title: 'Have sandbags ready', desc: 'Maintain a stock of at least 15 sandbags at entry points.' },
    { icon: 'alt-route', title: 'Know your route', desc: 'Identify the primary and secondary exits from your street.' },
    { icon: 'radio', title: 'Emergency Radio', desc: 'Keep a battery-operated NOAA weather radio tuned to 162.550 MHz.' },
];

const CONTACTS = [
    { label: 'County OES', phone: '(916) 874-4670', borderColor: Colors.primary },
    { label: 'Red Cross Shelter Line', phone: '1-800-RED-CROSS', borderColor: Colors.secondary },
];

export default function HazardDetailScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack?.()} style={styles.iconBtn}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Hazard Detail</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <MaterialIcons name="share" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} showsVerticalScrollIndicator={false}>
                {/* Hero */}
                <View style={styles.heroRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.heroTitle}>Flood Zone A</Text>
                        <Text style={styles.heroSubtitle}>SACRAMENTO COUNTY{'\n'}DISTRICT 12</Text>
                    </View>
                    <HazardBadge type="highRisk" />
                </View>

                <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu2FQ8H8iHU7vWSadVGoqQVlGdgfAIT3X-WQq6B4EJXLmFHOdSzFKwlQjJzbTzYnzjS39GuJGTIwYnEEdkzdnqlufT2ll4j1jTKnzDkOQnDWWg80SQ01jLrI5DL5gbr8qUwY-ZgDPu8hgs7oOTGlLOTUVqS5bE1DzZrwW5_odXX5DLi6dYuvdF9h2SN1xlfkOyczN6pKTYB-bN5bHs9lSo6wY1QGXBunxgwOocdMLYnNaiXOnJBh8bmOQn_9WGsL-nejVOQs5ukg' }}
                    style={styles.heroImage}
                    resizeMode="cover"
                />

                {/* Summary */}
                <Text style={styles.sectionLabel}>HAZARD SUMMARY</Text>
                <Text style={styles.summaryText}>
                    Prone to flash flooding during atmospheric rivers and severe storm surges from the American River basin.
                </Text>

                <Text style={[styles.sectionLabel, { color: Colors.outline, marginTop: 20 }]}>RESUMEN DE PELIGROS</Text>
                <Text style={styles.summaryTextEs}>
                    Propenso a inundaciones repentinas durante ríos atmosféricos y marejadas ciclónicas graves de la cuenca del río Americano.
                </Text>

                {/* Safety Actions */}
                <Text style={styles.sectionTitle}>Required Safety Actions</Text>
                {ACTIONS.map((a, i) => (
                    <View key={i} style={styles.actionCard}>
                        <MaterialIcons name={a.icon} size={28} color={Colors.primary} />
                        <Text style={styles.actionTitle}>{a.title}</Text>
                        <Text style={styles.actionDesc}>{a.desc}</Text>
                    </View>
                ))}

                {/* Alerts Enabled */}
                <View style={styles.alertCard}>
                    <MaterialIcons name="notifications-active" size={28} color={Colors.secondaryContainer} />
                    <Text style={styles.alertTitle}>Alerts Enabled</Text>
                    <Text style={styles.alertDesc}>You are currently receiving push notifications for this zone.</Text>
                </View>

                {/* Evacuation */}
                <View style={styles.evacSection}>
                    <View style={{ padding: 20 }}>
                        <Text style={styles.sectionTitle}>Primary Evacuation Route</Text>
                        <Text style={styles.evacDesc}>Northbound via Highway 99 to Grant Line Road Shelter.</Text>
                    </View>
                    <View style={styles.evacMapContainer}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf1PUVKAVeCNyDQYQBkQk6dhZjkFByBpKyXUJhvIlTsbFpZt3ctrYmyDyy3SvJEMRWew-bTb8cE-lRxnQ9FnYRi8J801UiHXCZ22-o1x9hB_ZoJPkaVgCDL1ZqeC6qB9kYykKSryFyT_B3bY5BZ49IFnAm6ygFruhN_ID3wY5XlUjVKuYCh1JfilrZGhDxHFuxWgwWnSUIzr5gbb5RJM4Y9kVUhZlJk9c5AXhRG9bR2avFTqTgZxT8RqrYgiob63S7LhmWaBrIcA' }}
                            style={styles.evacMap}
                            resizeMode="cover"
                        />
                        <TouchableOpacity style={styles.viewMapBtn}>
                            <MaterialIcons name="map" size={20} color={Colors.onPrimary} />
                            <Text style={styles.viewMapText}>View Interactive Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Emergency Contacts */}
                <Text style={styles.sectionLabel}>EMERGENCY RESOURCES</Text>
                {CONTACTS.map((c, i) => (
                    <View key={i} style={[styles.contactCard, { borderLeftColor: c.borderColor }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.contactLabel}>{c.label}</Text>
                            <Text style={styles.contactPhone}>{c.phone}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.callBtn}
                            onPress={() => Linking.openURL(`tel:${c.phone.replace(/[^0-9]/g, '')}`)}
                        >
                            <MaterialIcons name="call" size={22} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                ))}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(248,250,251,0.85)',
        ...Shadows.sm,
    },
    headerTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: Colors.primary,
    },
    iconBtn: { padding: 8, borderRadius: 20 },
    body: { flex: 1 },
    bodyContent: { padding: 24, gap: 16 },

    heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    heroTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 34,
        color: Colors.primary,
        letterSpacing: -1.5,
        lineHeight: 38,
    },
    heroSubtitle: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 13,
        color: Colors.secondary,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 4,
    },
    heroImage: { width: '100%', height: 180, borderRadius: 12, marginTop: 16 },

    sectionLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 11,
        color: Colors.secondary,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginTop: 28,
    },
    summaryText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 17,
        color: Colors.onSurface,
        lineHeight: 26,
        marginTop: 8,
    },
    summaryTextEs: {
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        color: Colors.onSurfaceVariant,
        lineHeight: 24,
        fontStyle: 'italic',
        marginTop: 8,
    },
    sectionTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: Colors.primary,
        letterSpacing: -0.3,
        marginTop: 24,
        marginBottom: 8,
    },
    actionCard: {
        backgroundColor: Colors.surfaceContainerLow,
        padding: 20,
        borderRadius: 12,
        gap: 8,
    },
    actionTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        color: Colors.primary,
    },
    actionDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
        lineHeight: 19,
    },
    alertCard: {
        backgroundColor: Colors.primaryContainer,
        padding: 20,
        borderRadius: 12,
        gap: 8,
    },
    alertTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        color: '#FFF',
    },
    alertDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: Colors.onPrimaryContainer,
        lineHeight: 19,
    },
    evacSection: {
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 16,
    },
    evacDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: Colors.onSurfaceVariant,
        marginTop: 8,
    },
    evacMapContainer: { height: 200, position: 'relative' },
    evacMap: { width: '100%', height: '100%' },
    viewMapBtn: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        ...Shadows.md,
    },
    viewMapText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: Colors.onPrimary,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        ...Shadows.sm,
    },
    contactLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 12,
        color: Colors.outline,
    },
    contactPhone: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: Colors.primary,
        marginTop: 2,
    },
    callBtn: {
        backgroundColor: Colors.surfaceContainerLow,
        padding: 12,
        borderRadius: 24,
    },
});
