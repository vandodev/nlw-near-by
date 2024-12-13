import { useEffect, useState, useRef } from "react"
import { View, StatusBar, Text, Alert } from "react-native"
import { api } from "@/services/api"
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { Loading } from "@/components/loading"
import { Cover } from "@/components/market/cover"
import { Details, PropsDetails } from "@/components/market/details"
import { Coupon } from "@/components/market/coupon"

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [isLoading, setIsLoading] = useState(true)
  const params = useLocalSearchParams<{ id: string }>()
  const [coupon, setCoupon] = useState<string | null>(null)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
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
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Cover uri={data.cover} />  
      <Details data={data} />  
      {coupon && <Coupon code={coupon} />}
    </View>
  )
}