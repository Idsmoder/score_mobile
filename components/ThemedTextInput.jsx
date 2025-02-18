import {TextInput,StyleSheet} from "react-native";

export default function ThemedTextInput({ style, ...props }) {
    return <TextInput style={[styles.textInput, style]} {...props} />;
}
const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    }
});
