import React, { Component, ChangeEvent, FormEvent } from "react";
import "./ContactForm.css";

// Define the form state type
interface ContactFormState {
  email: string;
  subject: string;
  message: string;
}

class ContactForm extends Component<Record<string, never>, ContactFormState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      email: "",
      subject: "",
      message: "",
    };

    // Bind event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle input change
  handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    } as Pick<ContactFormState, keyof ContactFormState>);
  }

  // Handle form submission
  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", this.state);
  }

  render() {
    return (
      <div className="contact-form">
        <div className="divider" id="title">
          Contact Us
        </div>

        <form onSubmit={this.handleSubmit} className="form-content">
          <div className="card-content">
            <div className="input-content">
              <label>Email</label>
              <input
                className="input-box"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="input-content">
              <label>Subject</label>
              <input
                className="input-box"
                type="text"
                name="subject"
                value={this.state.subject}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="input-content">
              <label>Message</label>
              <textarea
                className="text-box"
                name="message"
                value={this.state.message}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="button-content">
              <button className="button">Send </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
