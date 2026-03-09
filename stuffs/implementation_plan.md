# Goal Description

Update the existing React Native `BuilderApp` to align with the new features introduced in [mockup_v2/builder.html](file:///d:/projects/demo/AI/mockup_v2/builder.html). This update involves adding an Exceptions management workflow, a Box Details screen, and expanding the mock data to include printer info and multi-box orders.

## Proposed Changes

### Context & State Management
#### [MODIFY] [AppContext.js](file:///d:/projects/demo/AI/BuilderApp/src/context/AppContext.js)
- Update [generateOrders](file:///d:/projects/demo/AI/mockup_v2/builder.html#579-610) to randomly assign exceptions (`isException`, `exceptionReason`) and generate "boxes" arrays for each order.
- Update `mockBatches` creation to include `printerId` and `printTime`.
- Add context functions: `markOrderAsException(orderId, batchId)`, `completeExceptionOrder(orderId)`, and `bulkCompleteBatch(batchId)`.

### Navigation Infrastructure
#### [MODIFY] [AppNavigator.js](file:///d:/projects/demo/AI/BuilderApp/src/navigation/AppNavigator.js)
- Add a new [Exceptions](file:///d:/projects/demo/AI/mockup_v2/builder.html#917-944) tab to the BottomTabNavigator.
- Add `ExceptionsScreen` and `BoxDetailsScreen` to the StackNavigator flows.

### Screens Implementation
#### [NEW] [ExceptionsScreen.js](file:///d:/projects/demo/AI/BuilderApp/src/screens/ExceptionsScreen.js)
- A new screen accessible from the bottom tab.
- Displays a flat list of all orders across batches that have `status === 'Exception'`.
- Tapping an item navigates to [OrderPicking](file:///d:/projects/demo/AI/mockup_v2/builder.html#750-785) in 'exceptions' mode.

#### [NEW] [BoxDetailsScreen.js](file:///d:/projects/demo/AI/BuilderApp/src/screens/BoxDetailsScreen.js)
- Displays details of a specific box selected from the [OrderPickingScreen](file:///d:/projects/demo/AI/BuilderApp/src/screens/OrderPickingScreen.js#7-68).
- Shows mock items corresponding to the box quantity.

#### [MODIFY] [BatchDetailsScreen.js](file:///d:/projects/demo/AI/BuilderApp/src/screens/BatchDetailsScreen.js)
- Add the Printer Info block (`printerId`, `printTime`).
- Ensure the "Mark Batch as Picked" button is present and functional using the new context method.

#### [MODIFY] [OrderPickingScreen.js](file:///d:/projects/demo/AI/BuilderApp/src/screens/OrderPickingScreen.js)
- Add the Exception Banner (red warning) if the order has an exception.
- Add the "Boxes for this Order" list section to navigate to `BoxDetailsScreen`.
- Wire up the "Add to Exception" button to flag the order and navigate back to the previous screen.

## Verification Plan

### Automated Tests
- Run `npm run web` to verify there are no compilation errors and navigation works.

### Manual Verification
- Start the app with Expo Go / Web and verify:
  1. Exception tab shows flagged orders.
  2. Clicking an order in the Exceptions tab allows completing it.
  3. Batch details show Printer info.
  4. Order Picking screen displays boxes, which lead to Box Details screen.
