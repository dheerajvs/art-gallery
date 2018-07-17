import React from 'react'
import PropTypes from 'prop-types'

import Card, {
  CardPrimaryContent,
  CardMedia,
} from '@material/react-card'

export const Carousel = ({ children }) => (
  <div
    style={{
      display: 'flex',
      minWidth: '100%',
      overflowX: 'auto'
    }}
  >
    {children}
  </div>
)

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
}

export const CarouselItem = ({ imageUrl, title, onClick }) => (
  <Card
    style={{
      margin: '5px',
    }}
    onClick={onClick}
  >
    <CardPrimaryContent style={{ width: '140px' }}>
      <CardMedia imageUrl={imageUrl} square/>
      <h2
        style={{
          fontSize: '0.875em',
          fontWeight: 'normal',
          padding: '0 8px',
          overflow: 'hidden',
          textAlign: 'center',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >{title}</h2>
    </CardPrimaryContent>
  </Card>
)

CarouselItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
}
