import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import GameScreen from '../../screens/game'
import CategoryScreen from '../../screens/categories'
import SettingScreen from '../../screens/settings'



export default function Router() {

    const Tab = createBottomTabNavigator()

    return (
      <Tab.Navigator>
          <Tab.Screen
            name="CATEGORIE"
            component={CategoryScreen}
            options={{
              tabBarLabel: 'Catégories',
              tabBarIcon: ({ color, size }) => (
                <Icon name="list" color={color} size={size} />
              ),
            }}
          />
          
            <Tab.Screen
              name="JEU"
              component={GameScreen}
              options={({ route }) => ({
                tabBarLabel: route.params?.category || 'Jeu',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="gamepad" color={color} size={size} />
                ),
              })}
            />
            <Tab.Screen
              name="REGLAGES"
              component={SettingScreen}
              options={{
                tabBarLabel: 'Réglages',
                tabBarIcon: ({ color, size }) => (
                  <Icon name="cog" color={color} size={size} />
                ),
              }}
            />
       
        </Tab.Navigator>
  )
}