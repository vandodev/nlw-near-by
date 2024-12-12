import { useEffect, useState, useRef } from "react"
import { View, StatusBar, Text, Alert } from "react-native"
import { api } from "@/services/api"
import { router, useLocalSearchParams } from "expo-router"

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      console.log(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os dados", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Text>{params.id}</Text>     
    </View>
  )
}