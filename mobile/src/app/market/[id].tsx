import { View, StatusBar, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Text>{params.id}</Text>     
    </View>
  )
}