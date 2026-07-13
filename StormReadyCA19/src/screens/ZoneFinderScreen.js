import React from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    TouchableOpacity, Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Shadows, BorderRadius } from '../theme';
import SearchBar from '../components/SearchBar';
import HazardBadge from '../components/HazardBadge';

const { width, height } = Dimensions.get('window');

export default function ZoneFinderScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.langToggle}>
                    <Text style={styles.langText}>EN | ES</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>StormReady CA19</Text>
                <View style={styles.avatar}>
                    <MaterialIcons name="person" size={22} color="#FFF" />
                </View>
            </View>

            {/* Map Area */}
            <View style={styles.mapContainer}>
                <ImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnMO0F1hHBkMfbJc78Q_ycrtFt_9t6Xq_R_MAfbymzRpgXT2S7LLax6v0GLT93vpydKqUYCPGILdvdVe6JFbWdOolZZngqKgQnFAix_MeWDaLPR7QG5SU2t0nADhkg_kniMTHnEzBcSb_m-8QrHzF6m517pvXzRVsmvOxNowta2xmo6LoUtmw8_jFlpgPwIC-5SjmjwGaRikeFyQfGrEB6_3_yCuKlWydq98XrY4oP0KFupofy9t1sI3KRzZh5M1LV3gonmo_FBw' }}
                    style={styles.mapImage}
                    resizeMode="cover"
                >
                    {/* Search Bar */}
                    <View style={styles.searchOverlay}>
                        <SearchBar placeholder="Search address or zone... / Buscar..." />
                    </View>

                    {/* Layer Toggle */}
                    <TouchableOpacity style={styles.layerBtn}>
                        <MaterialIcons name="layers" size={24} color={Colors.onPrimary} />
                    </TouchableOpacity>

                    {/* Center Pulse Pin */}
                    <View style={styles.centerPin}>
                        <View style={styles.pinOuter} />
                        <View style={styles.pinDot} />
                    </View>
                </ImageBackground>
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.dragHandle} />

                {/* Zone Identifier */}
                <Text style={styles.zoneCode}>SCZ-E030</Text>
                <Text style={styles.zoneLabel}>CURRENT LOCATION • UBICACIÓN ACTUAL</Text>

                {/* Risk Badges */}
                <View style={styles.badges}>
                    <HazardBadge type="fire" />
                    <HazardBadge type="earthquake" />
                </View>

                {/* Evacuation Route */}
                <View style={styles.routeCard}>
                    <MaterialIcons name="alt-route" size={24} color={Colors.primary} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.routeLabel}>Nearest Evacuation Route:</Text>
                        <Text style={styles.routeValue}>Hwy 1 Southbound / Carretera 1 Sur</Text>
                    </View>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    style={styles.ctaButton}
                    onPress={() => navigation?.navigate?.('Checklist')}
                >
                    <Text style={styles.ctaText}>View My Checklist / Ver mi lista</Text>
                    <MaterialIcons name="arrow-forward" size={22} color={Colors.secondaryContainer} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surface,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: Colors.surface,
    },
    langToggle: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    langText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 16,
        color: Colors.primary,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 20,
        color: Colors.primary,
        letterSpacing: -1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondaryContainer,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.secondaryContainer,
    },
    mapContainer: {
        flex: 1,
    },
    mapImage: {
        flex: 1,
        width: '100%',
    },
    searchOverlay: {
        position: 'absolute',
        top: 12,
        left: 16,
        right: 16,
        zIndex: 10,
    },
    layerBtn: {
        position: 'absolute',
        top: 72,
        right: 20,
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    centerPin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -8,
        marginTop: -8,
        zIndex: 5,
    },
    pinOuter: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.secondaryContainer + '44',
        left: -8,
        top: -8,
    },
    pinDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.secondary,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    bottomSheet: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingHorizontal: 28,
        paddingTop: 16,
        paddingBottom: 32,
        ...Shadows.nav,
    },
    dragHandle: {
        width: 48,
        height: 5,
        borderRadius: 3,
        backgroundColor: Colors.outlineVariant + '55',
        alignSelf: 'center',
        marginBottom: 20,
    },
    zoneCode: {
        fontFamily: 'Inter_900Black',
        fontSize: 38,
        color: Colors.primaryContainer,
        letterSpacing: -2,
        marginBottom: 4,
    },
    zoneLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 11,
        color: Colors.secondary,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 16,
    },
    badges: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    routeCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        padding: 16,
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: 12,
        marginBottom: 20,
    },
    routeLabel: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: Colors.onSurface,
    },
    routeValue: {
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        color: Colors.primary,
        marginTop: 2,
    },
    ctaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryContainer,
        height: 56,
        borderRadius: 12,
        gap: 8,
        ...Shadows.lg,
    },
    ctaText: {
        fontFamily: 'Inter_900Black',
        fontSize: 17,
        color: Colors.secondaryContainer,
    },
});
