import {View, StyleSheet, TextInput, Text, Button, TouchableOpacity, Alert} from "react-native";
import {useState} from "react";
import axios from "axios";
import {URL} from "../../config/const";
import * as SecureStore from 'expo-secure-store';
import {router} from "expo-router";



export default function Login({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState("998911234569");
    const [password, setPassword] = useState("12345678");
    const handleLogin = async () => {
                try {
                    const res = await axios(`${URL}auth/login`, {
                        method: 'post',
                        data: { phone: phoneNumber, password: password },
                    })
                    if (res.status === 200) {
                        await SecureStore.setItemAsync('accessToken', res.data.access_token);
                        router.replace('(tabs)');
                    }
                }
                catch (error) {
                    Alert.alert('Ошибка', 'Неверный номер телефона или пароль');
                }
        }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>
            <TextInput
                style={styles.input}
                placeholder="+998 xx xxx xx xx"
                keyboardType="phone-pad"
                maxLength={17}
                placeholderTextColor="gray"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                placeholderTextColor="gray"
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#e0f7fa',
        borderRadius: 8,
        color: 'black',
    },
    button: {
        backgroundColor: 'darkblue',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

