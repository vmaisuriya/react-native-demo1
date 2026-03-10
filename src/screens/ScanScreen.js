import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { createFrameProcessor } from './BarcodeScannerFrameProcessor';

export default function BarcodeScannerScreen() {
  const camera = useRef(null);

  // Step 5: Camera permission state
  const [cameraPermission, setCameraPermission] = useState('not-determined');
  const [barcodes, setBarcodes] = useState([]);

  // Step 5: Request permission on component mount
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status);
    })();
  }, []);

  const frameProcessor = createFrameProcessor(setBarcodes);

  if (cameraPermission !== 'authorized') {
    return <Text>Camera Permission Required</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={Camera.getAvailableCameraDevices()[0]}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      <View style={styles.overlay}>
        {barcodes.map((code, i) => (
          <Text key={i} style={styles.code}>{code}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { position: 'absolute', top: 50, left: 20 },
  code: { color: 'white', fontSize: 18, marginVertical: 2 },
});
