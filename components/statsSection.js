import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStats = ({ posts, photos, followers, following }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{posts}</Text>
        <Text style={styles.statLabel}>Post</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{photos}</Text>
        <Text style={styles.statLabel}>Photos</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{followers}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{following}</Text>
        <Text style={styles.statLabel}>Following</Text>
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