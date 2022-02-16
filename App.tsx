import {StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraScreen from "./screens/CameraScreen";
import ImagesScreen from "./screens/ImagesScreen";
import FeedScreen from "./screens/FeedScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import {ComponentProps} from "react";


const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName: ComponentProps<typeof Ionicons>["name"] = 'add';
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
                <Tab.Screen name="Camera" component={CameraScreen} options={{ unmountOnBlur: true }}/>
                <Tab.Screen name="Images" component={ImagesScreen}/>
                <Tab.Screen name="Feed" component={FeedScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;
