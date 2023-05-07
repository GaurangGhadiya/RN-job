import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./company.style";
import { checkImageURL } from "../../../utils";
import { icons } from "../../../constants";

const Company = ({ companyLogo, companyName, jobTitle, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={{
            uri: checkImageURL(companyLogo)
              ? companyLogo
              : "https://cdn4.vectorstock.com/i/1000x1000/17/53/job-post-vector-10551753.jpg",
          }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName} / </Text>
        <View style={styles.locationBox}>
          <Image style={styles.locationImage} 
          source={icons.location}
          resizeMode="contain"
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

export default Company;
