import Emailform from '../models/emailform';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
const sendgridKEY = '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';
const sgMail = require('../../node_modules/@sendgrid/mail');
sgMail.setApiKey(sendgridKEY);

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addPost(req, res) {
  if (!req.body.form.to || !req.body.form.title || !req.body.form.body) {
    res.status(403).end();
  }

  const newForm = new Emailform(req.body.form);

  // Validate the email address 
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.form.to))) {
    res.status(400).json({ error: true, message: 'Invalid Email' });
  }

  // OLLIE: Look up sendgrid api and make it send the email
  const msg = {
    to: req.body.form.to,
    from: 'ollie.elmgren@gmail.com',
    subject: req.body.form.title,
    text: req.body.form.body,
  };
  sgMail
  .send(msg)
  .then(()=> {
  })
  .catch(error => {
    console.error(error.toString());
    res.status(400).send(error);
  })
    

  // Let's sanitize inputs
  newForm.to = sanitizeHtml(newForm.to);
  newForm.title = sanitizeHtml(newForm.title);
  newForm.body = sanitizeHtml(newForm.body);
  newForm.cuid = cuid();
  newForm.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
      res.json({ form: saved, error: false, message: "Error in sending email" });
    }
    res.json({ form: saved, error: false, message: " Email sent successfully" });
  });
}


