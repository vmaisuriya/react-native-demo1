import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function ExceptionsScreen({ navigation }) {
    const { batches } = useAppContext();

    const getExceptions = () => {
        let exceptions = [];
        batches.forEach(b => {
            b.orders.filter(o => o.status === 'Exception').forEach(o => {
                exceptions.push({ ...o, batchId: b.id });
            });
        });
        return exceptions;
    };

    const exceptions = getExceptions();

    const renderException = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('HomeStack', { 
                screen: 'OrderPicking', 
                params: { order: item, batchId: item.batchId, fromExceptions: true } 
            })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <View style={styles.exceptionTag}>
                    <Text style={styles.exceptionTagText}>Exception</Text>
                </View>
            </View>
            
            <Text style={styles.reasonText}>Reason: {item.exceptionReason || 'System Flagged'}</Text>
            
            <View style={styles.cardFooter}>
                <Text style={styles.footerText}>Items: {item.qty}</Text>
                <Text style={styles.footerText}>Batch: {item.batchId}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Builder Exceptions</Text>
            </View>

            {exceptions.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No exceptions reported.</Text>
                </View>
            ) : (
                <FlatList
                    data={exceptions}
                    keyExtractor={item => item.id}
                    renderItem={renderException}
                    contentContainerStyle={styles.listContainer}
                />
            )}
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
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.red[500],
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.gray[800],
    },
    exceptionTag: {
        backgroundColor: theme.colors.red[50],
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.red[100],
    },
    exceptionTagText: {
        color: theme.colors.red[600],
        fontSize: 10,
        fontWeight: 'bold',
    },
    reasonText: {
        fontSize: 14,
        color: theme.colors.red[600],
        fontWeight: '500',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 12,
        color: theme.colors.gray[500],
        fontWeight: '500',
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        textAlign: 'center',
        color: theme.colors.gray[500],
        fontSize: 16,
    }
});
