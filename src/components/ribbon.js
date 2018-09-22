import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    position: 'absolute',
    overflow: 'hidden',
    left: -5,
    top: -5,
    width: 75,
    height: 75,
    textAlign: 'right',
    zIndex: 1,
  },
  span: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: '20px',
    transform: 'rotate(-45deg)',
    width: 100,
    display: 'block',
    background: 'linear-gradient(#F70505 0%, #8F0808 100%)',
    boxShadow: '0 3px 10px -5px rgba(0, 0, 0, 1)',
    position: 'absolute',
    top: 19,
    left: -21,

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '100%',
      zIndex: -1,
      borderLeft: '3px solid #8F0808',
      borderRight: '3px solid transparent',
      borderBottom: '3px solid transparent',
      borderTop: '3px solid #8F0808',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '100%',
      zIndex: -1,
      borderLeft: '3px solid transparent',
      borderRight: '3px solid #8F0808',
      borderBottom: '3px solid transparent',
      borderTop: '3px solid #8F0808',
    },
  }
})

const Ribbon = ({ children, classes }) => (
  <div className={classes.root}>
    <span className={classes.span}>
      {children}
    </span>
  </div>
)

Ribbon.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Ribbon)
