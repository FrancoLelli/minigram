import { Colors } from '@/constants/Colors'
import { StyleSheet, TextInput, View } from 'react-native'

const InputSearch = ({onChangeText, text}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  )
}

export default InputSearch

const styles = StyleSheet.create({
  input:{
    borderColor: Colors.black,
    borderWidth: 1,
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  }
})