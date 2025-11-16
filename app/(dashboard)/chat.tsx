import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'

const chat = () => {
  return (
    <ThemedView safe={true}>
      <ThemedText title>Chat</ThemedText>
    </ThemedView>
  );
}

export default chat

const styles = StyleSheet.create({})