import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Image,
    FlatList,
    Button,
    View,
    TouchableOpacity,
} from "react-native";
import singleFileUploader from "single-file-uploader";

export default function ImagesScreen() {
    const [imagesURI, setImagesURI] = useState<String[]>([]);

    useEffect(() => {
        (async () => {
            const images = await FileSystem.readDirectoryAsync(
                FileSystem.cacheDirectory + "ImageManipulator"
            );
            setImagesURI(images);
        })();
    }, []);

    return imagesURI.length > 0 ? (
        <FlatList
            style={styles.imageContainer}
            numColumns={2}
            data={imagesURI}
            keyExtractor={(imageURI) => imageURI.toString()}
            renderItem={(itemData) => {
                return (
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            onLongPress={async () => {
                                try {
                                    await FileSystem.deleteAsync(
                                        FileSystem.cacheDirectory +
                                            "ImageManipulator/" +
                                            itemData.item
                                    );
                                    alert("picture deleted");
                                    setImagesURI(
                                        imagesURI.filter(
                                            (image) => image != itemData.item
                                        )
                                    );
                                } catch (e) {
                                    console.log("Something went wrong", e);
                                    alert("we can't delete this picture");
                                }
                            }}
                        >
                            <Image
                                style={styles.image}
                                source={{
                                    uri:
                                        FileSystem.cacheDirectory +
                                        "ImageManipulator/" +
                                        itemData.item,
                                }}
                            />
                        </TouchableOpacity>
                        <Button
                            title="upload"
                            onPress={async () => {
                                try {
                                    await singleFileUploader({
                                        distantUrl:
                                            "https://wildstagram.nausicaa.wilders.dev/upload",
                                        filename: itemData.item,
                                        filetype: "image/jpeg",
                                        formDataName: "fileData",
                                        localUri:
                                            FileSystem.cacheDirectory +
                                            "ImageManipulator/" +
                                            itemData.item,
                                    });
                                    alert("Picture uploaded 🚀");
                                } catch (err) {
                                    alert("Error");
                                    throw err;
                                }
                            }}
                        />
                    </View>
                );
            }}
        />
    ) : null;
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
        height: 150,
        marginEnd: 10,
        width: "100%",
    },
    imageContainer: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 5,
        marginBottom: 10,
    },
});
