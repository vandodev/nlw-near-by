import { View, Alert } from "react-native"
import { useEffect, useState } from "react"
import { Categories, CategoriesProps } from "@/components/categories"
import { Places } from "@/components/places"
import { PlaceProps } from "@/components/place"
import MapView from "react-native-maps"
import { api } from "@/services/api"

type MarketsProps = PlaceProps

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {

    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories() {
        try {
          const { data } = await api.get("/categories")
          setCategories(data)
          setCategory(data[0].id)
        } catch (error) {
          console.log(error)
          Alert.alert("Categorias", "Não foi possível carregar as categorias.")
        }
    }

    async function fetchMarkets() {
      try {
        if (!category) {
          return
        }
        const { data } = await api.get("/markets/category/" + category)
        setMarkets(data)
      } catch (error) {
        console.log(error)
        Alert.alert("Locais", "Não foi possível carregar os locais.")
      }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
      fetchMarkets()
    }, [category])
    
  
  return (
    <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView style={{ flex: 1 }} 
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      />

      <Places data={markets} />
    </View>
  )
}