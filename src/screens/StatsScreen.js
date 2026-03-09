import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Stats</Text>
          <Text style={styles.subtitle}>Today's Performance</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: theme.colors.blue[50] }]}>
              <FontAwesome5 name="boxes" size={16} color={theme.colors.blue[600]} />
            </View>
            <Text style={styles.value}>47</Text>
            <Text style={styles.label}>ITEMS PICKED</Text>
          </View>

          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: theme.colors.purple[100] }]}>
              <FontAwesome5 name="bullseye" size={16} color={theme.colors.purple[600]} />
            </View>
            <Text style={styles.value}>98.5%</Text>
            <Text style={styles.label}>ACCURACY</Text>
          </View>

          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: theme.colors.orange[50] }]}>
              <FontAwesome5 name="clock" size={16} color={theme.colors.orange[600]} />
            </View>
            <Text style={styles.value}>4.2</Text>
            <Text style={styles.label}>AVG TIME (MIN)</Text>
          </View>

          <View style={styles.card}>
            <View style={[styles.iconWrapper, { backgroundColor: theme.colors.green[50] }]}>
              <FontAwesome5 name="check-double" size={16} color={theme.colors.green[600]} />
            </View>
            <Text style={styles.value}>12</Text>
            <Text style={styles.label}>ORDERS DONE</Text>
          </View>
        </View>
        
        <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Hourly Output</Text>
            <View style={styles.chartArea}>
                {/* Mock Chart representation */}
                <View style={[styles.bar, { height: '40%', backgroundColor: theme.colors.brand[100]}]} />
                <View style={[styles.bar, { height: '60%', backgroundColor: theme.colors.brand[200]}]} />
                <View style={[styles.bar, { height: '85%', backgroundColor: theme.colors.brand[500]}]} />
                <View style={[styles.bar, { height: '50%', backgroundColor: theme.colors.brand[300]}]} />
            </View>
            <View style={styles.chartLabels}>
                <Text style={styles.chartLabel}>9AM</Text>
                <Text style={styles.chartLabel}>10AM</Text>
                <Text style={styles.chartLabel}>11AM</Text>
                <Text style={styles.chartLabel}>12PM</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.gray[800],
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.gray[500],
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.green[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.green[100],
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.green[500],
  },
  liveText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.green[700],
  },
  content: {
    padding: theme.spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.gray[800],
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.gray[400],
  },
  chartCard: {
      marginTop: theme.spacing.lg,
      backgroundColor: theme.colors.white,
      padding: theme.spacing.md,
      borderRadius: theme.radius.xl,
      borderWidth: 1,
      borderColor: theme.colors.gray[100],
  },
  chartTitle: {
      fontWeight: 'bold',
      color: theme.colors.gray[800],
      marginBottom: theme.spacing.md,
  },
  chartArea: {
      height: 120,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: theme.spacing.sm,
  },
  bar: {
      flex: 1,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
  },
  chartLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing.sm,
  },
  chartLabel: {
      fontSize: 10,
      color: theme.colors.gray[400]
  }
});
