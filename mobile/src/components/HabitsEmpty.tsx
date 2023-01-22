import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'

export function HabitsEmpty() {
  const { navigate } = useNavigation();

  return <Text className="text-zinc-400 text-base text-center">

    Não há hábitos para este dia. {'\n'}
    Que tal {' '}

    <Text
      className="text-violet-400 text-base underline active:text-violet-500"
      onPress={() => navigate('new')}
    >cadastrar um novo hábito?</Text>
  </Text>
}
