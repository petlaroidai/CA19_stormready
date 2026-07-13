import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';
import AppHeader from '../components/AppHeader';
import OfflineBanner from '../components/OfflineBanner';

const CHECKLIST_DATA = {
    earthquake: {
        title: 'Earthquake',
        status: 'Priority Status: Critical',
        icon: 'waves',
        expanded: true,
        bg: Colors.tertiaryContainer,
        items: [
            { text: 'Secure heavy furniture', checked: true },
            { text: 'Gas shutoff valve location', checked: false },
            { text: 'Out-of-area emergency contact', checked: false, tag: 'COASTAL' },
            { text: 'Strap water heater', checked: false },
        ],
    },
    wildfire: {
        title: 'Wildfire',
        status: 'Active Watch: Moderate',
        icon: 'local-fire-department',
        expanded: false,
        iconBg: Colors.errorContainer,
        iconColor: Colors.error,
        tag: 'MOUNTAIN',
        tagBg: Colors.tertiaryContainer,
    },
    flood: {
        title: 'Flood',
        status: 'Seasonal Risk: Low',
        icon: 'water',
        expanded: false,
        iconBg: Colors.secondaryContainer,
        iconColor: Colors.onSecondaryContainer,
        tag: 'COASTAL',
        tagBg: Colors.primaryContainer,
    },
};

export default function ChecklistScreen({ navigation }) {
    const [expanded, setExpanded] = useState({ earthquake: true, wildfire: false, flood: false });
    const [checked, setChecked] = useState({ 0: true });
    const [zone, setZone] = useState('coastal');

    const total = 15;
    const completed = Object.values(checked).filter(Boolean).length + 6;
    const pct = Math.round((completed / total) * 100);

    const toggleCheck = (idx) => {
        setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
    };

    return (
        <View style={styles.container}>
            <AppHeader />
            <OfflineBanner />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Hero */}
                    <Text style={styles.heroTitle}>Checklist Resilience</Text>
                    <Text style={styles.heroDesc}>
                        Prepare for California's specific climate hazards with our tailored safety guides. Select your region to prioritize your actions.
                    </Text>

                    {/* Zone Toggle */}
                    <View style={styles.zoneGrid}>
                        <TouchableOpacity
                            style={[styles.zoneBtn, zone === 'coastal' && styles.zoneBtnActive]}
                            onPress={() => setZone('coastal')}
                        >
                            <MaterialIcons name="waves" size={28} color={zone === 'coastal' ? '#FFF' : Colors.primary} />
                            <Text style={[styles.zoneText, zone === 'coastal' && styles.zoneTextActive]}>Coastal / Costa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.zoneBtn, zone === 'mountain' && styles.zoneBtnActive]}
                            onPress={() => setZone('mountain')}
                        >
                            <MaterialIcons name="filter-hdr" size={28} color={zone === 'mountain' ? '#FFF' : Colors.primary} />
                            <Text style={[styles.zoneText, zone === 'mountain' && styles.zoneTextActive]}>Mountain / Montaña</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Progress */}
                    <View style={styles.progressCard}>
                        <View style={styles.progressHeader}>
                            <View>
                                <Text style={styles.progressLabel}>STATUS REPORT</Text>
                                <Text style={styles.progressTitle}>Your Preparedness: {pct}% Ready</Text>
                            </View>
                            <Text style={styles.progressCount}>{completed} of {total} Items{'\n'}Completed</Text>
                        </View>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${pct}%` }]} />
                        </View>
                    </View>

                    {/* Earthquake Accordion (Expanded) */}
                    <View style={styles.accordionCard}>
                        <TouchableOpacity
                            style={styles.accordionHeaderEq}
                            onPress={() => setExpanded((p) => ({ ...p, earthquake: !p.earthquake }))}
                        >
                            <View style={styles.accordionLeft}>
                                <View style={[styles.accordionIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                    <MaterialIcons name="waves" size={22} color="#FFF" />
                                </View>
                                <View>
                                    <Text style={styles.accordionTitleWhite}>Earthquake</Text>
                                    <Text style={styles.accordionSubWhite}>PRIORITY STATUS: CRITICAL</Text>
                                </View>
                            </View>
                            <MaterialIcons name={expanded.earthquake ? 'expand-less' : 'expand-more'} size={24} color="#FFF" />
                        </TouchableOpacity>
                        {expanded.earthquake && (
                            <View style={styles.accordionBody}>
                                {CHECKLIST_DATA.earthquake.items.map((item, idx) => (
                                    <View key={idx} style={styles.checkItem}>
                                        <View style={styles.checkRow}>
                                            <TouchableOpacity
                                                style={[styles.checkbox, (checked[idx]) && styles.checkboxChecked]}
                                                onPress={() => toggleCheck(idx)}
                                            >
                                                {checked[idx] && <MaterialIcons name="check" size={18} color="#FFF" />}
                                            </TouchableOpacity>
                                            <Text style={styles.checkText}>{item.text}</Text>
                                        </View>
                                        <View style={styles.checkRight}>
                                            {item.tag && (
                                                <View style={[styles.tagBadge, { backgroundColor: Colors.primaryContainer }]}>
                                                    <Text style={styles.tagText}>{item.tag}</Text>
                                                </View>
                                            )}
                                            <MaterialIcons name="info-outline" size={20} color={Colors.outline} />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Wildfire (Collapsed) */}
                    <View style={styles.accordionCard}>
                        <TouchableOpacity
                            style={styles.accordionHeaderCollapsed}
                            onPress={() => setExpanded((p) => ({ ...p, wildfire: !p.wildfire }))}
                        >
                            <View style={styles.accordionLeft}>
                                <View style={[styles.accordionIcon, { backgroundColor: Colors.errorContainer }]}>
                                    <MaterialIcons name="local-fire-department" size={22} color={Colors.error} />
                                </View>
                                <View>
                                    <Text style={styles.accordionTitle}>Wildfire</Text>
                                    <Text style={styles.accordionSub}>ACTIVE WATCH: MODERATE</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <View style={[styles.tagBadge, { backgroundColor: Colors.tertiaryContainer }]}>
                                    <Text style={[styles.tagText, { color: Colors.onTertiaryContainer }]}>MOUNTAIN</Text>
                                </View>
                                <MaterialIcons name={expanded.wildfire ? 'expand-less' : 'expand-more'} size={24} color={Colors.onSurfaceVariant} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Flood (Collapsed) */}
                    <View style={styles.accordionCard}>
                        <TouchableOpacity
                            style={styles.accordionHeaderCollapsed}
                            onPress={() => setExpanded((p) => ({ ...p, flood: !p.flood }))}
                        >
                            <View style={styles.accordionLeft}>
                                <View style={[styles.accordionIcon, { backgroundColor: Colors.secondaryContainer }]}>
                                    <MaterialIcons name="water" size={22} color={Colors.onSecondaryContainer} />
                                </View>
                                <View>
                                    <Text style={styles.accordionTitle}>Flood</Text>
                                    <Text style={styles.accordionSub}>SEASONAL RISK: LOW</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <View style={[styles.tagBadge, { backgroundColor: Colors.primaryContainer }]}>
                                    <Text style={[styles.tagText, { color: Colors.onPrimaryContainer }]}>COASTAL</Text>
                                </View>
                                <MaterialIcons name={expanded.flood ? 'expand-less' : 'expand-more'} size={24} color={Colors.onSurfaceVariant} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Editorial Card */}
                    <View style={styles.editorialCard}>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW7nCD_o05O8g0cq0Oe49vbk7EI4bcu9SLK8TlwGSo0Uc5n6ObOfxNl-qrIL12EKrz7wG0CvzRKOiYqnmimwCVp5FbWeR-3UtuNmCKM19vflIaILYYYb0dNB7RuFEUiJBhu6Rwnv5miaDm8_guBysCZKtxNZGvnEhJRda5ffR6NvOrAKSj_YOmr1UYxHT1RuU617qYGzwL0cbcofl7SfcJKSVJMLm6_C0BUlNCg8b2-YhjLkN_yuPmLyrGy7kx-NdECTzqs-Q2UQ' }}
                            style={styles.editorialBg}
                            resizeMode="cover"
                        />
                        <View style={styles.editorialOverlay}>
                            <Text style={styles.editorialTitle}>STAY INFORMED.</Text>
                            <Text style={styles.editorialDesc}>Every minute saved in preparation is a life protected. Update your checklists seasonally.</Text>
                        </View>
                    </View>

                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Download PDF Button */}
            <View style={styles.stickyAction}>
                <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={() => navigation?.navigate?.('EmergencyPDF')}
                >
                    <MaterialIcons name="picture-as-pdf" size={22} color="#FFF" />
                    <Text style={styles.downloadText}>Download Emergency PDF / Descargar PDF</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface },
    content: { paddingHorizontal: 24, paddingTop: 24, gap: 16 },

    heroTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 28,
        color: Colors.primary,
        letterSpacing: -1,
    },
    heroDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        color: Colors.onSurfaceVariant,
        lineHeight: 22,
    },

    zoneGrid: { flexDirection: 'row', gap: 12, marginTop: 8 },
    zoneBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 22,
        borderRadius: 12,
        backgroundColor: Colors.surfaceContainerLow,
        gap: 8,
    },
    zoneBtnActive: { backgroundColor: Colors.primaryContainer },
    zoneText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
    },
    zoneTextActive: { color: '#FFF' },

    progressCard: {
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 12,
        padding: 20,
        ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.outlineVariant + '26',
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    progressLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: Colors.secondary,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    progressTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 22,
        color: Colors.primary,
    },
    progressCount: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
        textAlign: 'right',
    },
    progressTrack: {
        height: 14,
        borderRadius: 7,
        backgroundColor: Colors.secondaryContainer + '44',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 7,
        backgroundColor: Colors.mapAccent,
    },

    accordionCard: {
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 12,
        overflow: 'hidden',
        ...Shadows.sm,
        borderWidth: 1,
        borderColor: Colors.outlineVariant + '26',
    },
    accordionHeaderEq: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: Colors.tertiaryContainer,
    },
    accordionHeaderCollapsed: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    accordionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    accordionIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    accordionTitleWhite: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: '#FFF',
    },
    accordionSubWhite: {
        fontFamily: 'Inter_400Regular',
        fontSize: 10,
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    accordionTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: Colors.onSurface,
    },
    accordionSub: {
        fontFamily: 'Inter_400Regular',
        fontSize: 10,
        color: Colors.onSurfaceVariant,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginTop: 2,
    },
    accordionBody: {
        padding: 20,
        gap: 10,
        backgroundColor: Colors.surfaceContainerLow + '55',
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.outlineVariant + '1A',
    },
    checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: Colors.outlineVariant,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.success,
        borderColor: Colors.success,
    },
    checkText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: Colors.onSurface,
        flex: 1,
    },
    checkRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    tagBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
    },
    tagText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 9,
        color: Colors.onPrimaryContainer,
        letterSpacing: -0.3,
        textTransform: 'uppercase',
    },

    editorialCard: {
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        marginTop: 16,
    },
    editorialBg: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    editorialOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        padding: 24,
        backgroundColor: 'rgba(0,56,87,0.55)',
    },
    editorialTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 28,
        color: '#FFF',
        fontStyle: 'italic',
        letterSpacing: -1.5,
        marginBottom: 4,
    },
    editorialDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 18,
    },

    stickyAction: {
        position: 'absolute',
        bottom: 16,
        left: 24,
        right: 24,
    },
    downloadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryContainer,
        paddingVertical: 18,
        borderRadius: 16,
        gap: 10,
        ...Shadows.lg,
    },
    downloadText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        color: '#FFF',
    },
});
