import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Card, {
  CardPrimaryContent,
  CardMedia,
} from '@material/react-card'

const StyledCard = styled(Card)`
  margin-right: 10px;
  margin-bottom: 4px;
`

const StyledCardPrimaryContent = styled(CardPrimaryContent)`
  width: 150px;
`

const CardTitle = styled.h2`
  font-size: 0.875em;
  font-weight: normal;
  padding: 0 8px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Carousel = styled.div`
  display: flex;
  min-width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
}

export const CarouselItem = ({ imageUrl, title, onClick }) => (
  <StyledCard onClick={onClick}>
    <StyledCardPrimaryContent>
      <CardMedia imageUrl={imageUrl} square/>
      <CardTitle>{title}</CardTitle>
    </StyledCardPrimaryContent>
  </StyledCard>
)

CarouselItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
}
