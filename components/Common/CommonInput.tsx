import { Colors } from '@/constants/Colors'
import { StyleSheet, TextInput } from 'react-native'

interface CommonInput {
  onChangeText: (text: string) => void,
  value: string,
  placeholder: string,
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  secureTextEntry?: boolean,
}

const CommonInput: React.FC<CommonInput> = ({ onChangeText, value, placeholder, autoCapitalize, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={Colors.black}
      onChangeText={onChangeText}
      placeholder={placeholder}
      value={value}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
    />
  )
}

export default CommonInput

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    borderColor: Colors.black,
    color: Colors.black,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
})