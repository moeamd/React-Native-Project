import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const FollowScreen = () => {

  const users = [
    { id: 1, name: 'Ethan Bosman', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jhon Adam', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: 3, name: 'Ethan Watson', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 4, name: 'Adien Matthew', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
    { id: 5, name: 'John Seba', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: 6, name: 'Kriston Watshon', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
    { id: 7, name: 'Jonshon Nonsap', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: 8, name: 'Ethan Johnsena', followers: '1,256 followers', image: 'https://randomuser.me/api/portraits/men/8.jpg' },
  ];

  // نستخدم for loop لتوليد العناصر
  const userCards = [];
  for (let i = 0; i < users.length; i++) {
    userCards.push(
      <View key={users[i].id} style={styles.card}>
        <Image source={{ uri: users[i].image }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{users[i].name}</Text>
          <Text style={styles.followers}>{users[i].followers}</Text>
        </View>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followText}>Follow</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover People</Text>
      </View>

      <ScrollView>{userCards}</ScrollView>

      {/* شريط التنقل السفلي */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>🏠</Text>
        <Text style={[styles.navItem, styles.active]}>👥</Text>
        <Text style={styles.navItem}>🔔</Text>
        <Text style={styles.navItem}>⚙️</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  followers: {
    color: 'gray',
    fontSize: 13,
  },
  followBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followText: {
    color: '#fff',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    fontSize: 22,
    opacity: 0.6,
  },
  active: {
    opacity: 1,
  },
});

export default FollowScreen;
