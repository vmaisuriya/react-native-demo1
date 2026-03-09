import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const boxSizes = ['8x8x6', '10x8x6', '12x12x8', '6x6x4'];
  const orderTags = ['VIP', 'Normal', 'Express'];

  const generateTags = () => {
    const tags = [];
    if (Math.random() > 0.5) tags.push({ text: 'In Progress', color: 'blue' });
    const priority = Math.random();
    if (priority > 0.7) tags.push({ text: 'High', color: 'red' });
    else if (priority > 0.4) tags.push({ text: 'Standard', color: 'gray' });

    if (tags.length === 0) tags.push({ text: 'Pending', color: 'yellow' });
    return tags;
  };

  const exceptionReasons = ['Missing Item', 'Damaged Packaging', 'Wrong Barcode', 'Quality Issue'];
  
  const generateOrders = (count) => {
    return Array.from({ length: count }, (_, i) => {
      const isException = Math.random() > 0.8; // 20% probability for exceptions
      const qty = Math.floor(Math.random() * 10) + 2;

      const numBoxes = Math.random() > 0.5 ? 2 : 1;
      const boxes = [];
      let remaining = qty;
      for (let b = 1; b <= numBoxes; b++) {
          if (b === numBoxes) {
              boxes.push({ id: `BOX-${b}`, items: remaining });
          } else {
              const items = Math.max(1, Math.floor(remaining / 2));
              boxes.push({ id: `BOX-${b}`, items: items });
              remaining -= items;
          }
      }

      return {
        id: `ORD-${1000 + i + Math.floor(Math.random() * 100)}`,
        qty: qty,
        boxSize: boxSizes[Math.floor(Math.random() * boxSizes.length)],
        tag: orderTags[Math.floor(Math.random() * orderTags.length)],
        status: isException ? 'Exception' : 'Pending', // Pending, Completed, Exception
        exception: isException,
        exceptionReason: isException ? exceptionReasons[Math.floor(Math.random() * exceptionReasons.length)] : null,
        boxes: boxes
      };
    });
  };

  const initialBatches = Array.from({ length: 12 }, (_, i) => {
    const totalOrders = Math.floor(Math.random() * 8) + 1;
    return {
      id: `240${i + 1}`,
      totalOrders: totalOrders,
      orders: generateOrders(totalOrders),
      totalItems: Math.floor(Math.random() * 30) + 5,
      printerId: Math.floor(Math.random() * 5) + 1,
      printTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignedToMe: false,
      tags: generateTags()
    };
  });

  const [batches, setBatches] = useState(initialBatches);
  const [myBatchId, setMyBatchId] = useState(null);

  const claimBatch = (batchId) => {
    setBatches(prev => prev.map(b => {
        if (b.id === batchId) {
            return {
                ...b,
                assignedToMe: true,
                tags: [{ text: 'In Progress', color: 'blue' }, ...b.tags.filter(t => t.text !== 'In Progress')]
            }
        }
        return b;
    }));
    setMyBatchId(batchId);
  }

  const claimRandomBatch = () => {
      const available = batches.filter(b => !b.assignedToMe);
      if (available.length > 0) {
          const randomBatch = available[Math.floor(Math.random() * available.length)];
          claimBatch(randomBatch.id);
          return randomBatch.id;
      }
      return null;
  }

  const completeOrder = (batchId, orderId) => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          orders: b.orders.map(o => o.id === orderId ? { ...o, status: 'Completed' } : o)
        }
      }
      return b;
    }));
  }

  const markOrderAsException = (batchId, orderId, reason = "System Flagged") => {
    setBatches(prev => prev.map(b => {
      if (b.id === batchId) {
        return {
          ...b,
          orders: b.orders.map(o => o.id === orderId ? { ...o, status: 'Exception', exception: true, exceptionReason: reason } : o)
        }
      }
      return b;
    }));
  }

  const bulkCompleteBatch = (batchId) => {
      setBatches(prev => prev.map(b => {
        if (b.id === batchId) {
          return {
            ...b,
            orders: b.orders.map(o => ({ ...o, status: 'Completed', exception: false })),
            assignedToMe: false // Release the batch from me
          }
        }
        return b;
      }));
      if (myBatchId === batchId) {
          setMyBatchId(null);
      }
  }

  return (
    <AppContext.Provider value={{
      batches, myBatchId, claimBatch, claimRandomBatch, completeOrder,
      markOrderAsException, bulkCompleteBatch
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
