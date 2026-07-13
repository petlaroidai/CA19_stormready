import React from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';
import AppHeader from '../components/AppHeader';
import OfflineBanner from '../components/OfflineBanner';

const CONTACTS = [
    { label: 'OES AGENCY', name: 'Santa Cruz County', phone: '911 or (831) 454-2188' },
    { label: 'UTILITY PROVIDER', name: 'PG&E', phone: '1-800-743-5000' },
    { label: 'MEDICAL SUPPORT', name: 'Poison Control', phone: '1-800-222-1222' },
];

export default function EmergencyPDFScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <OfflineBanner />
            <AppHeader />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.pageTitle}>Emergency PDF / PDF de Emergencia</Text>
                    <Text style={styles.pageDesc}>
                        Prepare your physical documentation. This document remains accessible on your device even without cellular service.
                    </Text>

                    {/* Bento Grid */}
                    <View style={styles.bentoRow}>
                        {/* Evacuation Zone Card */}
                        <View style={styles.zoneCard}>
                            <View style={styles.zoneHeader}>
                                <View>
                                    <Text style={styles.zoneLabel}>CURRENT LOCATION</Text>
                                    <Text style={styles.zoneTitle}>Evacuation Zone</Text>
                                </View>
                                <View style={styles.locIcon}>
                                    <MaterialIcons name="location-on" size={28} color={Colors.primary} />
                                </View>
                            </View>
                            <View style={styles.zoneBottom}>
                                <Text style={styles.zoneCode}>SCZ-E030</Text>
                                <Text style={styles.zoneCounty}>SANTA CRUZ</Text>
                            </View>
                        </View>

                        {/* Checklist Status Card */}
                        <View style={styles.statusCard}>
                            <View style={styles.statusHeader}>
                                <MaterialIcons name="assignment-turned-in" size={28} color="#FFF" />
                                <View style={styles.progressBadge}>
                                    <Text style={styles.progressBadgeText}>IN PROGRESS</Text>
                                </View>
                            </View>
                            <View style={styles.statusCount}>
                                <Text style={styles.statusNum}>18</Text>
                                <Text style={styles.statusDenom}>/ 35</Text>
                            </View>
                            <Text style={styles.statusLabel}>Checklist Items Completed</Text>
                            <View style={styles.statusTrack}>
                                <View style={styles.statusFill} />
                            </View>
                        </View>
                    </View>

                    {/* Emergency Contacts */}
                    <View style={styles.contactsCard}>
                        <View style={styles.contactsHeader}>
                            <MaterialIcons name="contact-phone" size={22} color={Colors.primary} />
                            <Text style={styles.contactsTitle}>Emergency Contacts</Text>
                        </View>
                        {CONTACTS.map((c, i) => (
                            <View key={i} style={styles.contactItem}>
                                <Text style={styles.contactType}>{c.label}</Text>
                                <Text style={styles.contactName}>{c.name}</Text>
                                <TouchableOpacity style={styles.phoneRow}>
                                    <MaterialIcons name="call" size={14} color={Colors.secondary} />
                                    <Text style={styles.phoneText}>{c.phone}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* Family Reunion Point */}
                    <View style={styles.reunionCard}>
                        <Text style={styles.reunionTitle}>Family Reunion Point / Punto de reunión familiar</Text>
                        <Text style={styles.reunionDesc}>
                            Specify a safe location for your household to meet if separated during an emergency.
                        </Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., Central Park Clock Tower"
                                placeholderTextColor={Colors.onSurfaceVariant + '66'}
                            />
                            <MaterialIcons name="edit-location-alt" size={22} color={Colors.onSurfaceVariant + '66'} style={styles.inputIcon} />
                        </View>
                    </View>

                    {/* Generate PDF */}
                    <TouchableOpacity style={styles.pdfBtn}>
                        <MaterialIcons name="picture-as-pdf" size={22} color="#FFF" />
                        <Text style={styles.pdfBtnText}>Generate & Download PDF / Generar y descargar PDF</Text>
                    </TouchableOpacity>

                    {/* Toast */}
                    <View style={styles.toast}>
                        <MaterialIcons name="check-circle" size={22} color="#FFF" />
                        <Text style={styles.toastText}>PDF Saved to Downloads / PDF guardado</Text>
                    </View>

                    <View style={{ height: 40 }} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.surface },
    content: { padding: 24, gap: 20 },

    pageTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 32,
        color: Colors.primary,
        letterSpacing: -1.5,
        lineHeight: 36,
    },
    pageDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: Colors.onSurfaceVariant,
        lineHeight: 24,
    },

    bentoRow: { gap: 16 },
    zoneCard: {
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 12,
        padding: 24,
        ...Shadows.sm,
        minHeight: 160,
        justifyContent: 'space-between',
    },
    zoneHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    zoneLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 10,
        color: Colors.secondary,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    zoneTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
        color: Colors.primary,
        marginTop: 4,
    },
    locIcon: {
        backgroundColor: Colors.primary + '0D',
        padding: 10,
        borderRadius: 24,
    },
    zoneBottom: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 10,
        marginTop: 16,
    },
    zoneCode: {
        fontFamily: 'Inter_900Black',
        fontSize: 46,
        color: Colors.primary,
        letterSpacing: -3,
    },
    zoneCounty: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },

    statusCard: {
        backgroundColor: Colors.primaryContainer,
        borderRadius: 12,
        padding: 24,
        ...Shadows.md,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    progressBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    progressBadgeText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 11,
        color: '#FFF',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
    },
    statusCount: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    statusNum: {
        fontFamily: 'Inter_900Black',
        fontSize: 44,
        color: '#FFF',
        letterSpacing: -2,
    },
    statusDenom: {
        fontFamily: 'Inter_500Medium',
        fontSize: 20,
        color: 'rgba(255,255,255,0.7)',
    },
    statusLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#FFF',
        marginTop: 4,
        marginBottom: 12,
    },
    statusTrack: {
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
    },
    statusFill: {
        height: '100%',
        width: '51%',
        borderRadius: 5,
        backgroundColor: Colors.secondaryContainer,
    },

    contactsCard: {
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: 12,
        padding: 24,
        gap: 20,
    },
    contactsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    contactsTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: Colors.primary,
        letterSpacing: -0.3,
    },
    contactItem: { gap: 2 },
    contactType: {
        fontFamily: 'Inter_700Bold',
        fontSize: 11,
        color: Colors.onSurfaceVariant,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    contactName: {
        fontFamily: 'Inter_700Bold',
        fontSize: 18,
        color: Colors.primary,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    phoneText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: Colors.secondary,
    },

    reunionCard: {
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 12,
        padding: 24,
        ...Shadows.sm,
        gap: 10,
    },
    reunionTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: Colors.primary,
    },
    reunionDesc: {
        fontFamily: 'Inter_400Regular',
        fontSize: 13,
        color: Colors.onSurfaceVariant,
        lineHeight: 19,
    },
    inputWrapper: { position: 'relative', marginTop: 4 },
    input: {
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 14,
        fontSize: 14,
        fontFamily: 'Inter_500Medium',
        color: Colors.primary,
        paddingRight: 44,
    },
    inputIcon: {
        position: 'absolute',
        right: 14,
        top: 14,
    },

    pdfBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryContainer,
        paddingVertical: 18,
        borderRadius: 12,
        gap: 10,
        ...Shadows.lg,
    },
    pdfBtnText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: '#FFF',
    },

    toast: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 24,
        alignSelf: 'center',
        ...Shadows.lg,
    },
    toastText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: '#FFF',
        letterSpacing: -0.3,
    },
});
