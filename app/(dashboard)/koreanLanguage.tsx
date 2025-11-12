import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'

const koreanLanguage = () => {
  return (
    <ThemedView safe={true}>
      <ThemedText title>Lanaugae</ThemedText>
    </ThemedView>
  );
}

export default koreanLanguage

const styles = StyleSheet.create({})