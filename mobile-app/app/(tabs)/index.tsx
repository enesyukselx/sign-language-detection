import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
    const [type, setType] = useState(CameraType.front);
    const cameraRef = useRef<any>(null);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    useEffect(() => {
        if (!permission || !permission.granted) {
            return;
        }

        const internal = setInterval(() => {
            if (!cameraRef || !cameraRef.current) return;
            if (cameraRef.current) {
                cameraRef.current
                    .takePictureAsync({
                        base64: true,
                        quality: 0.2,
                        skipProcessing: true,
                    })
                    .then((photo: any) => {
                        //FETCH CODE
                        //console.log(photo.base64);
                    });
            }
        }, 5000);

        return () => clearInterval(internal);
    }, [cameraRef.current, permission]);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType((current) =>
            current === CameraType.back ? CameraType.front : CameraType.back
        );
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={toggleCameraType}
                    >
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    padding: 16,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "center",
                    }}
                >
                    <Text style={{ color: "blue" }}>Tahmin: </Text> Hello
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 84,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
});
