import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutSection = ({ aboutText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>About me</Text>
      <Text style={styles.aboutText}>{aboutText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#666',
  },
});

export default AboutSection;