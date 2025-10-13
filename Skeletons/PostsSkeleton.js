// WebPostSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PostSkeleton = () => {
  return (
    <div style={{ padding: 16 }}>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ marginBottom: 30, borderBottom: '1px solid #ddd', paddingBottom: 16 }}>
          {/* رأس البوست */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <Skeleton circle width={40} height={40} />
            <div style={{ marginLeft: 12 }}>
              <Skeleton width={100} height={12} />
              <Skeleton width={60} height={10} style={{ marginTop: 4 }} />
            </div>
          </div>
          {/* محتوى البوست */}
          <Skeleton count={3} height={12} style={{ marginBottom: 6 }} />
          {/* صورة/فيديو */}
          <Skeleton height={150} style={{ marginTop: 8 }} />
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
