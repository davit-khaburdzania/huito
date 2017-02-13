import React, { Component } from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import Alertable from 'app/HOC/Alert'
import SwipeCards from 'react-native-swipe-cards'
import { House, User } from 'app/store/records'
import { Card, UserCard, PlaceCard, SwipeIcon } from 'app/components'

class NoMoreCards extends Component {
  render () {
    return <Text style={styles.noMoreCard}>No More Houses</Text>
  }
}

class Houses extends Component {
  handleYup (data) {
    if (data.place) {
      console.log('ye')
    } else if (data.user_type) {
      this.props.likeUser({ user_id: data.id })
    } else {
      this.props.likeHouse({ house_id: data.id })
    }
  }

  handleNope (data) {
    if (data.place) {
      console.log('no')
    } else if (data.user_type) {
      this.props.dislikeUser({ user_id: data.id })
    } else {
      this.props.dislikeHouse({ house_id: data.id })
    }
  }

  combinedData () {
    let result = []
    let index = null
    let houses = this.props.houses
    let agents = this.props.agents
    let houseId = this.props.lastHouseId

    if (this.props.currentUser.user_type === 'agent') {
      houses.forEach((house, i) => {
        if (house.id === houseId) index = i
      })

      houses = houses.toJS()
      if (index === null) return houses

      return houses.slice(index).concat(houses.slice(0, index))
    }

    if (agents.size < 2 || houses.size < 12) return []

    for (let i = 1; i <= 14; i++) {
      if (i === 5 || i === 10) {
        result.push(agents.first().toJS())
        agents = agents.shift()
      } else {
        let house = houses.first().toJS()

        result.push(house)
        houses = houses.shift()

        if (house.id === houseId) index = i - 1
      }
    }

    result.push({
      place: true,
      url: 'https://i.imgur.com/lVO9Bps.jpg',
      name: 'Jones Hollywood',
      type: 'Restaurant & Bar',
      location: 'West Hollywood'
    })

    if (index === null) return result

    return result.slice(index).concat(result.slice(0, index))
  }

  renderData (data) {
    if (data.place) {
      return <PlaceCard place={data} navigator={this.props.navigator} />
    } else if (data.user_type) {
      return <UserCard user={new User(data)} navigator={this.props.navigator} />
    } else {
      return <Card house={new House(data)} navigator={this.props.navigator} />
    }
  }

  render () {
    let cards = this.combinedData()

    if (cards.length === 1) {
      cards.push(cards[0])
    }

    return (
      <SwipeCards
        cards={cards}
        renderCard={(data) => this.renderData(data)}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup.bind(this)}
        handleNope={this.handleNope.bind(this)}
        containerStyle={styles.container}
        noView={<SwipeIcon left />}
        yupView={<SwipeIcon />}
        yupStyle={styles.yup}
        nopeStyle={styles.nope}
        loop
      />
    )
  }
}

let { height } = Dimensions.get('window')
let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  noMoreCard: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3E9EA6'
  },
  yup: {
    position: 'absolute',
    padding: 20,
    bottom: height / 2 - 80,
    borderRadius: 5,
    right: 10
  },
  nope: {
    position: 'absolute',
    bottom: height / 2 - 80,
    padding: 20,
    borderRadius: 5,
    left: 10
  }
})

export default Alertable(Houses)
