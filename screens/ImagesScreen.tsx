import * as FileSystem from "expo-file-system";
import React, {useEffect, useState} from "react";
import {StyleSheet, Image, FlatList} from "react-native";

export default function ImagesScreen() {
    const [imagesURI, setImagesURI] = useState<String[]>([]);
    useEffect(() => {
        (async () => {
            const images = await FileSystem.readDirectoryAsync(
                FileSystem.cacheDirectory + "ImageManipulator"
            );
            console.log(images)
            setImagesURI(images);
        })();
    }, []);
    return imagesURI.length > 0 ? (
        <FlatList style={styles.imageContainer} numColumns={2} data={imagesURI} keyExtractor={imageURI => imageURI.toString()}
                  inverted={true} renderItem={(itemData) => {
            console.log("item", itemData);
            return (
                <Image style={styles.image}
                       source={{uri: FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,}}/>
            );
        }}/>
    ) : null;
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
        width: '50%',
        height: 150,
        marginEnd: 10,
        marginBottom: 10
    },
    imageContainer: {
        marginHorizontal: 10,
    }
});