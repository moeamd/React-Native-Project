// WebProfileSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileSkeleton = () => {
  return (
    <div style={{ padding: 16 }}>
      {/* صورة البروفايل */}
      <Skeleton circle width={80} height={80} />
      <Skeleton width={200} height={20} style={{ marginTop: 12 }} />
      <Skeleton width={150} height={15} style={{ marginTop: 6 }} />

      {/* بعض المعلومات أو stats */}
      <div style={{ display: 'flex', marginTop: 20, gap: 20 }}>
        <Skeleton width={60} height={15} />
        <Skeleton width={60} height={15} />
        <Skeleton width={60} height={15} />
      </div>

      {/* البوستات في البروفايل */}
      <div style={{ marginTop: 30 }}>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} height={120} style={{ marginBottom: 20 }} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
