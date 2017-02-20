import React from 'react'
import Autocomplete from 'react-native-autocomplete-input'
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class FriendsSelect extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      selected: [],
      friends: props.friends
    }
  }

  static propTypes = {
    friends: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired
  }

  selectFriend(friend) {
    let { selected, friends } = this.state
    friends = friends.filter(x => x.id !== friend.id)
    selected.push(friend)
    this.setState({ selected, friends, query: '' })

    this.props.onSelect(selected)
  }

  deselectFriend(friend) {
    let { selected, friends } = this.state
    selected = selected.filter(x => x.id !== friend.id)
    friends.push(friend)
    this.setState({ selected, friends })
  }

  findFriend(query) {
    if (query === '') return []
    const regex = new RegExp(`${query.trim()}`, 'i')
    return this.state.friends.filter(x => x.name.search(regex) >= 0)
  }

  render() {
    let { friends, query, selected } = this.state
    friends = this.findFriend(query)
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()

    return (
      <View style={{marginTop: 50}}>
        <Autocomplete
          containerStyle={styles.autocompleteContainer}
          data={friends.length === 1 && comp(query, friends[0].name) ? [] : friends}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder='Select your favorite friends'
          renderItem={friend => (
            <TouchableOpacity onPress={this.selectFriend.bind(this, friend)}>
              <Image
                style={styles.img}
                source={{uri: friend.avatar}}
              />
              <Text style={styles.itemText}>
                {friend.name}
              </Text>
            </TouchableOpacity>
          )}
        />
        {selected.map(friend =>
          <View key={friend.id}>
            <Image
              style={styles.img}
              source={{uri: friend.avatar}}
            />
            <Text key={friend.id}>{friend.name}</Text>
            <Button onPress={this.deselectFriend.bind(this, friend)} title='Remove' />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  img: {
    width: 50,
    height: 50
  }
})
