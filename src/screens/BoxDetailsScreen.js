import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';

export default function BoxDetailsScreen({ route, navigation }) {
    const { order, boxId } = route.params;

    // Find the box data
    const box = order.boxes?.find(b => b.id === boxId);
    
    if (!box) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Box not found</Text>
            </SafeAreaView>
        );
    }

    const boxNumber = boxId.split('-')[1] || boxId;

    // Generate mock items for details to match mockup_v2
    const items = Array.from({ length: box.items }).map((_, i) => ({
        id: `ITEM-${i}`,
        name: `Widget ${String.fromCharCode(65 + (i % 5))}`,
        sku: `SKU-0${i + 1}00`,
        qty: 1
    }));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <FontAwesome5 name="arrow-left" size={20} color={theme.colors.gray[500]} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.boxSummaryCard}>
                    <Text style={styles.boxTitle}>Box {boxNumber}</Text>
                    <Text style={styles.boxSubtitle}>Items: {box.items}</Text>
                </View>

                <View style={styles.itemsList}>
                    {items.map((item, i) => (
                        <View key={i} style={styles.itemCard}>
                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemSku}>{item.sku}</Text>
                            </View>
                            <View style={styles.itemQtyBadge}>
                                <Text style={styles.itemQtyText}>Qty: {item.qty}</Text>
                            </View>
                        </View>
                    ))}
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
    header: {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 8,
        fontSize: 16,
        color: theme.colors.gray[600],
    },
    content: {
        padding: 24,
    },
    boxSummaryCard: {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
    },
    boxTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
        marginBottom: 4,
    },
    boxSubtitle: {
        fontSize: 14,
        color: theme.colors.gray[500],
        fontWeight: '500',
    },
    itemsList: {
        gap: 12,
    },
    itemCard: {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
    },
    itemSku: {
        fontSize: 12,
        color: theme.colors.gray[400],
        marginTop: 2,
    },
    itemQtyBadge: {
        backgroundColor: theme.colors.gray[100],
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    itemQtyText: {
        fontWeight: 'bold',
        color: theme.colors.gray[700],
        fontSize: 14,
    }
});
