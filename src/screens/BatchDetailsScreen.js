import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function BatchDetailsScreen({ route, navigation }) {
    const { batches, bulkCompleteBatch } = useAppContext();
    const batchId = route.params?.batchId;
    const batch = batches.find(b => b.id === batchId);

    if (!batch) return null;

    const completedOrders = batch.orders.filter(o => o.status === 'Completed').length;
    const progress = Math.round((completedOrders / batch.orders.length) * 100);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerCard}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>Batch {batch.id}</Text>
                        <View style={styles.tagsContainer}>
                            {batch.tags.map((tag, idx) => (
                                <View key={idx} style={[styles.tag, { backgroundColor: theme.colors[tag.color][100], borderColor: theme.colors[tag.color][200] }]}>
                                    <Text style={[styles.tagText, { color: theme.colors[tag.color][700] }]}>{tag.text}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.progressContainer}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Progress</Text>
                            <Text style={styles.progressPercent}>{progress}%</Text>
                        </View>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>
                        <Text style={styles.progressSub}>{completedOrders} of {batch.orders.length} orders completed</Text>
                    </View>

                    <View style={styles.printerInfo}>
                        <View style={styles.printerIconWrapper}>
                            <FontAwesome5 name="print" color={theme.colors.gray[500]} />
                        </View>
                        <View>
                            <Text style={styles.metaLabel}>Printer</Text>
                            <Text style={styles.metaValue}>#{batch.printerId}</Text>
                        </View>
                        <View style={styles.flexRight}>
                            <Text style={styles.metaLabel}>Printed</Text>
                            <Text style={styles.metaValue}>{batch.printTime}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCol}>
                        <Text style={styles.statBig}>{batch.orders.length}</Text>
                        <Text style={styles.statSmall}>TOTAL ORDERS</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statCol}>
                        <Text style={styles.statBig}>{batch.totalItems}</Text>
                        <Text style={styles.statSmall}>TOTAL ITEMS</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.scanNextBtn}
                        onPress={() => navigation.navigate('Scan', { context: 'batch_order', batchId: batch.id })}
                    >
                        <View style={styles.scanNextContent}>
                            <View style={styles.scanIconBg}>
                                <FontAwesome5 name="qrcode" size={20} color={theme.colors.white} />
                            </View>
                            <Text style={styles.scanNextText}>Scan Next Order</Text>
                        </View>
                        <FontAwesome5 name="chevron-right" size={16} color={theme.colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.markPickedBtn}
                        onPress={() => {
                            Alert.alert(
                                "Mark Batch as Picked",
                                "Are you sure you want to mark the entire batch as picked?",
                                [
                                    { text: "Cancel", style: "cancel" },
                                    { text: "Confirm", style: "destructive", onPress: () => {
                                        bulkCompleteBatch(batch.id);
                                        navigation.navigate('Menu');
                                    }}
                                ]
                            );
                        }}
                    >
                        <FontAwesome5 name="check-double" color={theme.colors.orange[600]} />
                        <Text style={styles.markPickedText}>Mark Batch as Picked</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray[50],
    },
    content: {
        paddingBottom: theme.spacing.xl,
    },
    headerCard: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.gray[900],
    },
    tagsContainer: {
        alignItems: 'flex-end',
        gap: 4,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: theme.radius.sm,
        borderWidth: 1,
    },
    tagText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    progressContainer: {
        marginBottom: theme.spacing.lg,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.gray[700],
    },
    progressPercent: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.brand[600],
    },
    progressBarBg: {
        height: 12,
        backgroundColor: theme.colors.gray[200],
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: theme.colors.brand[500],
    },
    progressSub: {
        fontSize: 12,
        color: theme.colors.gray[500],
        textAlign: 'right',
        marginTop: 4,
    },
    printerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.gray[50],
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        gap: theme.spacing.md,
    },
    printerIconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
    },
    metaLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.colors.gray[500],
        textTransform: 'uppercase',
    },
    metaValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
    },
    flexRight: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        marginVertical: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.gray[200],
    },
    statCol: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        backgroundColor: theme.colors.gray[100],
    },
    statBig: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
    },
    statSmall: {
        fontSize: 10,
        color: theme.colors.gray[500],
        textTransform: 'uppercase',
    },
    actions: {
        padding: theme.spacing.lg,
        gap: theme.spacing.md,
    },
    scanNextBtn: {
        backgroundColor: theme.colors.brand[600],
        borderRadius: theme.radius.xl,
        padding: theme.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: theme.colors.brand[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    scanNextContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    scanIconBg: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: theme.radius.md,
    },
    scanNextText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    markPickedBtn: {
        backgroundColor: theme.colors.orange[50],
        borderWidth: 1,
        borderColor: theme.colors.orange[200],
        borderRadius: theme.radius.xl,
        padding: theme.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    markPickedText: {
        color: theme.colors.orange[600],
        fontSize: 16,
        fontWeight: 'bold',
    }
});
