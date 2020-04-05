import callApi from '../../util/apiCaller';
// Export Constants
export const ADD_EMAILFORM = 'ADD_EMAILFORM';
export const ADD_EMAILERRORRESPONSE = 'ADD_EMAILERRORRESPONSE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

// Export Actions
export function addEmailForm(form, message) {
    return {
      type: ADD_EMAILFORM,
      form,
      message,
      err: false
    };
}

export function addErrorResponse(message) {
    return {
      type: ADD_EMAILERRORRESPONSE,
      message,
      err: true
    };
}

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE
    };
}

export function addEmailRequest(form) {
    return (dispatch) => {
        return callApi('email', 'post', {
            form: {
                to: form.to,
                title: form.title,
                body: form.body,
            },
        }).then(res => dispatch(addEmailForm(res.form, res.message)))
          .catch(err => dispatch(addErrorResponse(err.message)));
    };
}
