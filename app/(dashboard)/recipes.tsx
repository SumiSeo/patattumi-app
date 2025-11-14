import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import React from 'react'
import { StyleSheet } from 'react-native'

const recipes = () => {
  return (
    <ThemedView safe={true}>
      <ThemedText title>Recettes</ThemedText>
    </ThemedView>
  );
}

export default recipes

const styles = StyleSheet.create({})