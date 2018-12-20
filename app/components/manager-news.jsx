import React, { Component, PropTypes } from 'react'
import connect from 'connect-alt'
import { Link } from 'react-router'


@connect(({ news: { collection } }) => ({ collection }))
class News extends Component {

  static propTypes = { collection: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { flux, i18n } = this.context

    flux.getActions('helmet').update({ title: i18n('news.page-title') })
    flux.getActions('news').index()
  }

  handleRemove(index: number) {
    const { flux } = this.context
    flux.getActions('news').remove(index)
  }

  renderNew = (child, index) => {
    const { i18n } = this.context
    const { id, title, key, image, content, href, createdAt, domain, image_full } = child
    let isContent = content === '...' ? content : 'ok'
    if (isContent === 'ok') {
      isContent = image_full.split('***').length > 0 && image_full.split('***')[0] ? 'ok' : 'No image'
    }

    return (
      <tr className='user--row' key={ index }>
        <td><img src={ image } alt={ title } width='100' height='60' /></td>
        <td>
          <p>{ title }</p>
          <p>{ key }</p>
        </td>
        <td>{ isContent }</td>
        <td>{ domain }</td>
        <td>{ createdAt }</td>
        <td className='text-center'>
          <Link to={ `/manager/news/${key}` } >{ i18n('news.profile') }</Link>
        </td>
        <td className='text-center'>
          <Link to={ href } ><i className='fa fa-external-link-square' aria-hidden='true'></i></Link>
        </td>
        <td className='text-center'>
          <button
            className='user--remove'
            onClick={ () => this.handleRemove(index, id) }>
            <i className='fa fa-times' aria-hidden='true'></i>
          </button>
        </td>
      </tr>
    )
  }

  render() {
    const { collection } = this.props
    const { i18n } = this.context
    console.log(collection.length)

    return (
      <div className='container'>
        <h1 className='text-center'>
          { i18n('news.title') }
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th> Image </th>
              <th> Title </th>
              <th> DT </th>
              <th> Domain </th>
              <th> Time </th>
            </tr>
          </thead>
          <tbody>
            { collection.map(this.renderNew) }
          </tbody>
        </table>
      </div>
    )
  }
}

const reducer = ({ session: { session } }) => ({ session })
export default connect('session', reducer)(News)
