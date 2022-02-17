import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image, FlatList, StyleSheet } from "react-native";

export default function FeedScreen() {
    const [serverImagesUrls, setServerImagesUrls] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        (async () => {
            const filesUrl = await axios.get(
                "https://wildstagram.nausicaa.wilders.dev/list"
            );
            console.log("it's fetching");
            setServerImagesUrls(filesUrl.data);
            setIsFetching(false);
        })();
    }, [isFetching]);

    return serverImagesUrls.length > 0 ? (
        <FlatList
            data={serverImagesUrls}
            keyExtractor={(serverImageURI) => serverImageURI}
            refreshing={isFetching}
            onRefresh={() => setIsFetching(true)}
            renderItem={(itemData) => {
                return (
                    <>
                        <Image
                            style={styles.image}
                            source={{
                                uri:
                                    "https://wildstagram.nausicaa.wilders.dev/files/" +
                                    itemData.item,
                            }}
                        />
                    </>
                );
            }}
        />
    ) : null;
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "contain",
        height: 500,
    },
});
