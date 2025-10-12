import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import InboxSkeleton from '../Skeletons/InboxSkeleton';

export const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true); // لما الشاشة تدخل focus، رجع الـ loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer); // تنظيف الـ timer عند الخروج من الشاشة
    }, [])
  );

  if (isLoading) return <InboxSkeleton />;

  return (
    <View style={{ padding: 16 }}>
      <Text>HomeScreen</Text>
    </View>
  );
};
