import { Image, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { SelectList } from 'react-native-dropdown-select-list'

SplashScreen.preventAutoHideAsync();

export default function SignUp() {

    const [selected, setSelected] = useState("");
    const [step, setStep] = useState(1);

    const [name, setName] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAddress] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const data = [
        { key: '1', value: 'Colombo' },
        { key: '2', value: 'Gampaha' },
        { key: '3', value: 'Kalutara' },
        { key: '4', value: 'Galle' },
    ]

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

    const handleSelection = (selectedValue) => {
        const selectedItem = data.find(item => item.value === selectedValue);
        setSelected(selectedItem.key);
    };

    async function registrationProcess() {
        const requestData = new FormData();
        if (name !== undefined && name.trim() !== "") requestData.append("name", name);
        if (mobile !== undefined && mobile.trim() !== "") requestData.append("mobile", mobile);
        if (address !== undefined && address.trim() !== "") requestData.append("address", address);
        if (selected !== undefined && selected.trim() !== "") requestData.append("district", selected);
        if (username !== undefined && username.trim() !== "") requestData.append("username", username);
        if (password !== undefined && password.trim() !== "") requestData.append("password", password);

        const response = await fetch("https://flameguard.loca.lt/FlameGuard/UserRegistration", {
            method: "POST",
            body: requestData,
        });

        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                router.replace("./signIn");
            } else {
                alert(json.message)
            }
        } else {
            console.log("Response Error: " + response);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/appLogo_Hi.png')} style={styles.appLogo} />
            <Text style={[styles.title, { fontFamily: loaded ? "PoppinsBold" : "System" }]}>Create New Account</Text>

            {step === 1 ?
                <View style={styles.inputContainer}>
                    <View>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} selectionColor={'#FF3131'} onChangeText={(name) => { setName(name) }} value={name} />
                    </View>
                    <View>
                        <Text style={styles.label}>Mobile (Fixed Line) <Text style={styles.textPrimary}>*</Text></Text>
                        <TextInput style={styles.input} selectionColor={'#FF3131'} onChangeText={(mobile) => { setMobile(mobile) }} value={mobile} />
                    </View>
                    <View>
                        <Text style={styles.label}>Address <Text style={styles.textPrimary}>*</Text></Text>
                        <TextInput style={styles.input} selectionColor={'#FF3131'} onChangeText={(address) => { setAddress(address) }} value={address} />
                    </View>
                    <View>
                        <Text style={styles.label}>District <Text style={styles.textPrimary}>*</Text></Text>
                        <SelectList
                            setSelected={handleSelection}
                            data={data}
                            save="value"
                        />
                    </View>
                </View>
                :
                <View style={styles.inputContainer}>
                    <View>
                        <Text style={styles.label}>Username <Text style={styles.textPrimary}>*</Text></Text>
                        <TextInput style={styles.input} selectionColor={'#FF3131'} onChangeText={(username) => { setUsername(username) }} value={username} />
                    </View>
                    <View>
                        <Text style={styles.label}>Password <Text style={styles.textPrimary}>*</Text></Text>
                        <TextInput style={styles.input} selectionColor={'#FF3131'} secureTextEntry={true} onChangeText={(password) => { setPassword(password) }} value={password} />
                    </View>
                </View>
            }

            {step === 1 ?
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.6} onPress={() => router.replace("./signIn")}>
                        <Text style={styles.textPrimary}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.6} onPress={() => setStep(2)}>
                        <Text style={styles.textWhite}>Next</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.6} onPress={() => setStep(1)}>
                        <Text style={styles.textPrimary}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonPrimary} activeOpacity={0.6} onPress={registrationProcess}>
                        <Text style={styles.textWhite}>Register</Text>
                    </TouchableOpacity>
                </View>
            }

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