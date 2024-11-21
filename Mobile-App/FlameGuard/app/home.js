import { DrawerLayoutAndroid, Image, Pressable, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from '@expo/vector-icons/Ionicons';
import ConnectedIcon from "../assets/icons/connectedIcon";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

SplashScreen.preventAutoHideAsync();

export default function Home() {

    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const drawer = useRef(null);

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

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>

            <View style={{ gap: 5, }}>
                <TouchableHighlight underlayColor="#DDDDDD" onPress={() => { }} >
                    <View style={styles.drawerLi}>
                        <Feather name="user" size={24} color="#5F5F5F" />
                        <Text style={[styles.drawerLiText, { fontFamily: loaded ? "PoppinsMedium" : "System" }]}>Profile</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.lineSeperator} ></View>

                <TouchableHighlight underlayColor="#DDDDDD" onPress={() => { router.push("./sensorConfiguration") }}>
                    <View style={styles.drawerLi}>
                        <MaterialIcons name="sensors" size={24} color="#5F5F5F" />
                        <Text style={[styles.drawerLiText, { fontFamily: loaded ? "PoppinsMedium" : "System" }]}>Find Sensor</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.lineSeperator} ></View>

                <TouchableHighlight underlayColor="#DDDDDD" onPress={() => { }}>
                    <View style={styles.drawerLi}>
                        <AntDesign name="setting" size={24} color="#5F5F5F" />
                        <Text style={[styles.drawerLiText, { fontFamily: loaded ? "PoppinsMedium" : "System" }]}>Setting</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.lineSeperator} ></View>

                <TouchableHighlight underlayColor="#DDDDDD" onPress={() => { }}>
                    <View style={styles.drawerLi}>
                        <Feather name="info" size={24} color="#5F5F5F" />
                        <Text style={[styles.drawerLiText, { fontFamily: loaded ? "PoppinsMedium" : "System" }]}>About</Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.lineSeperator} ></View>
            </View>


            <View style={{ gap: 5, }}>
                <View style={styles.lineSeperator}></View>

                <TouchableHighlight underlayColor="#DDDDDD" onPress={
                    async () => {
                        await AsyncStorage.removeItem("user");
                        router.replace("/");
                    }
                }>
                    <View style={styles.drawerLi}>
                        <MaterialIcons name="logout" size={24} color="#FF3131" />
                        <Text style={[styles.drawerLiText, { fontFamily: loaded ? "PoppinsMedium" : "System", color: "#FF3131" }]}>
                            Logout
                        </Text>
                    </View>
                </TouchableHighlight>

                <View style={styles.lineSeperator}></View>
            </View>

        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={"right"}
            renderNavigationView={navigationView}
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

                {/* Connection Section */}
                <View style={[styles.box, styles.connectionContainer, styles.row]}>
                    <Image source={require('../assets/images/iot.png')} style={styles.connectionImg} />
                    <View style={[styles.row, styles.connectionStatus]}>
                        <Text style={styles.connectionText}>Disconnect</Text>
                        <View style={styles.disconnectedType}>
                            <ConnectedIcon color={'#ECECEC'} size={24} />
                        </View>
                    </View>
                </View>

                {/* Monitoring Section */}
                <View style={styles.monitoringContainer}>
                    <View style={[styles.box, styles.monitoringBox]}>
                        <Image source={require('../assets/images/temperature.png')} style={styles.monitoringImg} />
                        <Text style={styles.monitorTitle}>Temperature</Text>
                        <Text style={styles.monitorValue}>32°</Text>
                    </View>
                    <View style={[styles.box, styles.monitoringBox]}>
                        <Image source={require('../assets/images/pressure-gauge.png')} style={styles.monitoringImg} />
                        <Text style={styles.monitorTitle}>Gas</Text>
                        <Text style={styles.monitorValue}>Safe</Text>
                    </View>
                    <View style={[styles.box, styles.monitoringBox]}>
                        <Image source={require('../assets/images/firefighter.png')} style={styles.monitoringImg} />
                        <Text style={styles.monitorTitle}>Availability</Text>
                        <Text style={styles.monitorValue}>Ready</Text>
                    </View>
                </View>

                <TouchableHighlight
                    underlayColor="#A7FFC4"
                    style={[styles.box, isPressed1 && { backgroundColor: '#FF0000' }]}
                    onPressIn={() => setIsPressed1(true)}
                    onPressOut={() => setIsPressed1(false)}
                >
                    <View style={[styles.actionButtonContainer, styles.row]}>
                        <View style={[styles.row, styles.actionLeft]}>
                            <Image source={require('../assets/images/shield.png')} style={styles.actionImg} />
                            <Text style={styles.actionTitle}>Safe Zone</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.actionButton}>
                            <Text style={styles.textWhite}>Stay Safe</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="#FFE199"
                    style={[styles.box, isPressed2 && { backgroundColor: '#FF3131' }]}
                    onPressIn={() => setIsPressed2(true)}
                    onPressOut={() => setIsPressed2(false)}
                >
                    <View style={[styles.actionButtonContainer, styles.row]}>
                        <View style={[styles.row, styles.actionLeft]}>
                            <Image source={require('../assets/images/caution.png')} style={styles.actionImg} />
                            <Text style={styles.actionTitle}>Emergency Only</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.actionButton2}>
                            <Text style={styles.textWhite}>Send Alert</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableHighlight>

            </View>

            <StatusBar backgroundColor={'#0A1421'} />
        </DrawerLayoutAndroid>
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
