import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function SignIn() {

    // const [loadingUser, setLoadingUser] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [loaded, error] = useFonts({
        Dyna: require("../assets/fonts/DynaPuff.ttf"),
        PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    async function loginProcess() {
        if (!username) {
            console.log("Username is required");
            alert("Please enter a username.");
        } else if (!password) {
            console.log("Password is required");
            alert("Please enter a password.");
        } else {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            const request = await fetch("https://flameguard.loca.lt/FlameGuard/UserSignIn", {
                method: "POST",
                body: FormData,
            });

            if (request.ok) {
                const response = await request.json();
                console.log(response);
            } else {
                console.log("Response Error: " + request.status);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/appLogo_Hi.png')} style={styles.appLogo} />
            <Text style={[styles.title, { fontFamily: loaded ? "PoppinsBold" : "System" }]}>Login to Account</Text>
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.label}>Username <Text style={styles.textPrimary}>*</Text></Text>
                    <TextInput style={styles.input} selectionColor={'#FF3131'} onChangeText={(text) => { setUsername(text) }} />
                </View>
                <View>
                    <Text style={styles.label}>Password <Text style={styles.textPrimary}>*</Text></Text>
                    <TextInput style={styles.input} selectionColor={'#FF3131'} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.6} onPress={() => router.replace("./signUp")}>
                    <Text style={styles.textPrimary}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.6} onPress={loginProcess}>
                    <Text style={styles.textWhite}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                width: '90%',
                height: 1,
                backgroundColor: '#272727',
                marginVertical: 20,
                opacity: 0.5,
            }} />

            <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.navigationText}>Login as Fire Department</Text>
            </TouchableOpacity>

            <StatusBar backgroundColor={'#0A1421'} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ECECEC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appLogo: {
        maxWidth: '40%',
        objectFit: 'contain'
    },
    title: {
        fontSize: 24,
        color: '#272727'
    },
    label: {
        color: '#272727'
    },
    input: {
        borderWidth: 1,
        borderColor: '#696969',
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    inputContainer: {
        gap: 10,
        width: '100%',
        paddingHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        marginTop: 20
    },
    buttonSecondary: {
        borderWidth: 1,
        borderColor: '#FF3131',
        width: '50%',
        borderRadius: 100,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonPrimary: {
        backgroundColor: '#FF3131',
        width: '50%',
        borderRadius: 100,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPrimary: {
        color: '#FF3131'
    },
    textWhite: {
        color: '#ECECEC'
    },
    navigationText: {
        textDecorationLine: 'underline'
    }
});