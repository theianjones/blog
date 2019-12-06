/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { rhythm } from '../../lib/typography'
import { bpMaxSM } from '../../lib/breakpoints'
import Message from '../ConfirmMessage/Message'
import { PleaseConfirmIllustration } from '../ConfirmMessage/Illustrations'
import addToMailchimp from 'gatsby-plugin-mailchimp'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
})

const PostSubmissionMessage = ({ response }) => {
  return (
    <Message
      illustration={PleaseConfirmIllustration}
      title={`Great, one last thing...`}
      body={`I just sent you an email with the confirmation link. 
          **Please check your inbox!**`}
    />
  )
}

class SignUp extends React.Component {
  state = {
    submitted: false,
  }

  async handleSubmit(values) {
    this.setState({ submitted: true })
    try {
      const result = await addToMailchimp(values.email_address, {
        FNAME: values.first_name,
      })

      this.setState({
        submitted: true,
        response: result.result,
        msg: result.msg,
        errorMessage: null,
      })
    } catch (error) {
      this.setState({
        submitted: false,
        errorMessage: 'Something went wrong!',
      })
    }
  }

  render() {
    const { submitted, response, errorMessage } = this.state
    const successful = response && response.status === 'success'

    return (
      <div>
        {!successful && (
          <h2
            sx={{
              marginBottom: rhythm(1),
              marginTop: 0,
            }}
          >
            Join the Newsletter
          </h2>
        )}

        <Formik
          initialValues={{
            email_address: '',
            first_name: '',
          }}
          validationSchema={SubscribeSchema}
          onSubmit={values => this.handleSubmit(values)}
          render={({ errors, touched, isSubmitting }) => (
            <>
              {!successful && (
                <Form
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    'label:not(:first-of-type),button': {
                      marginLeft: 10,
                    },
                    '.field-error': {
                      display: 'block',
                      color: 'secondary',
                      fontSize: '80%',
                    },
                    'input,label': {
                      width: '100%',
                    },
                    [bpMaxSM]: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: 'auto',
                      'label,input': {
                        margin: '5px 0 0 0 !important',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      },
                      button: {
                        margin: '20px 0 0 0',
                      },
                    },
                  }}
                >
                  <label htmlFor="first_name">
                    <div
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      First Name
                      <ErrorMessage
                        name="first_name"
                        component="span"
                        className="field-error"
                      />
                    </div>
                    <Field
                      aria-label="your first name"
                      aria-required="false"
                      name="first_name"
                      placeholder="Jane"
                      type="text"
                      sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 3px',
                        fontFamily: 'Inter UI Regular',
                        marginTop: 2,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'rgb(250, 250, 250)',
                        borderImage: 'initial',
                        padding: '5px 10px',
                      }}
                    />
                  </label>
                  <label htmlFor="email">
                    <div
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      Email
                      <ErrorMessage
                        name="email_address"
                        component="span"
                        className="field-error"
                      />
                    </div>
                    <Field
                      aria-label="your email address"
                      aria-required="true"
                      name="email_address"
                      placeholder="jane@acme.com"
                      type="email"
                      sx={{
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 3px',
                        fontFamily: 'Inter UI Regular',
                        marginTop: 2,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'rgb(250, 250, 250)',
                        borderImage: 'initial',
                        padding: '5px 10px',
                      }}
                    />
                  </label>
                  <button
                    data-element="submit"
                    type="submit"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: 'primary',
                      color: 'rgb(255, 255, 255)',
                      cursor: 'pointer',
                      borderRadius: 4,
                      padding: '5px 10px',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: 'secondary',
                      borderImage: 'initial',
                      transition: 'all 150ms ease 0s',
                    }}
                  >
                    {!isSubmitting && 'Submit'}
                    {isSubmitting && 'Submitting...'}
                  </button>
                </Form>
              )}
              {submitted && !isSubmitting && (
                <PostSubmissionMessage response={response} />
              )}
              {errorMessage && <div>{errorMessage}</div>}
            </>
          )}
        />
      </div>
    )
  }
}

export default SignUp
