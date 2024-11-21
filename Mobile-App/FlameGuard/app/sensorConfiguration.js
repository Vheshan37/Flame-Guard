import { PermissionsAndroid, Platform, Button, Image, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from "expo-status-bar";
import WifiManager from "react-native-wifi-reborn";

SplashScreen.preventAutoHideAsync();

export default function SensorConfiguration() {

    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const drawer = useRef(null);
    const [wifiList, setWifiList] = useState([]);

    const ws = new WebSocket('ws://flameguard.loca.lt/FlameGuard/Home_WebSocket');

    const keepAlive = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send('ping');
        }
    }, 29000);

    ws.onopen = () => {
        ws.send('open connection (react-native)');
        keepAlive;
    };

    ws.onmessage = e => {
        console.log(e.data);
    };

    ws.onerror = e => {
        console.log(e.message);
    };

    ws.onclose = e => {
        console.log(e.code, e.reason);
        clearInterval(keepAlive);
    };

    const [loaded, error] = useFonts({
        Dyna: require("../assets/fonts/DynaPuff.ttf"),
        PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
        PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
        Dancing: require("../assets/fonts/Dancing.ttf"),
        DancingBold: require("../assets/fonts/Dancing-Bold.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    async function requestLocationPermission() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission Required',
                    message: 'This app needs location permission to detect Wi-Fi networks.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    }

    const handleScan = async () => {
        const permissionGranted = await requestLocationPermission();
        if (permissionGranted) {
            try {
                const networks = await WifiManager.loadWifiList();
                setWifiList(networks);
            } catch (error) {
                console.error("Error scanning Wi-Fi networks:", error);
            }
        }
    };

    return (
        <View
            style={styles.container}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={[styles.row, styles.headerLeft]}>
                    <Image source={require('../assets/images/appLogo_Hi.png')} style={styles.appLogo} />
                    <Text style={[styles.title, { fontFamily: loaded ? "PoppinsBold" : "System" }]}>Flame Guard</Text>
                </View>
                <View style={[styles.row, styles.headerRight]}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Pressable onPress={
                        () => {
                            drawer.current?.openDrawer()
                        }
                    }>
                        <Ionicons name="menu-outline" size={24} color="black" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.mainSection}>

                <View>
                    <Button title="Scan Wi-Fi Networks" onPress={handleScan} />
                    <FlatList
                        data={wifiList}
                        keyExtractor={(item) => item.BSSID}
                        renderItem={({ item }) => (
                            <Text>{item.SSID} ({item.BSSID})</Text>
                        )}
                    />
                </View>

            </View>

            <StatusBar backgroundColor={'#0A1421'} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
    },
    navigationContainer: {
        padding: 20,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    drawerIconContainer: {
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 15,
        borderBottomColor: "#D0D0D0"
    },
    drawerIcon: {
        backgroundColor: "#DEDEDE",
        flexDirection: 'row',
        padding: 10,
        borderRadius: 100,
    },
    drawerLi: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginVertical: 5
    },
    lineSeperator: {
        borderBottomWidth: 1,
        borderBottomColor: "#D0D0D0",
    },
    drawerLiText: {
        fontSize: 14,
        color: "#5F5F5F",
    },
    headerContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 16
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
    },
    appLogo: {
        maxWidth: 40,
        maxHeight: 40,
        resizeMode: 'contain',
    },
    connectionImg: {
        maxWidth: 72,
        maxHeight: 72,
        resizeMode: 'contain',
    },
    monitoringImg: {
        maxWidth: 46,
        maxHeight: 46,
        resizeMode: 'contain',
    },
    actionImg: {
        maxWidth: 52,
        maxHeight: 52,
        resizeMode: 'contain',
    },
    row: {
        flexDirection: 'row',
    },
    headerLeft: {
        gap: 6,
        alignItems: 'flex-end'
    },
    headerRight: {
        gap: 6,
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        color: '#272727'
    },
    connectionContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 40
    },
    disconnectedType: {
        backgroundColor: '#FF3131',
        padding: 5,
        borderRadius: 4,
    },
    connectionStatus: {
        alignItems: 'center',
        gap: 6,
    },
    connectionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#272727'
    },
    monitoringBox: {
        flexGrow: 1,
        alignItems: 'center',
        width: '20%'
    },
    mainSection: {
        paddingHorizontal: 16,
        gap: 12,
    },
    monitoringContainer: {
        flexDirection: 'row',
        gap: 12,
        height: 120,
        justifyContent: 'space-between'
    },
    monitorTitle: {
        color: '#272727'
    },
    monitorValue: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#272727'
    },
    bottomTextContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    actionButton: {
        backgroundColor: '#20BF55',
        padding: 10,
        borderRadius: 6,
        paddingHorizontal: 20
    },
    actionButton2: {
        backgroundColor: '#FFB400',
        padding: 10,
        borderRadius: 6,
        paddingHorizontal: 20
    },
    textWhite: {
        color: '#ECECEC'
    },
    actionButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    actionLeft: {
        gap: 6,
        alignItems: 'center'
    },
});
