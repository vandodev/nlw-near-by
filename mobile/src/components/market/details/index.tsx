import { View, Text } from "react-native"
import { s } from "./styles"
import { Info } from "@/components/market/info"
import { IconPhone, IconMapPin, IconTicket } from "@tabler/icons-react-native"

export type PropsDetails = {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}
type Props = {
  data: PropsDetails
}
export function Details({ data }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>

        <View style={s.group}>
            <Text style={s.title}>Regulamento</Text>
                {data.rules.map((item) => (
            <Text key={item.id} style={s.rule}>
                {`\u2022 ${item.description}`}
            </Text>
            ))}
        </View>
    </View>
  )
}