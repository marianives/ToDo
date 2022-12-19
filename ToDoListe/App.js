import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Todos from "./Screens/Todos";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name='Todods'
                    component={Todos}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}