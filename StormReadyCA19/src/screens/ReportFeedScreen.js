import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';
import AppHeader from '../components/AppHeader';
import OfflineBanner from '../components/OfflineBanner';
import FilterChips from '../components/FilterChips';

const FILTERS = ['All', 'Flooding', 'Road Closure', 'Power Outage', 'Wildfire/Smoke', 'Downed Tree', 'Earthquake Damage', 'Tsunami', 'Mudslide'];

const REPORTS = [
    {
        id: 1,
        category: 'DOWNED TREE / ÁRBOL CAÍDO',
        catColor: Colors.success,
        icon: 'park',
        title: 'Blocked access on Empire Grade Road',
        location: 'Santa Cruz Mountains',
        time: '12m ago',
        confirms: 12,
        verified: true,
    },
    {
        id: 2,
        category: 'ROAD CLOSURE / CIERRE DE VÍA',
        catColor: Colors.error,
        icon: 'block',
        title: 'Highway 1 Northbound flooded at Aptos',
        location: 'Aptos Creek Area',
        time: '45m ago',
        confirms: 54,
        verified: true,
    },
];

export default function ReportFeedScreen({ navigation }) {
    const [activeFilter, setActiveFilter] = useState(0);

    return (
        <View style={styles.container}>
            <AppHeader
                showAddReport
                onAddReport={() => navigation?.navigate?.('SubmitReport')}
            />
            <OfflineBanner />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <FilterChips chips={FILTERS} activeIndex={activeFilter} onSelect={setActiveFilter} />

                    <View style={styles.feed}>
                        {REPORTS.map((r) => (
                            <View key={r.id} style={styles.card}>
                                <View style={styles.cardRow}>
                                    <View style={[styles.iconCircle, { backgroundColor: r.catColor }]}>
                                        <MaterialIcons name={r.icon} size={28} color="#FFF" />
                                    </View>
                                    <View style={styles.cardContent}>
                                        <View style={styles.catRow}>
                                            <View style={[styles.catBadge, { backgroundColor: r.catColor + '15' }]}>
                                                <Text style={[styles.catText, { color: r.catColor }]}>{r.category}</Text>
                                            </View>
                                            <Text style={styles.timeText}>{r.time}</Text>
                                        </View>
                                        <Text style={styles.cardTitle}>{r.title}</Text>
                                        <View style={styles.locRow}>
                                            <MaterialIcons name="location-on" size={14} color={Colors.onSurfaceVariant} />
                                            <Text style={styles.locText}>{r.location}</Text>
                                        </View>

                                        <View style={styles.actionsRow}>
                                            <View style={styles.btnGroup}>
                                                <TouchableOpacity style={styles.confirmBtn}>
                                                    <MaterialIcons name="check-circle" size={16} color={Colors.onSecondaryContainer} />
                                                    <Text style={styles.confirmText}>Confirm ({r.confirms})</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.flagBtn}>
                                                    <MaterialIcons name="flag" size={16} color={Colors.onSurfaceVariant} />
                                                    <Text style={styles.flagText}>Flag</Text>
                                                </TouchableOpacity>
                                            </View>
                                            {r.verified && (
                                                <View style={styles.verifiedBadge}>
                                                    <MaterialIcons name="verified" size={14} color={Colors.success} />
                                                    <Text style={styles.verifiedText}>Verified ✓</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Skeleton 1 */}
                        <View style={[styles.card, { opacity: 0.5 }]}>
                            <View style={styles.cardRow}>
                                <View style={[styles.iconCircle, { backgroundColor: Colors.surfaceContainerHighest }]} />
                                <View style={{ flex: 1, gap: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={styles.skelLine} />
                                        <View style={[styles.skelLine, { width: 40 }]} />
                                    </View>
                                    <View style={[styles.skelLine, { width: '75%', height: 20 }]} />
                                    <View style={[styles.skelLine, { width: '50%' }]} />
                                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                                        <View style={[styles.skelLine, { width: 80, height: 32, borderRadius: 8 }]} />
                                        <View style={[styles.skelLine, { width: 80, height: 32, borderRadius: 8 }]} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Skeleton 2 */}
                        <View style={[styles.card, { opacity: 0.25 }]}>
                            <View style={styles.cardRow}>
                                <View style={[styles.iconCircle, { backgroundColor: Colors.surfaceContainerHighest }]} />
                                <View style={{ flex: 1, gap: 12 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={styles.skelLine} />
                                        <View style={[styles.skelLine, { width: 40 }]} />
                                    </View>
                                    <View style={[styles.skelLine, { width: '75%', height: 20 }]} />
                                    <View style={[styles.skelLine, { width: '50%' }]} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface },
    content: { paddingBottom: 32, gap: 8 },
    feed: { paddingHorizontal: 20, gap: 24, marginTop: 8 },
    card: {
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 12,
        padding: 20,
        ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.outlineVariant + '26',
    },
    cardRow: { flexDirection: 'row', gap: 16 },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: { flex: 1 },
    catRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    catBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        flexShrink: 1,
    },
    catText: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 9,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    timeText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 12,
        color: Colors.onSurfaceVariant + 'BB',
    },
    cardTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: Colors.primary,
        lineHeight: 24,
        marginBottom: 4,
    },
    locRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 16 },
    locText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.outlineVariant + '1A',
        paddingTop: 12,
    },
    btnGroup: { flexDirection: 'row', gap: 8 },
    confirmBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: Colors.secondaryContainer + '33',
        borderRadius: 8,
    },
    confirmText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: Colors.onSecondaryContainer,
    },
    flagBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: 8,
    },
    flagText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: Colors.success + '15',
        borderRadius: 12,
    },
    verifiedText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: Colors.success,
    },
    skelLine: {
        height: 14,
        width: 120,
        backgroundColor: Colors.surfaceContainerHighest,
        borderRadius: 4,
    },
});
