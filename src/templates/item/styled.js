import styled from 'styled-components';
import Card from '@material/react-card'

export const MainBox = styled.main`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

export const MainImageBox = styled.div`
  box-shadow: 0px 4px 16px 1px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 32px 16px 16px;
  max-width: 380px;
`

export const MainImage = styled.img`
  max-width: 100%;
`

export const DescriptionCard = styled(Card)`
  margin: 32px 16px 16px;
  max-width: 380px;
`

export const CardContent = styled.div`
  margin: 0 16px;
`

export const ImageTitle = styled.h1`
  font-size: 1.5em;
  font-weight: normal;
  margin-bottom: 0.33em;
`

export const ImageSubtitle = styled.span`
  display: block;
  font-size: 0.875em;
`

export const ImageDescription = styled.p`
  font-size: 0.875em;
  line-height: 1.5;
`
