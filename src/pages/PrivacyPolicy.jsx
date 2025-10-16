import React from "react";


export default function PrivacyPolicy() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
      <h1>Privacy Policy - PropertyTrackkrr</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>
        PropertyTrackkrr is an AI-powered real estate assistant platform designed to help property brokers
        manage listings and communicate with clients through WhatsApp and a secure dashboard.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We collect and process information such as your name, phone number, email, and property details
        when you interact with our platform or chatbot. We may also receive images, videos, and property
        descriptions sent via WhatsApp for listing purposes.
      </p>
      <h2>How We Use Your Data</h2>
      <ul>
        <li>To create, manage, and display property listings</li>
        <li>To improve our AI chatbot and broker dashboard experience</li>
        <li>To send important service updates and notifications</li>
      </ul>
      <h2>Data Storage and Security</h2>
      <p>
        All data is securely stored on our cloud servers and databases (such as PostgreSQL and Cloudinary).
        We do not sell, rent, or share your personal information with third parties except where required by law.
      </p>
      <h2>WhatsApp and Meta Compliance</h2>
      <p>
        Our WhatsApp integration is powered by the Meta Cloud API. By using the WhatsApp bot,
        you agree that your messages and media are processed securely for the purposes of providing
        real estate management services.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this policy, please contact us at:<br />
        <a href="mailto:Krishndhanrajconstruction@gmail.com">Krishndhanrajconstruction@gmail.com</a>
      </p>
    </div>
  );
}
