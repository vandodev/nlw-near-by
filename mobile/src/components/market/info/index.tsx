import { Text, View } from "react-native"
import { Icon, IconProps } from "@tabler/icons-react-native"
import { s } from "./styles"
import { colors } from "@/styles/theme"

type Props = {
  description: string
  icon: React.ComponentType<IconProps>
}

export function Info({ icon: Icon, description }: Props) {
  return (
    <View style={s.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={s.text}>{description}</Text>
    </View>
  )
}