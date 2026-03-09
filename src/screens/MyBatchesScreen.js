import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function MyBatchesScreen({ navigation }) {
    const { batches, myBatchId } = useAppContext();
    const myBatch = batches.find(b => b.id === myBatchId);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {myBatch ? (
                    <TouchableOpacity 
                        style={[styles.card, styles.myBatchCard]}
                        onPress={() => navigation.navigate('BatchDetails', { batchId: myBatch.id })}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.batchTitle}>Batch {myBatch.id}</Text>
                            <View style={styles.tagsContainer}>
                                {myBatch.tags.map((tag, idx) => (
                                    <View key={idx} style={[styles.tag, { backgroundColor: theme.colors[tag.color][100], borderColor: theme.colors[tag.color][200] }]}>
                                        <Text style={[styles.tagText, { color: theme.colors[tag.color][700] }]}>{tag.text}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                  
                        <View style={styles.statsContainer}>
                            <View style={styles.statBox}>
                                <View style={styles.statLabelRow}>
                                    <FontAwesome5 name="shopping-cart" size={10} color={theme.colors.gray[500]} />
                                    <Text style={styles.statLabel}>Orders</Text>
                                </View>
                                <Text style={styles.statValue}>{myBatch.orders.length}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <View style={styles.statLabelRow}>
                                    <FontAwesome5 name="layer-group" size={10} color={theme.colors.gray[500]} />
                                    <Text style={styles.statLabel}>Items</Text>
                                </View>
                                <Text style={styles.statValue}>{myBatch.totalItems}</Text>
                            </View>
                            <View style={styles.statBox}>
                                <View style={styles.statLabelRow}>
                                    <FontAwesome5 name="print" size={10} color={theme.colors.gray[500]} />
                                    <Text style={styles.statLabel}>Printer</Text>
                                </View>
                                <Text style={styles.statValue}>#{myBatch.printerId}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.emptyContainer}>
                        <FontAwesome5 name="clipboard" size={48} color={theme.colors.gray[300]} style={{marginBottom: 16}} />
                        <Text style={styles.emptyText}>No active batch.</Text>
                        <Text style={styles.emptySubText}>Go to Start Scan to claim one.</Text>
                    </View>
                )}
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
        padding: theme.spacing.md,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: theme.colors.gray[600],
        fontWeight: 'bold',
    },
    emptySubText: {
        marginTop: theme.spacing.xs,
        color: theme.colors.gray[400],
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.xl,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    myBatchCard: {
        borderColor: theme.colors.brand[400],
        borderWidth: 2,
    },
    cardHeader: {
        marginBottom: theme.spacing.sm,
    },
    batchTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.gray[900],
        marginBottom: theme.spacing.xs,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.xs,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: theme.radius.sm,
        borderWidth: 1,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    statBox: {
        flex: 1,
        backgroundColor: theme.colors.gray[50],
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
    },
    statLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 10,
        color: theme.colors.gray[500],
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
    },
});
