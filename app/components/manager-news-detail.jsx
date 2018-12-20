import capitalize from 'lodash/capitalize'
import defer from 'lodash/defer'

import React, { Component, PropTypes } from 'react'
import connect from 'connect-alt'

@connect(({ news: { collection } }) => ({ collection }))
class NewsDetail extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    collection: PropTypes.array
  }

  componentWillMount() {
    const { flux } = this.context
    const { params: { id } } = this.props
    console.log('from UI--------------------', this.props)

    this.updatePageTitle()
    flux.getActions('news').show(id)
  }

  componentWillReceiveProps({ collection, params: { key } }) {
    if ((collection.length !== this.props.collection.length) ||
        (key !== this.props.params.key)) {
      defer(() => this.updatePageTitle())
    }
  }

  getUser() {
    const { collection, params: { id } } = this.props
    return collection.find(u => u.key === id)
  }

  updatePageTitle() {
    const { flux, i18n } = this.context
    const user = this.getUser()
    console.log(user)
    let title
    if (user) {
      title = `${capitalize(user.title)}`
      // title = i18n('profile.page-title', title)
    } else {
      title = i18n('profile.not-found-page-title')
    }

    flux.getActions('helmet').update({ title })
  }

  render() {
    const user = this.getUser()
    console.log('clien user----------------')
    // console.log(user)

    if (user) {
      const { title, content, desc } = user

      return (
        <div className='app--profile text-center'>
          <h2>{ capitalize(title) }</h2>
          <div>{ desc }</div>
          { content !== 'no Data' &&
            <div dangerouslySetInnerHTML={ { __html: content } }></div>
          }
        </div>
      )
    }

    return (<h2>User not found</h2>)
  }
}

export default NewsDetail
