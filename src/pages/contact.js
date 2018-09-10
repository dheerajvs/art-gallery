import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Message from '@material-ui/icons/Message'
import { withStyles } from '@material-ui/core/styles'

import withRoot from 'withRoot'
import Layout from 'components/layout'

const styles = () => ({
  container: {
    maxWidth: 480,
    width: '100%',
  },
  textField: {
    display: 'block',
  },
})

const Contact = ({ classes }) => {
  return (
    <Layout slug={'/contact/'}>
      <Grid
        container direction="column" wrap="nowrap" alignItems="center" spacing={24}
      >
        <Grid
          className={classes.container} item
          id="contact-form" component="form" netlify="netlify"
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
                id="contact-phone" label="Phone" name="phone"
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
      </Grid>
    </Layout>
  )
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Contact))
