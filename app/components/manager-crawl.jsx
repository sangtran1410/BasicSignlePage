import React, { Component, PropTypes } from 'react'


import superagent from 'superagent'

// import { replaceParams } from 'utils/localized-routes'

class Users extends Component {

  static propTypes = { collection: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  state = {
    results: []
  }

  componentWillMount() {
    const { flux, i18n } = this.context
    flux.getActions('helmet').update({ title: i18n('users.page-title') })
    this.state ? (this.state.results = [ ]) : ''
  }

  onCrawling() {
    superagent.get('/api/read-meta-tag-with-jsdom')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res.body)
        this.state.results.push(res.body)
      })
    // let interval = setInterval(() => {
    // }, 30 * 60 * 1000)
    // console.log(interval)
  }

  render() {
    console.log(this.state.results)
    return (
      <div>
        <h1 className='text-center'>
          Crawling page
        </h1>
        <button onClick={ () => this.onCrawling() }>Crawling data</button>
      </div>
    )
  }

}

export default Users
