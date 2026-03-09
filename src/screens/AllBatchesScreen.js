import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function AllBatchesScreen({ navigation }) {
  const { batches, myBatchId } = useAppContext();
  
  const availableBatches = batches.filter(b => !b.assignedToMe && b.totalOrders > 0);
  const myBatch = batches.find(b => b.id === myBatchId);

  const renderBatchCard = (batch, isMyBatch = false) => (
    <TouchableOpacity 
      key={batch.id}
      style={[styles.card, isMyBatch && styles.myBatchCard]}
      onPress={() => navigation.navigate('BatchDetails', { batchId: batch.id })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.batchTitle}>Batch {batch.id}</Text>
        <View style={styles.tagsContainer}>
          {batch.tags.map((tag, idx) => (
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
          <Text style={styles.statValue}>{batch.orders.length}</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statLabelRow}>
            <FontAwesome5 name="layer-group" size={10} color={theme.colors.gray[500]} />
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <Text style={styles.statValue}>{batch.totalItems}</Text>
        </View>
        <View style={styles.statBox}>
          <View style={styles.statLabelRow}>
            <FontAwesome5 name="print" size={10} color={theme.colors.gray[500]} />
            <Text style={styles.statLabel}>Printer</Text>
          </View>
          <Text style={styles.statValue}>#{batch.printerId}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {myBatch && (
        <View style={styles.stickyHeader}>
          <Text style={styles.stickyTitle}>MY CURRENT BATCH</Text>
          {renderBatchCard(myBatch, true)}
        </View>
      )}
      <ScrollView contentContainerStyle={styles.listContent}>
        {availableBatches.length > 0 ? (
            availableBatches.map(b => renderBatchCard(b))
        ) : (
            <Text style={styles.emptyText}>No available batches.</Text>
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
  stickyHeader: {
    backgroundColor: theme.colors.brand[50],
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.brand[100],
    elevation: 2,
    zIndex: 10,
  },
  stickyTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.brand[600],
    marginBottom: theme.spacing.sm,
  },
  listContent: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
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
  emptyText: {
      textAlign: 'center',
      marginTop: 40,
      color: theme.colors.gray[500],
  }
});
