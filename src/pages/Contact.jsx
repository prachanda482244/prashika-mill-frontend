import React from "react";
import { Form, Formik } from "formik";
import FormikInput from "../formik/FormikInput";
import { contactValidationSchema } from "../constants/constants";
import toast from "react-hot-toast";
import { CiLocationOn, CiPhone, CiMail } from "react-icons/ci";

const Contact = () => {
      const handleSubmit = async (values, { resetForm }) => {
            try {
                  // Replace with your actual submission logic
                  console.log(values);
                  toast.success("Message sent successfully!");
                  resetForm();
            } catch (error) {
                  toast.error("Failed to send message");
            }
      };

      return (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="text-center mb-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                              Have questions or feedback? We'd love to hear from you.
                        </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                              <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

                              <Formik
                                    initialValues={{ name: "", email: "", message: "" }}
                                    validationSchema={contactValidationSchema}
                                    onSubmit={handleSubmit}
                              >
                                    {({ isSubmitting }) => (
                                          <Form className="space-y-4">
                                                <FormikInput
                                                      name="name"
                                                      label="Your Name"
                                                      placeholder="Eg:Prakash rana"
                                                      required
                                                />
                                                <FormikInput
                                                      name="email"
                                                      type="email"
                                                      label="Email Address"
                                                      placeholder="your@email.com"
                                                      required
                                                />
                                                <FormikInput
                                                      name="message"
                                                      label="Your Message"
                                                      as="textarea"
                                                      rows="4"
                                                      placeholder="Type your message here..."
                                                      required
                                                />
                                                <button
                                                      type="submit"
                                                      disabled={isSubmitting}
                                                      className={`w-full py-3 px-4 rounded-md font-medium transition-colors
                    ${isSubmitting
                                                                  ? "bg-gray-400 cursor-not-allowed"
                                                                  : "bg-black text-white hover:bg-gray-800"}`}
                                                >
                                                      {isSubmitting ? "Sending..." : "Send Message"}
                                                </button>
                                          </Form>
                                    )}
                              </Formik>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

                              <div className="space-y-6">
                                    <div className="flex items-start">
                                          <div className="flex-shrink-0 mt-1">
                                                <CiLocationOn className="h-6 w-6 text-gray-600" />
                                          </div>
                                          <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Our Location</h3>
                                                <p className="mt-1 text-gray-600">
                                                      Syauli,<br />
                                                      Dhading, Nepal
                                                </p>
                                          </div>
                                    </div>

                                    <div className="flex items-start">
                                          <div className="flex-shrink-0 mt-1">
                                                <CiPhone className="h-6 w-6 text-gray-600" />
                                          </div>
                                          <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                                <p className="mt-1 text-gray-600">
                                                      +977 9860115454<br />
                                                      Mon-Fri, 9am-5pm
                                                </p>
                                          </div>
                                    </div>

                                    <div className="flex items-start">
                                          <div className="flex-shrink-0 mt-1">
                                                <CiMail className="h-6 w-6 text-gray-600" />
                                          </div>
                                          <div className="ml-4">
                                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                                <p className="mt-1 text-gray-600">
                                                      prakash@gmail.com<br />
                                                      We respond within 24 hours
                                                </p>
                                          </div>
                                    </div>
                              </div>

                              <div className="mt-8">
                                    <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                                    <ul className="space-y-2 text-gray-600">
                                          <li className="flex justify-between">
                                                <span>Monday - Friday</span>
                                                <span>9:00 AM - 6:00 PM</span>
                                          </li>
                                          <li className="flex justify-between">
                                                <span>Saturday</span>
                                                <span>10:00 AM - 4:00 PM</span>
                                          </li>
                                          <li className="flex justify-between">
                                                <span>Sunday</span>
                                                <span>Closed</span>
                                          </li>
                                    </ul>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Contact;