import { runOnJS } from 'react-native-reanimated';
import { scanBarcodes, BarcodeFormat } from '@react-native-ml-kit/barcode-scanning';

export function createFrameProcessor(setBarcodes) {
    return (frame) => {
        'worklet';
        const barcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS]);
        if (barcodes.length > 0) {
            runOnJS(setBarcodes)(barcodes.map(b => b.displayValue));
        }
    };
}
