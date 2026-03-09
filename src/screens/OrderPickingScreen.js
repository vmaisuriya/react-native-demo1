import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function OrderPickingScreen({ route, navigation }) {
    const { batches, completeOrder, markOrderAsException } = useAppContext();
    const batchId = route.params?.batchId;
    const orderId = route.params?.orderId;
    const fromExceptions = route.params?.fromExceptions;
    
    const batch = batches.find(b => b.id === batchId);
    if (!batch) return null;
    
    const order = batch.orders.find(o => o.id === orderId);
    if (!order) return null;

    const handleComplete = () => {
        completeOrder(batch.id, order.id);
        navigation.goBack(); 
    };

    const handleException = () => {
        Alert.alert(
            "Report Exception",
            "Are you sure you want to flag this order?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Confirm", style: "destructive", onPress: () => {
                    markOrderAsException(batch.id, order.id, "User Flagged");
                    navigation.goBack();
                }}
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.metaLabel}>PICKING ORDER</Text>
                    <Text style={styles.orderIdTitle}>#{order.id}</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: theme.colors.purple[100], borderColor: theme.colors.purple[200] }]}>
                    <Text style={[styles.tagText, { color: theme.colors.purple[700] }]}>{order.tag}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {order.exception && (
                    <View style={styles.exceptionBanner}>
                        <Text style={styles.exceptionBannerTitle}>⚠ Exception Reported</Text>
                        <Text style={styles.exceptionBannerReason}>Reason: {order.exceptionReason}</Text>
                    </View>
                )}

                <View style={styles.boxesListContainer}>
                    <Text style={styles.boxesSectionTitle}>Boxes for this Order</Text>
                    {order.boxes?.map((box, idx) => (
                        <TouchableOpacity 
                            key={idx} 
                            style={styles.boxItemCard}
                            onPress={() => navigation.navigate('HomeStack', { screen: 'BoxDetails', params: { order, boxId: box.id } })}
                        >
                            <View style={styles.boxItemLeft}>
                                <FontAwesome5 name="box-open" size={20} color={theme.colors.brand[500]} />
                                <Text style={styles.boxItemTitle}>Box {idx + 1}</Text>
                            </View>
                            <Text style={styles.boxItemQty}>Items: {box.items} / {order.qty}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.qtyContainer}>
                    <Text style={styles.qtyLabel}>TOTAL ITEMS</Text>
                    <Text style={styles.qtyValue}>{order.qty}</Text>
                    <Text style={styles.qtySub}>Pieces to pick</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.completeBtn}
                        onPress={handleComplete}
                    >
                        <FontAwesome5 name="check-circle" size={24} color={theme.colors.white} />
                        <Text style={styles.completeText}>Complete Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.exceptionBtn}
                        onPress={handleException}
                    >
                        <FontAwesome5 name="exclamation-triangle" size={16} color={theme.colors.red[500]} />
                        <Text style={styles.exceptionText}>Add to Exception</Text>
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
    header: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[200],
    },
    metaLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.colors.gray[500],
    },
    orderIdTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.gray[900],
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: theme.radius.full,
        borderWidth: 1,
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.xl,
    },
    boxesListContainer: {
        marginBottom: theme.spacing.xl,
    },
    boxesSectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.gray[500],
        textTransform: 'uppercase',
        marginBottom: theme.spacing.md,
    },
    boxItemCard: {
        backgroundColor: theme.colors.gray[50],
        borderWidth: 1,
        borderColor: theme.colors.gray[200],
        borderRadius: theme.radius.xl,
        padding: theme.spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    boxItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    boxItemTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme.colors.gray[800],
    },
    boxItemQty: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.gray[500],
    },
    exceptionBanner: {
        backgroundColor: theme.colors.red[50],
        borderColor: theme.colors.red[200],
        borderWidth: 1,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    exceptionBannerTitle: {
        fontWeight: 'bold',
        color: theme.colors.red[700],
        marginBottom: 4,
    },
    exceptionBannerReason: {
        fontSize: 14,
        color: theme.colors.red[600],
    },
    qtyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl,
    },
    qtyLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.gray[400],
        letterSpacing: 2,
    },
    qtyValue: {
        fontSize: 80,
        fontWeight: '900',
        color: theme.colors.gray[800],
        marginVertical: theme.spacing.sm,
    },
    qtySub: {
        fontSize: 16,
        color: theme.colors.gray[400],
    },
    actions: {
        marginTop: 'auto',
        gap: theme.spacing.md,
    },
    completeBtn: {
        backgroundColor: theme.colors.green[500],
        paddingVertical: theme.spacing.lg,
        borderRadius: theme.radius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
        shadowColor: theme.colors.green[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    completeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.white,
    },
    exceptionBtn: {
        backgroundColor: theme.colors.white,
        borderWidth: 2,
        borderColor: theme.colors.red[100],
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radius.xl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.sm,
    },
    exceptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.red[500],
    }
});
