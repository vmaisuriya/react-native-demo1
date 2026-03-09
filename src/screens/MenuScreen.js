import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function MenuScreen({ navigation }) {
  const { batches, myBatchId } = useAppContext();
  
  const allBatchesCount = batches.length;
  const myBatchCount = myBatchId ? 1 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>OP</Text>
          </View>
          <Text style={styles.greeting}>Hi, Operator</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <FontAwesome5 name="sign-out-alt" size={20} color={theme.colors.gray[400]} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.startScanButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Scan', { context: 'claim' })}
        >
          <View style={styles.scanIconContainer}>
            <FontAwesome5 name="barcode" size={40} color={theme.colors.white} />
          </View>
          <Text style={styles.startScanText}>START SCAN</Text>
          <Text style={styles.startScanSub}>Tap to begin picking</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('MyBatches')}
          >
            <View style={styles.actionIconWrapper}>
              <FontAwesome5 name="clipboard-list" size={30} color={theme.colors.purple[500]} />
              {myBatchCount > 0 && (
                <View style={[styles.badge, { backgroundColor: theme.colors.red[500] }]}>
                  <Text style={styles.badgeText}>{myBatchCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.actionText}>My Batch</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('AllBatches')}
          >
            <View style={styles.actionIconWrapper}>
              <FontAwesome5 name="layer-group" size={30} color={theme.colors.orange[500]} />
              <View style={[styles.badge, { backgroundColor: theme.colors.gray[600] }]}>
                <Text style={styles.badgeText}>{allBatchesCount}</Text>
              </View>
            </View>
            <Text style={styles.actionText}>All Batches</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[200],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.gray[600],
  },
  greeting: {
    fontWeight: '600',
    color: theme.colors.gray[700],
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  startScanButton: {
    flex: 1,
    backgroundColor: theme.colors.brand[600], // Simple solid for now, or use expo-linear-gradient
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.brand[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scanIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  startScanText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 1,
  },
  startScanSub: {
    fontSize: 14,
    color: theme.colors.brand[100],
    marginTop: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    height: 128,
    gap: theme.spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  actionIconWrapper: {
    marginBottom: theme.spacing.sm,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionText: {
    fontWeight: '600',
    color: theme.colors.gray[700],
  },
});
