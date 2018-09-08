import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
// import styled from 'styled-components'
// import Button from '@material/react-button'
// import Card, {
//   CardActions,
//   CardActionButtons,
// } from '@material/react-card'
// import AvatarHeader from 'components/avatarHeader'
import Layout from 'components/layout'

// const AboutCard = styled(Card)`
//   margin: 24px 16px 16px;
//   padding: 16px 16px 8px;
`

// const AboutBody = styled.div`
//   h2 {
//     font-size: 1.125em;
//     font-weight: 600;
//     margin: 0;
//   }
//   p {
//     text-align: justify;
//   }
// `

// const TestimonialSection = styled.section`
// `

// const TestimonialHeader = styled.h2`
//   font-size: 1.5em;
//   font-weight: 500;
//   text-align: center;
//   margin: 32px 0 24px;
// `

// const TestimonialContainer = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   align-items: stretch;
//   justify-content: center;
//   margin-bottom: 20px;
// `

// const TestimonialCard = styled(Card)`
//   max-width: 200px;
//   padding: 16px;
//   margin: 0 16px 16px;
// `

// const TestimonialQuote = styled.blockquote`
//   margin: 0;
//   text-align: center;
//   flex-grow: 1;
//   :before {
//     content: "\u201C";
//     display: block;
//     font-size: 48px;
//     line-height: 0;
//     padding-top: 16px;
//     text-align: left;
//   }
//   :after {
//     content: "\u201D";
//     display: block;
//     font-size: 48px;
//     line-height: 0;
//     padding-top: 24px;
//     text-align: right;
//   }
// `

// const TestimonialAuthor = styled.div`
//   font-size: 1.5em;
//   margin: 16px 0 8px;
// `

// const TestimonialPlace = styled.div`
// `

const About = ({ data }) => {
  const { frontmatter, html } = data.allMarkdownRemark.edges[0].node

  return (
    <Layout>
    </Layout>
  )
      // <section>
      //   <AboutCard>
      //     <AvatarHeader
      //       avatarUrl={frontmatter.avatar}
      //       title="About the Artist"
      //       subtitle={frontmatter.name}
      //     />
      //     <AboutBody dangerouslySetInnerHTML={{ __html: html }}/>
      //     <CardActions>
      //       <CardActionButtons>
      //         <Button>Contact the Artist</Button>
      //       </CardActionButtons>
      //     </CardActions>
      //   </AboutCard>
      // </section>
      // <TestimonialSection>
      //   <TestimonialHeader>Testimonials</TestimonialHeader>
      //   <TestimonialContainer>{
      //     frontmatter.testimonials.map(({ quote, title, place }) => (
      //       <TestimonialCard key={title}>
      //         <TestimonialQuote>{quote}</TestimonialQuote>
      //         <TestimonialAuthor>{title}</TestimonialAuthor>
      //         <TestimonialPlace>{place}</TestimonialPlace>
      //       </TestimonialCard>
      //     ))
      //   }</TestimonialContainer>
      // </TestimonialSection>
}

About.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object
  }),
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "about"}}}) {
      edges {
        node {
          frontmatter {
            name
            avatar
            testimonials {
              title
              place
              quote
            }
          }
          html
        }
      }
    }
  }
`
