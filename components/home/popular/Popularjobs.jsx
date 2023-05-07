import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';
import { useRouter } from 'expo-router';

const Popularjobs = () => {
  const router = useRouter()
  const [selectedJob, setSelectedJob] = useState()
  const {data, isLoading, error, refetch} = useFetch("search", {
    query : 'React developer',
    page : "1",
    num_pages: "1"
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Popular jobs</Text>
      <TouchableOpacity>
        <Text style={styles.headerBtn}>Show all</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : error ? (
          <Text style={{textAlign : "center", width:"100%"}}>Something went wrong</Text>
        ): (
          <>
          <FlatList 
            data={data}
            renderItem={({item}) => (
              <PopularJobCard item={item}    
              selectedJob={selectedJob}      
              handleCardPress={() => {router.push(`/job-details/${item?.job_id}`);  setSelectedJob(item?.job_id)}}
              />
            )}
            keyExtractor={item=> item?.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          </>
        )}
      </View>
    </View>
  )
}

export default Popularjobs