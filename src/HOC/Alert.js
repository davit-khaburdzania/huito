import React, { Component } from 'react'
import { connect } from 'react-redux'

let enhancer = connect(state => ({ alerts: state.Alert }))

const AlertHOC = WrappedComponent => {
  class AlertComponent extends Component {
    componentWillMount () {
      // console.log(this.props.alerts.size)
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.alerts.size > 0) {
        let alert = nextProps.alerts.first()

        switch (alert.get('type')) {
          case 'success':
            this.showSuccess(alert.get('list'))
            break
          case 'warning':
            this.showWarning(alert.get('list'))
            break
          case 'error':
            this.showError(alert.get('list'))
            break
          default:
            this.showError(alert.get('list'))
        }

        nextProps.removeAlert()
      }
    }

    showSuccess (list) {
      let text = list.join(', ')

      this.props.navigator.showLocalAlert(text, {
        text: { color: '#fff' },
        container: { backgroundColor: '#5cb85c' }
      })
    }

    showWarning (list) {
      let text = list.join(', ')

      this.props.navigator.showLocalAlert(text, {
        text: { color: '#fff' },
        container: { backgroundColor: '#f0ad4e' }
      })
    }

    showError (list) {
      let text = list.join('\n')

      this.props.navigator.showLocalAlert(text, {
        text: { color: '#fff' },
        container: { backgroundColor: '#d9534f' }
      })
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  return enhancer(AlertComponent)
}

export default AlertHOC
