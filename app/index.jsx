import { Stack, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import {COLORS, SIZES, icons, images } from '../constants'
import {ScreenHeaderBtn } from '../components'
import { Welcome } from '../components'
import { Nearbyjobs } from '../components'
import { Popularjobs } from '../components'

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("")
  return (
    <SafeAreaView style={{flex : 1, backgroundColor : COLORS.lightWhite}}>
        <Stack.Screen 
        options={{
            headerStyle : {backgroundColor : COLORS.lightWhite},
            headerShadowVisible : false,
            headerLeft : () => <ScreenHeaderBtn iconUrl={icons.menu} dimention="60%" />,
            headerRight : () => <ScreenHeaderBtn iconUrl={images.profile} dimention="100%" />,
            headerTitle : "",
        }}
        />


        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={{flex : 1, padding: SIZES.medium}}>
            <Welcome searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleCLick={() => {
              if(searchTerm){
                router.push(`/search/${searchTerm}`)
              }
            }} />
            <Popularjobs />
            <Nearbyjobs />
        </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default Home