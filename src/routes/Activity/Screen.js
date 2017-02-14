import React from 'react'
import { View, Text, TextInput, StyleSheet, AlertIOS, } from 'react-native'
import AutoComplete from 'react-native-autocomplete'

const Countries = [
  {name: 'Belarus', code: 'BY'}, 
  {name: 'Belgium', code: 'BE'}, 
  {name: 'Belize', code: 'BZ'}, 
  {name: 'Benin', code: 'BJ'}, 
  {name: 'Bermuda', code: 'BM'}, 
  {name: 'Bhutan', code: 'BT'}, 
  {name: 'Bolivia', code: 'BO'}, 
  {name: 'Bosnia and Herzegovina', code: 'BA'}, 
  {name: 'Botswana', code: 'BW'}, 
  {name: 'Bouvet Island', code: 'BV'}, 
  {name: 'Brazil', code: 'BR'}, 
  {name: 'British Indian Ocean Territory', code: 'IO'}, 
  {name: 'Brunei Darussalam', code: 'BN'}, 
  {name: 'Bulgaria', code: 'BG'}, 
  {name: 'Burkina Faso', code: 'BF'}, 
  {name: 'Burundi', code: 'BI'}, 
]

const styles = StyleSheet.create({
  autocomplete: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#FFF',
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
});

export default class ActivityScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  onTyping(text) {
    const countries = Countries
      .filter(country => country.name.toLowerCase().startsWith(text.toLowerCase()))
      .map(country => country.name);

    this.setState({ data: countries });
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 0}}
          placeholder='activity name'
          value={this.state.name}
          onChangeText={name => this.setState({ name })}
        />
        <AutoComplete
          onTyping={this.onTyping.bind(this)}
          onSelect={e => AlertIOS.alert('You choosed', e)}
          onFocus={() => AlertIOS.alert('Focus')}
          onSubmitEditing={() => AlertIOS.alert('onSubmitEditing')}
          style={styles.autocomplete}

          suggestions={this.state.data}

          placeholder="This is a great placeholder"
          clearButtonMode="always"
          returnKeyType="go"
          textAlign="center"
          clearTextOnFocus

          maximumNumberOfAutoCompleteRows={10}
          applyBoldEffectToAutoCompleteSuggestions
          reverseAutoCompleteSuggestionsBoldEffect
          showTextFieldDropShadowWhenAutoCompleteTableIsOpen={false}
          autoCompleteTableViewHidden={false}

          autoCompleteTableBorderColor="lightblue"
          autoCompleteTableBackgroundColor="azure"
          autoCompleteTableCornerRadius={10}
          autoCompleteTableBorderWidth={1}

          autoCompleteRowHeight={35}

          autoCompleteFontSize={15}
          autoCompleteRegularFontName="Helvetica Neue"
          autoCompleteBoldFontName="Helvetica Bold"
          autoCompleteTableCellTextColor={'red'}
        />
      </View>
    )
  }
}
