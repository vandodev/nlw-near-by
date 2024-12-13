import { useEffect, useState, useRef } from "react"
import { View, StatusBar, Text, Modal, Alert } from "react-native"
import { api } from "@/services/api"
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { Loading } from "@/components/loading"
import { Cover } from "@/components/market/cover"
import { Details, PropsDetails } from "@/components/market/details"
import { Coupon } from "@/components/market/coupon"
import { Button } from "@/components/button"
import { useCameraPermissions, CameraView } from "expo-camera"

type DataProps = PropsDetails & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [isLoading, setIsLoading] = useState(true)
  const params = useLocalSearchParams<{ id: string }>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [_, requestPermission] = useCameraPermissions()

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

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()
      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
      }
      // qrLock.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Câmera", "Não foi possível utilizar a câmera")
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

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}            
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}