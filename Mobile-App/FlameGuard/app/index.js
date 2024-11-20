import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function App() {

    const [loaded, error] = useFonts({
        Dyna: require("../assets/fonts/DynaPuff.ttf"),
        PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    });

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await AsyncStorage.getItem("user");
                if (user != null && user !== "") {
                    router.replace("./home");
                    console.log("User found");
                } else {
                    console.log("User not found");
                }
            } catch (e) {
                console.log(e);
            }
        };

        checkUser();
    }, []);

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    // if (loadingUser) {
    //     return null;
    // }

    return (
        <View style={styles.container}>
            <View style={[styles.mainContent]}>
                <View style={styles.centerSection}>
                    <Image source={require('../assets/images/appLogo_Hi.png')} style={styles.img} />
                    <Text style={[styles.textWhite, styles.title, { fontFamily: loaded ? "Dyna" : "System" }]}>Flame Guard</Text>
                    <Text style={[styles.textWhite, styles.subTitle, { fontFamily: loaded ? "PoppinsRegular" : "System", opacity: 0.5 }]}>Your Safety Our Priority</Text>
                </View>
                <View>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity activeOpacity={0.75} onPress={() => { router.replace("./signIn"); }} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={[styles.button, { fontFamily: loaded ? "PoppinsMedium" : "System" }]}>Enter SafeZone</Text>
                        </TouchableOpacity>
                        <Text style={[styles.subTitle, { fontFamily: loaded ? "PoppinsRegular" : "System", opacity: 0.5, textAlign: 'center' }]}>FlameGuard: Enhancing fire safety with real-time alerts and community protection. Stay vigilant, stay safe.</Text>
                    </View>
                </View>
            </View>
            <StatusBar backgroundColor={'#0A1421'} />
        </View>
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
    mainContent: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    btnContainer: {
        gap: 40,
        marginTop: 20
    },
    signBtn: {
        borderRadius: 25,
        height: 50,
        width: 160,
        fontSize: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUp: {
        borderColor: '#0054C2',
        borderWidth: 2
    },
    title: {
        fontSize: 24,
    },
    subTitle: {

    },
    img: {
        maxWidth: '40%',
        objectFit: 'contain'
    },
    button: {
        backgroundColor: '#FF3131',
        color: '#ECECEC',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100
    },
    centerSection: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});