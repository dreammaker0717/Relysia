import React, { Component } from 'react'
import docsStyle from '../../../static/styles/NewDocsContainer.module.css'
import Link from '../../common/active-link'

class GridItem extends Component {
  render() {
    return (
      <div
        className={`col-lg-3 col-sm-6 mb-4 shadow-box ${docsStyle.shadow}`}
        style={{
          marginLeft: '5px',
          marginRight: '5px',
          overflow: 'hidden',
          minWidth: '230px',
        }}
      >
        <Link
          activeClassName="active"
          href="/docs/[id]"
          as={`/docs/${this.props.data.id}`}
        >
          <a
            className="text-center"
            style={{
              height: '260px',
              display: 'flex',
              flexFlow: 'column nowrap',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <h3>{this.props.data.title}</h3>
            <p>{this.props.data.desc}</p>
          </a>
        </Link>
      </div>
    )
  }
}

export default GridItem
