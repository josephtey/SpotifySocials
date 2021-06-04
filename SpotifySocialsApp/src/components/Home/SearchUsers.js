import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, View, ScrollView, Text } from 'react-native'
import styled from "styled-components";
import { searchUsers } from './../../api/db'
import UserList from './UserList'

const SearchUsers = () => {

  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const search = async () => {
      setSearchResults(await searchUsers(""))
    }

    search()
  }, [])

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
        onSubmitEditing={async () => {
          setSearchResults(await searchUsers(searchValue))
        }}
      />

      <UserList
        sortedUsers={searchResults}
        gotoUserPage={
          (username, spotifyId) => {

          }}
        search={true}
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