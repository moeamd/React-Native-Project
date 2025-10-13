import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStats = ({ posts, followers, following }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>Posts</Text>
        <Text style={styles.statNumber}>{posts}</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>Followers</Text>
        <Text style={styles.statNumber}>{followers}</Text>
      </View>
        <View style={styles.statItem}>
        <Text style={styles.statNumber}>Following</Text>
        <Text style={styles.statNumber}>{following ?? 0 }</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ProfileStats;