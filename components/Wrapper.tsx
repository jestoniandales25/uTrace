import React from 'react';
import { View } from 'react-native';
import styles from "../styles/WrapperStyles";

export default function Wrapper({ children }){
  return <View style={styles.wrapper}>{children}</View>;
};