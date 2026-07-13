import React, { useState } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TouchableOpacity, TextInput, Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme';

const CATEGORIES = [
    { icon: 'water-damage', label: 'Flooding' },
    { icon: 'block', label: 'Road Closure' },
    { icon: 'bolt', label: 'Power Outage' },
    { icon: 'local-fire-department', label: 'Wildfire', color: Colors.error },
    { icon: 'park', label: 'Tree' },
    { icon: 'waves', label: 'Earthquake', color: Colors.tertiary },
    { icon: 'tsunami', label: 'Tsunami' },
    { icon: 'landslide', label: 'Mudslide' },
];

export default function SubmitReportScreen({ navigation }) {
    const [selected, setSelected] = useState(null);
    const [description, setDescription] = useState('');

    return (
        <View style={styles.overlay}>
            <View style={styles.modal}>
                {/* Header */}
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Submit Report / Enviar reporte</Text>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => navigation?.goBack?.()}
                    >
                        <MaterialIcons name="close" size={24} color={Colors.onSurfaceVariant} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.body}>
                        {/* Category */}
                        <Text style={styles.sectionLabel}>SELECT CATEGORY</Text>
                        <View style={styles.catGrid}>
                            {CATEGORIES.map((cat, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={[styles.catItem, selected === i && styles.catItemActive]}
                                    onPress={() => setSelected(i)}
                                >
                                    <MaterialIcons
                                        name={cat.icon}
                                        size={32}
                                        color={cat.color || Colors.primary}
                                    />
                                    <Text style={styles.catLabel}>{cat.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Description */}
                        <View style={styles.descHeader}>
                            <Text style={styles.sectionLabel}>DESCRIPTION / DESCRIPCIÓN</Text>
                            <Text style={styles.charCount}>{description.length}/280</Text>
                        </View>
                        <TextInput
                            style={styles.textarea}
                            placeholder="Describe what you see / Describa lo que ve"
                            placeholderTextColor={Colors.outlineVariant}
                            multiline
                            maxLength={280}
                            value={description}
                            onChangeText={setDescription}
                        />

                        {/* Evidence & Location */}
                        <View style={styles.mediaRow}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.sectionLabel}>EVIDENCE</Text>
                                <TouchableOpacity style={styles.photoUpload}>
                                    <MaterialIcons name="photo-camera" size={32} color={Colors.outlineVariant} />
                                    <Text style={styles.photoText}>Add Photo / Añadir foto</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.sectionLabel}>LOCATION</Text>
                                <View style={styles.miniMap}>
                                    <Image
                                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDANabpwAdrrWYuuuHnIruqHZX4CeFcSi8ouOAPDEjmFjh9hELnJOAOeE1-vX8oVtmnUKUGJZfZJNBgdMIPv4wEoBxEfWdRv9Y6nwJ2rOvHu5L9Y-3G0t3B-oGaiALZBkwWxaiSVYlhm8D-lmq40QUPj9lMqfTktWjnHwUh1xOy0EKCVjBZShyniiUyLqEjkmSfL-dgLXpMITN_LXqJEOhJppAHY6shvZVXksoYw-0VlLqKTfCsrO_d6f2yZuAgqz7Vm3-N1gvyHw' }}
                                        style={styles.miniMapImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.mapPin}>
                                        <MaterialIcons name="location-on" size={28} color={Colors.error} />
                                    </View>
                                    <View style={styles.gpsLabel}>
                                        <Text style={styles.gpsText}>GPS: 34.0522° N, 118.2437° W</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity style={styles.submitBtn}>
                            <MaterialIcons name="send" size={20} color="#FFF" />
                            <Text style={styles.submitText}>Submit Report / Enviar reporte</Text>
                        </TouchableOpacity>
                        <Text style={styles.disclaimer}>
                            All reports are sent to the emergency operations center immediately
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: Colors.primary + '33',
        justifyContent: 'center',
        padding: 16,
    },
    modal: {
        flex: 1,
        backgroundColor: Colors.surfaceContainerLowest,
        borderRadius: 16,
        overflow: 'hidden',
        maxHeight: '95%',
        ...Shadows.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.outlineVariant + '26',
    },
    modalTitle: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        color: Colors.primary,
        letterSpacing: -0.3,
        flex: 1,
    },
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: { padding: 24, gap: 20 },
    sectionLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 11,
        color: Colors.outline,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    catGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    catItem: {
        width: '47%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 12,
        backgroundColor: Colors.surfaceContainerLow,
        borderWidth: 1,
        borderColor: Colors.outlineVariant + '26',
        gap: 8,
    },
    catItemActive: {
        borderColor: Colors.secondary,
        backgroundColor: Colors.secondaryContainer + '33',
    },
    catLabel: {
        fontFamily: 'Inter_700Bold',
        fontSize: 11,
        color: Colors.primary,
        textAlign: 'center',
    },
    descHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    charCount: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
        color: Colors.outlineVariant,
        marginBottom: 12,
    },
    textarea: {
        backgroundColor: Colors.surfaceContainerLow,
        borderRadius: 12,
        padding: 16,
        minHeight: 100,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: Colors.onSurface,
        textAlignVertical: 'top',
    },
    mediaRow: { flexDirection: 'row', gap: 16 },
    photoUpload: {
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.outlineVariant,
        backgroundColor: Colors.surfaceContainerLow,
        gap: 8,
    },
    photoText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 11,
        color: Colors.onSurfaceVariant,
    },
    miniMap: {
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: Colors.surfaceContainerHigh,
        position: 'relative',
    },
    miniMapImage: { width: '100%', height: '100%' },
    mapPin: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -14,
        marginTop: -28,
    },
    gpsLabel: {
        position: 'absolute',
        bottom: 6,
        left: 6,
        right: 6,
        backgroundColor: 'rgba(248,250,251,0.92)',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    gpsText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 9,
        color: Colors.primary,
    },
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryContainer,
        paddingVertical: 16,
        borderRadius: 12,
        gap: 10,
        ...Shadows.md,
        marginTop: 8,
    },
    submitText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 15,
        color: '#FFF',
    },
    disclaimer: {
        fontFamily: 'Inter_500Medium',
        fontSize: 10,
        color: Colors.outlineVariant,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: -0.3,
    },
});
