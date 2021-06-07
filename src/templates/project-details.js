import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/Layout"
import * as styles from "../styles/project-details.module.css"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProjectDetails = ({ data }) => {
  const { html } = data.markdownRemark;
  const { title, stack, featuredImg } = data.markdownRemark.frontmatter;
  const imgPath = getImage(featuredImg.childImageSharp.gatsbyImageData);

  return (
    <Layout>
      <div className={styles.details}>
        <h2>{ title }</h2>
        <h3>{ stack }</h3>
        <div className={styles.featured}>
          <GatsbyImage image={imgPath} alt={title} />
        </div>
        <div className={styles.html} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectDetails($slug: String) { # $slug is from variable in gatsby-node.js
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        stack
        title
        featuredImg {
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

export default ProjectDetails
