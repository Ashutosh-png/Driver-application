import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Splash';



const Stack = createStackNavigator();

const AppNavigator = () => {

return (
<NavigationContainer>
<Stack.Navigator>

    <Stack.Screen
    name='Splash'
    component={Splash}
    options={{headerShown: false}}
    
    />
     <Stack.Screen
          name='BookingPage'
          component={BookPage}
          options={{ headerShown: false }}
        />
    


    
</Stack.Navigator>

</NavigationContainer>


)

}


export default AppNavigator;