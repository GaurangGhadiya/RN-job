import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES, icons } from "../../constants";
import ScreenHeaderBtn from "../../components/common/header/ScreenHeaderBtn";
import { Company, JobAbout, JobFooter, JobTabs, Specifics } from "../../components";

const tabs = ["About", "Qualifications","Responsibilities"]
const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0])

  const { data, isLoading, error,refetch } = useFetch("job-details", {
    job_id: params?.id,
  });

  console.log('params?.id', params?.id)

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return <Specifics  
        title="Qualifications"
        points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
        />
      case "About":
        return <JobAbout 
        info={data[0].job_description ?? "No data provided"}
        />
      case "Responsibilities":
        return <Specifics  
        
        title="Responsibilities"
        points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
        />
    
      default:
        break;
    }
  }

  const onRefresh = useCallback(
    () => {
      setRefreshing(true)
      refetch()
      setRefreshing(false)
    },
    [],
  )
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimention="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimention="60%" />
          ),
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text style={{textAlign : "center", width:"100%"}}>Something went wrong!</Text>
          ) : data?.length == 0 ? (
            <Text style={{textAlign : "center", width:"100%"}}>No data found</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company 
              companyLogo={data[0]?.employer_logo}
              jobTitle={data[0]?.job_title}
              companyName={data[0]?.employer_name}
              location={data[0]?.job_country}
              />
              <JobTabs 
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
        <JobFooter url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/results"} />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
