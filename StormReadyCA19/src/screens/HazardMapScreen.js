import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    TouchableOpacity, Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Shadows } from '../theme';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';

const HAZARD_FILTERS = ['All Hazards', 'Flood', 'Fire', 'Tsunami', 'Earthquake', 'Evacuation', 'Shelters'];

const LEGEND_BASE = [
    { color: Colors.secondary, label: 'Flood Zones', type: 'square' },
    { color: Colors.error, label: 'Fire Hazard', type: 'square' },
    { color: Colors.primary, label: 'Tsunami', type: 'square' },
    { color: Colors.tertiary, label: 'Fault Lines', type: 'line' },
];

const LEGEND_EXTRAS = {
    5: { color: Colors.mapAccent, label: 'Evac Routes', type: 'arrow' },
    6: { color: Colors.success, label: 'Shelters', type: 'square' },
};

const MARKERS = [
    { id: 1, icon: 'bolt', color: '#F39C12', bg: '#F39C12', top: '22%', left: '15%' },
    { id: 2, icon: 'block', color: '#FFF', bg: Colors.error, top: '42%', left: '42%' },
    { id: 3, icon: 'water-drop', color: '#FFF', bg: Colors.secondary, top: '55%', left: '55%' },
    { id: 4, icon: 'water-drop', color: '#FFF', bg: Colors.secondary, top: '65%', left: '25%' },
];

const SHELTER_MARKERS = [
    { id: 's1', icon: 'home', color: '#FFF', bg: Colors.success, top: '50%', left: '20%' },
    { id: 's2', icon: 'home', color: '#FFF', bg: Colors.success, top: '72%', left: '45%' },
];

export default function HazardMapScreen({ navigation }) {
    const [activeFilter, setActiveFilter] = useState(0);

    const showMarkers = activeFilter === 0 || activeFilter >= 1;
    const showEvac = activeFilter === 0 || activeFilter === 5;
    const showShelters = activeFilter === 0 || activeFilter === 6;

    const legendItems = [...LEGEND_BASE];
    if (showEvac || activeFilter === 5) legendItems.push(LEGEND_EXTRAS[5]);
    if (showShelters || activeFilter === 6) legendItems.push(LEGEND_EXTRAS[6]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.menuBtn}>
                        <MaterialIcons name="menu" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Hazard Map</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.langBtnActive}>
                        <Text style={styles.langTextActive}>EN</Text>
                    </TouchableOpacity>
                    <Text style={styles.langTextInactive}>ES</Text>
                </View>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
                <ImageBackground
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSLGyfyW-o77T-C9ImKS9NQzuHzWYuVe_t71AlM1-WVxysE5c0JVkWzfinJPkifSsqZ6iYTQmQkJ5p_xca8PFz-qDgN98TiTe0OxVxRISa39caIMddCaN2Zl40XGTCmPR6tVczcsPsFAjIeSw6M5szQUBmyjIDf2s0-AgJNahn0rNowOGwOSg2nofkw0t_kIRt_fDRRqk3B0RikELQKnRwjz5bK6FJr4jmAa-JV8HSGO5AwZSR5CjQ0FxDmiAtnZM93iaGVAEBqg' }}
                    style={styles.mapImage}
                    resizeMode="cover"
                >
                    {/* Search */}
                    <View style={styles.searchOverlay}>
                        <SearchBar placeholder="Search address or district..." showLocation />
                    </View>

                    {/* Legend */}
                    <View style={styles.legend}>
                        <Text style={styles.legendTitle}>HAZARD LEGEND</Text>
                        {legendItems.map((item, i) => (
                            <View key={i} style={styles.legendRow}>
                                {item.type === 'line' ? (
                                    <View style={[styles.legendLine, { backgroundColor: item.color }]} />
                                ) : item.type === 'arrow' ? (
                                    <MaterialIcons name="trending-flat" size={16} color={item.color} />
                                ) : (
                                    <View style={[styles.legendSquare, { backgroundColor: item.color }]} />
                                )}
                                <Text style={styles.legendLabel}>{item.label}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Hazard Markers */}
                    {showMarkers && MARKERS.map((m) => (
                        <TouchableOpacity
                            key={m.id}
                            style={[styles.marker, { backgroundColor: m.bg, top: m.top, left: m.left }]}
                            onPress={() => navigation?.navigate?.('HazardDetail')}
                        >
                            <MaterialIcons name={m.icon} size={20} color={m.color} />
                        </TouchableOpacity>
                    ))}

                    {/* Shelter Markers */}
                    {showShelters && SHELTER_MARKERS.map((m) => (
                        <View key={m.id} style={[styles.marker, { backgroundColor: m.bg, top: m.top, left: m.left }]}>
                            <MaterialIcons name={m.icon} size={20} color={m.color} />
                        </View>
                    ))}

                    {/* Zoom Controls */}
                    <View style={styles.zoomControls}>
                        <TouchableOpacity style={styles.zoomBtn}>
                            <MaterialIcons name="add" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.zoomBtn}>
                            <MaterialIcons name="remove" size={24} color={Colors.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.zoomBtn, styles.layerBtn]}>
                            <MaterialIcons name="layers" size={24} color={Colors.onPrimary} />
                        </TouchableOpacity>
                    </View>

                    {/* Filter Chips */}
                    <View style={styles.filterBar}>
                        <FilterChips
                            chips={HAZARD_FILTERS}
                            activeIndex={activeFilter}
                            onSelect={setActiveFilter}
                        />
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.surfaceDim,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: 'rgba(248,250,251,0.85)',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuBtn: {
        padding: 8,
        borderRadius: 20,
    },
    headerTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 18,
        color: Colors.primary,
        letterSpacing: -1,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    langBtnActive: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.primary + '33',
        backgroundColor: Colors.primary + '0D',
    },
    langTextActive: {
        fontFamily: 'Inter_700Bold',
        fontSize: 13,
        color: Colors.primary,
        letterSpacing: 1.5,
    },
    langTextInactive: {
        fontFamily: 'Inter_500Medium',
        fontSize: 13,
        color: Colors.outline,
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
        zIndex: 20,
    },
    legend: {
        position: 'absolute',
        top: 72,
        right: 16,
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: 16,
        padding: 14,
        width: 160,
        zIndex: 20,
        ...Shadows.md,
    },
    legendTitle: {
        fontFamily: 'Inter_900Black',
        fontSize: 10,
        letterSpacing: 2,
        color: Colors.onSurfaceVariant,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    legendSquare: {
        width: 16,
        height: 16,
        borderRadius: 3,
    },
    legendLine: {
        width: 16,
        height: 2,
    },
    legendLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 12,
        color: Colors.onSurface,
    },
    marker: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
        zIndex: 10,
    },
    zoomControls: {
        position: 'absolute',
        right: 16,
        bottom: 120,
        gap: 8,
        zIndex: 20,
    },
    zoomBtn: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: Colors.surfaceContainerLowest,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.md,
    },
    layerBtn: {
        backgroundColor: Colors.primary,
    },
    filterBar: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        zIndex: 20,
    },
});
