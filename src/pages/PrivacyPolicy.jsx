import React from "react";

export default function PrivacyPolicy() {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "auto",
        lineHeight: "1.8",
        fontFamily: "Inter, sans-serif",
        color: "#222",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Privacy Policy – PropTrackrr
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "2rem" }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p>
        <strong>PropTrackrr</strong> is an AI-powered real estate assistant platform designed to
        help property brokers manage listings and communicate with clients through WhatsApp and a
        secure online dashboard.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect your name, phone number, email, and property details when you interact with our
        platform or chatbot. We may also receive images, videos, and descriptions via WhatsApp for
        listing purposes.
      </p>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>To create, manage, and display property listings</li>
        <li>To improve our AI chatbot and dashboard</li>
        <li>To send important service updates and notifications</li>
      </ul>

      <h2>3. Data Security</h2>
      <p>
        Your data is stored securely on cloud servers (like PostgreSQL and Cloudinary). We never sell
        or share your data, except as required by law.
      </p>

      <h2>4. Meta / WhatsApp API</h2>
      <p>
        Our WhatsApp integration uses the <strong>Meta Cloud API</strong>. By chatting with our bot,
        you agree that your messages and media are processed securely to enable property management
        features.
      </p>

      <h2>5. Contact</h2>
      <p>
        For questions, email us at:{" "}
        <a href="mailto:Krishndhanrajconstruction@gmail.com">
          Krishndhanrajconstruction@gmail.com
        </a>
      </p>

      <hr style={{ margin: "2rem 0" }} />
      <p style={{ fontSize: "0.9rem", color: "#777", textAlign: "center" }}>
        © {new Date().getFullYear()} PropTrackrr. All rights reserved.
      </p>
    </div>
  );
}
