import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {addEmailRequest, clearMessage} from './EmailformActions';

// Import Style
import styles from './Emailform.css';

class Emailform extends Component {

  constructor(props) {
    super(props);
    this.state = {
      to: "",
      title: "",
      body: ""
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleAddForm = (to, title, body) => {
    this.props.dispatch(addEmailRequest({ to, title, body }));
  }
  
  handleFormSubmit = () => {
    this.handleAddForm(this.state.to, this.state.title, this.state.body);
  }

  clearForm = () => {
    this.setState({to: "", title: "", body: ""});
    this.props.dispatch(clearMessage());
  }

  handleFormChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <div className="form-horizontal" action="#">
        <fieldset>
        <legend>Email Form</legend>

        <div className="form-group">
          <label className="col-lg-6 control-label">To: </label>  
          <div className="col-lg-6">
            <input id="textinput" name="to" value={this.state.to} onChange={this.handleFormChange} type="text" className="form-control input-md"/>
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-6 control-label">Title: </label>  
          <div className="col-lg-6">
            <input id="textinput" name="title" value={this.state.title} onChange={this.handleFormChange} type="text" className="form-control input-md"/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-lg-6 control-label">Body </label>
          <div className="col-lg-6">                     
            <textarea className="form-control" id="textarea" name="body" value={this.state.body} onChange={this.handleFormChange}></textarea>
          </div>
        </div>

        <div className="form-group">
          <div className="col-lg-6">
            <button id="singlebutton" name="singlebutton" className="btn btn-primary" onClick={() => this.handleFormSubmit()}>Submit</button>
          </div>
        </div>

        </fieldset>
        {this.props.message && 
        <div>
          <button id="singlebutton" name="singlebutton" className="btn btn-primary" onClick={() => this.clearForm()}>Send Another Email</button>
          {this.props.message}
        </div>
        }
        </div>
   
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { err: state.email.err, message: state.email.message };
};

const mapDispatchToProps = (dispatch) => {
  return {dispatch};
};

Emailform.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Emailform);
