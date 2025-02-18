import {View, StyleSheet, TextInput, Text, Button, TouchableOpacity, Alert} from "react-native";
import {useState} from "react";
import axios from "axios";
import { login } from '../../config/api';
import * as SecureStore from 'expo-secure-store';
import {Redirect} from "expo-router";


export default function Login({ navigation }) {


    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const body = {
                phone: phoneNumber,
                password,
            }
            const data = await login(body);
            await SecureStore.setItemAsync('userToken', data.access_token);
            navigation.navigate('(tabs)');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to login');
        }
    };

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

