import {Stack} from "expo-router";

export default function Layout({ children }) {
    return(
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}
