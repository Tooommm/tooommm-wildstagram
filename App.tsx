import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraScreen from "./screens/CameraScreen";
import ImagesScreen from "./screens/ImagesScreen";
import FeedScreen from "./screens/FeedScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import {IconProps} from "@expo/vector-icons/build/createIconSet";


const Tab = createBottomTabNavigator();

const HelloWorldApp = () => {
    return (
        <View style={styles.globalContainer}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName : "camera" | "camera-outline" | "images" | "images-outline" | "share-social" | "share-social-outline" | "add" = 'add';
                        if (route.name === 'Camera') {
                            iconName = focused ? 'camera' : 'camera-outline';
                        } else if (route.name === 'Images') {
                            iconName = focused ? 'images' : 'images-outline';
                        } else if (route.name === 'Feed') {
                            iconName = focused ? 'share-social' : 'share-social-outline';
                        }
                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}>
                    <Tab.Screen name="Camera" component={CameraScreen}/>
                    <Tab.Screen name="Images" component={ImagesScreen}/>
                    <Tab.Screen name="Feed" component={FeedScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: "lightgreen",
        alignItems: "flex-end",
    },
    globalContainer: {
        flex: 1,
        backgroundColor: "lightgrey",
    },
});

export default HelloWorldApp;
