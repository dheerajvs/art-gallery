import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img.attrs({
  width: 48,
  height: 48
})`
  border-radius: 50%;
  margin-right: 16px;
`

const AvatarTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AvatarTitle = styled.h1`
  font-size: 1.25em;
  font-weight: 600;
  margin: 0;
`

const AvatarSubtitle = styled.div`
`

const AvatarHeader = ({ avatarUrl, title, subtitle }) => (
  <AvatarContainer>
    <Avatar src={avatarUrl}/>
    <AvatarTitleContainer>
      <AvatarTitle>{title}</AvatarTitle>
      <AvatarSubtitle>{subtitle}</AvatarSubtitle>
    </AvatarTitleContainer>
  </AvatarContainer>
)

AvatarHeader.propTypes = {
  avatarUrl: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default AvatarHeader
