import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../theme';
import { useAppContext } from '../context/AppContext';

export default function ScanScreen({ navigation, route }) {
  const { claimRandomBatch, myBatchId, batches } = useAppContext();
  const context = route.params?.context || 'claim';
  const batchId = route.params?.batchId;

  const handleSimulateScan = () => {
    if (context === 'claim') {
      if (!myBatchId) {
        const assignedId = claimRandomBatch();
        if (assignedId) {
            navigation.replace('BatchDetails', { batchId: assignedId });
        } else {
            alert("No batches available to claim!");
        }
      } else {
        navigation.replace('BatchDetails', { batchId: myBatchId });
      }
    } else if (context === 'batch_order') {
        const batch = batches.find(b => b.id === batchId);
        if (batch) {
            const nextOrder = batch.orders.find(o => o.status === 'Pending');
            if (nextOrder) {
                navigation.replace('OrderPicking', { batchId: batch.id, orderId: nextOrder.id });
            } else {
                alert("No pending orders in this batch.");
                navigation.goBack();
            }
        }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.manualEntry}>
          <Text style={styles.label}>Manual Entry</Text>
          <View style={styles.inputRow}>
            <TextInput 
              style={styles.input}
              placeholder={context === 'claim' ? "Enter Batch ID" : "Enter Order ID"}
            />
            <TouchableOpacity style={styles.submitBtn}>
              <FontAwesome5 name="arrow-right" color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scannerArea}>
          <Text style={styles.scanText}>Tap barcode to simulate scan</Text>
          <TouchableOpacity onPress={handleSimulateScan} style={styles.simBarcode}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EAN13.svg/1200px-EAN13.svg.png' }}
              style={styles.barcodeImg}
              resizeMode="contain"
            />
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
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  manualEntry: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gray[700],
    marginBottom: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    height: 50,
  },
  submitBtn: {
    backgroundColor: theme.colors.gray[800],
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerArea: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  scanText: {
    color: theme.colors.gray[500],
  },
  simBarcode: {
    width: 250,
    height: 120,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    borderStyle: 'dashed',
    borderRadius: theme.radius.xl,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeImg: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  }
});
