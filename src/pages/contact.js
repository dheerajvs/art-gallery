import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Message from '@material-ui/icons/Message'
import { withStyles } from '@material-ui/core/styles'

import withRoot from 'withRoot'
import Layout from 'components/layout'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  container: {
    maxWidth: 480,
    width: '100%',
  },
  textField: {
    display: 'block',
  },
})

class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackOpen: false
    }
  }

  componentDidMount() {
    if (typeof(window) !== 'undefined'
      && window.location.hash === '#submit-message') {
      this.setState({ snackOpen: true })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Layout slug={'/contact/'}>
        <Grid
          container direction="column" wrap="nowrap" alignItems="center"
          spacing={24}
        >
          <Grid
            className={classes.container} item
            name="contact-form" component="form" method="POST"
            action="/contact/#submit-message" data-netlify="true"
          >
            <Card>
              <CardContent>
                <Typography variant="headline">Contact the Artist</Typography>
                <TextField
                  className={classes.textField} fullWidth margin="normal"
                  id="contact-name" label="Name" name="name" required
                  autoComplete="name" type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textField} fullWidth margin="normal"
                  id="contact-phone" label="Phone" name="phone" required
                  autoComplete="tel" type="tel"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textField} fullWidth margin="normal"
                  id="contact-email" label="Email" name="email"
                  autoComplete="email" type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.textField} fullWidth margin="normal"
                  id="contact-message" label="Message" name="message" type="text"
                  multiline rows={3} rowsMax={5} required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Message />
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
              <CardActions>
                <Button color="primary" variant="raised" type="submit">
                  Submit
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackOpen}
            onClose={this.handleCloseSnack}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Message submitted</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleCloseSnack}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Grid>
      </Layout>
    )
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Contact))
