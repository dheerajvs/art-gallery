import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Button from '@material/react-button'
import MaterialIcon from '@material/react-material-icon'
import {
  CardActions,
  CardActionButtons,
  CardActionIcons
} from '@material/react-card'
import {
  MainBox,
  MainImageBox,
  MainImage,
  DescriptionCard,
  CardContent,
  ImageTitle,
  ImageSubtitle,
  ImageDescription,
} from './styled'

const Item = ({ data }) => {
  const { frontmatter: item } = data.markdownRemark

  return (
    <Layout>
      <MainBox>
        <MainImageBox>
          <MainImage src={item.large_image} alt={item.title} />
        </MainImageBox>
        <DescriptionCard>
          <CardContent>
            <ImageTitle>{item.title}</ImageTitle>
            <ImageSubtitle>{item.medium}</ImageSubtitle>
            <ImageDescription>{item.description}</ImageDescription>
            <ImageDescription>
              {`${item.width} \xD7 ${item.height} inches`}
              {` (${Math.round(item.width * 2.54)}`}
              {` \xD7 ${Math.round(item.height * 2.54)} cm)`}
            </ImageDescription>
            {item.sold && (
              <ImageDescription>{
                `Sold out ${
                  item.available ? '(available as commissioned work)' : ''
                }`
              }</ImageDescription>
            )}
          </CardContent>
          <CardActions>
            <CardActionButtons>
              <Button>Enquire</Button>
            </CardActionButtons>
            <CardActionIcons>
              <MaterialIcon icon="share" hasRipple />
            </CardActionIcons>
          </CardActions>
        </DescriptionCard>
      </MainBox>
    </Layout>
  )
}

Item.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
  }),
}

export default Item

export const pageQuery = graphql`
  query ItemByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        medium
        description
        width
        height
        sold
        available
        large_image
      }
    }
  }
`
