import React from 'react'
import { connect } from 'react-redux'
import FriendsSelect from './FriendsSelect'
import { View, TextInput, Picker, Button } from 'react-native'
import { UserActions, ActivityActions } from 'app/store/actions'
import TagInput from 'react-native-tag-input'

const FRIENDS = [
  { id: 1, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Irakli Lekishvili', },
  { id: 2, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Zaal Kavelashvili' },
  { id: 3, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Davit Khaburdzania' },
  { id: 4, avatar: 'https://dummyimage.com/100x100/000/fff', name: 'Oto Vacheishvili' }
]

const CURRENCIES = [
  { id: 1, name: 'USD' },
  { id: 2, name: 'EUR' },
  { id: 3, name: 'GEL' },
  { id: 4, name: 'IDR' },
  { id: 5, name: 'GBP' }
]

let connectProps = { ...UserActions, ...ActivityActions }
let connectState = state => ({ })
let enhancer = connect(connectState, connectProps)

class ActivityScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'beach boys',
      emails: ['l3kishvili@gmail.com', 'davit.khaburdzania@gmail.com', 'otovacheishvili@gmail.com'],
      currency: 4,
      selectedFriends: []
    }
  }

  create() {
    // console.log(this.props);
    this.props.createActivity(this.state)
  }

  onEmailChange(email) {
    let { emails } = this.state
    this.setState({ emails: [...emails, email] })
  }

  renderFriendsSelect() {
    return (
      <FriendsSelect
        friends={FRIENDS}
        onSelect={selectedFriends => this.setState({ selectedFriends })}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TextInput
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
          placeholder='activity name'
          style={{width: 200, height: 20}}
        />
        <Picker
          selectedValue={this.state.currency}
          onValueChange={currency => this.setState({ currency })}>
          {CURRENCIES.map((x, i) =>
            <Picker.Item key={i} label={x.name} value={x.id} />
          )}
        </Picker>
        <TagInput
          value={this.state.emails}
          onChange={email => this.onEmailChange(email)}
        />
        <Button title='Create' onPress={::this.create} />
      </View>
    )
  }
}

export default enhancer(ActivityScreen)
