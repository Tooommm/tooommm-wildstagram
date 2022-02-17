import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import React, { useEffect, useRef, useState } from "react";

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef<null | Camera>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }
    return (
        <>
            <Camera style={styles.camera} ref={cameraRef} type={type}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                >
                    <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
            </Camera>
            <Button
                title="Take a picture"
                onPress={async () => {
                    const pictureMetadata =
                        await cameraRef.current?.takePictureAsync();
                    console.log("pictureMetadata", pictureMetadata);
                    console.log(
                        pictureMetadata
                            ? await ImageManipulator.manipulateAsync(
                                  pictureMetadata.uri,
                                  [{ resize: { width: 800 } }]
                              )
                            : "No pictureMetadata found"
                    );
                }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
    button: {
        flex: 0.3,
        alignSelf: "flex-end",
        alignItems: "center",
    },
});

export default CameraScreen;
