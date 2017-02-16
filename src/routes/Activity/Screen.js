import React from 'react'
import FriendsSelect from './FriendsSelect'
import { View } from 'react-native'

const FRIENDS = [
  { id: 1, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Irakli Lekishvili', },
  { id: 2, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Zaal Kavelashvili' },
  { id: 3, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Davit Khaburdzania' },
  { id: 4, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Oto Vacheishvili' }
]

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedFriends: []
    }
  }

  onFriendSelect(selectedFriends) {
    this.setState({ selectedFriends })
  }

  render() {
    return (
      <View>
        <FriendsSelect
          friends={FRIENDS}
          onSelect={::this.onFriendSelect}
        />
      </View>
    )
  }
}
