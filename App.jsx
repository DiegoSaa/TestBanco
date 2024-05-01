import "reflect-metadata";
import React from "react";
import AppNavigator from "./ui/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </QueryClientProvider>
    );
}

export default App;