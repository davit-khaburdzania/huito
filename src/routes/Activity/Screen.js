import React from 'react'
import Autocomplete from 'react-native-autocomplete-input'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button
} from 'react-native'

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      friends: [],
      selectedFriends: [],
      query: ''
    }
  }

  componentDidMount() {
    const friends = [
      { id: 1, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Irakli Lekishvili', },
      { id: 2, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Zaal Kavelashvili' },
      { id: 3, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Davit Khaburdzania' },
      { id: 4, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Oto Vacheishvili' }
    ]

    this.setState({ friends })
  }

  selectFriend(friend) {
    let { selectedFriends, friends } = this.state
    friends = friends.filter(x => x.id !== friend.id)
    selectedFriends.push(friend)
    this.setState({ selectedFriends, friends })
  }

  deselectFriend(friend) {
    let { selectedFriends, friends } = this.state
    selectedFriends = selectedFriends.filter(x => x.id !== friend.id)
    friends.push(friend)
    this.setState({ selectedFriends, friends })
  }

  findFilm(query) {
    if (query === '') return []

    const { friends } = this.state
    const regex = new RegExp(`${query.trim()}`, 'i')
    return friends.filter(film => film.name.search(regex) >= 0)
  }

  render() {
    const { query, selectedFriends } = this.state
    const friends = this.findFilm(query)
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={friends.length === 1 && comp(query, friends[0].name) ? [] : friends}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder='Select your favorite friends'
          renderItem={friend => (
            <TouchableOpacity onPress={this.selectFriend.bind(this, friend)}>
              <Image
                style={{width: 50, height: 50}}
                source={{uri: friend.avatar}}
              />
              <Text style={styles.itemText}>
                {friend.name}
              </Text>
            </TouchableOpacity>
          )}
        />
        {selectedFriends.map(friend =>
          <View key={friend.id}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: friend.avatar}}
            />
            <Text key={friend.id}>{friend.name}</Text>
            <Button onPress={this.deselectFriend.bind(this, friend)} title='Remove' />
          </View>
        )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
})
