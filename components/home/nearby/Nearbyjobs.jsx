import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants';
import useFetch from '../../../hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';

const NearByJobs = () => {
  const router = useRouter()
  const {data, isLoading, error, refetch} = useFetch("search", {
    query : 'React developer',
    page : "1",
    num_pages: "1"
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerTitle}>Nearby jobs</Text>
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
          data?.map(job => (
            <NearbyJobCard 
            job={job}
            key={`nearByJob-${job?.job_id}`}
            handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearByJobs