import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, ScrollView, Text } from 'react-native'
import styled from "styled-components";

const SearchUsers = () => {

  const [searchValue, setSearchValue] = useState("")

  return (
    <Container>
      <ContentTitle>
        Search Users
      </ContentTitle>
      <CustomTextbox
        placeholder="User Name"
        placeholderTextColor="#727272"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={(value) => {
          setSearchValue(value)
        }}
        onSubmitEditing={() => {

        }}
      />
    </Container>
  )
}

export default SearchUsers

const CustomTextbox = styled.TextInput`
    background: #eeeeee;
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    color: black;
`
const Container = styled.View`
  padding: 10px 20px;
  height: 100%;
`
const ContentTitle = styled.Text`
  font-family: TTCommons-Bold;
  font-size: 20px;
  padding: 15px;
  text-align: center;
`