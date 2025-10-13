// WebSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const InboxSkeleton = () => {
  return (
    <div style={{ padding: 16 }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Skeleton circle width={50} height={50} />
          <div style={{ marginLeft: 12, flex: 1 }}>
            <Skeleton width={150} height={15} />
            <Skeleton width={200} height={12} style={{ marginTop: 6 }} />
          </div>
          <Skeleton width={40} height={12} style={{ marginLeft: 8 }} />
        </div>
      ))}
    </div>
  );
};

export default InboxSkeleton;
