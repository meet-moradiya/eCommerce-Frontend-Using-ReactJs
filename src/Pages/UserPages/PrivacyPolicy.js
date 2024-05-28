import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="privacyPolicy">
      <h1>Privacy Policy</h1>
      <p>
        At <strong>MD MART,</strong> we take your privacy seriously. This Privacy Policy describes how we collect, use, and share information when you
        use our website or services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        - We collect information you provide to us when you register an account, make a purchase, or communicate with us. This may include your name,
        email address, shipping address, payment information, and any other information you choose to provide.
      </p>
      <p>- We may also collect information automatically through cookies and similar technologies when you use our website.</p>

      <h2>How We Use Your Information</h2>
      <p>
        - We use the information we collect to process your orders, communicate with you, improve our services, and personalize your experience on our
        website.
      </p>

      <h2>Information Sharing</h2>
      <p>
        - We may share your information with third-party service providers who help us operate our website and fulfill orders. We may also share
        information when required by law or to protect our rights.
      </p>
      <p>- Your information may be transferred to and stored on servers located outside of your country of residence.</p>

      <h2>Security</h2>
      <p>
        - We take appropriate measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of
        transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
      </p>
      <p>- You are responsible for maintaining the confidentiality of your account credentials.</p>

      <h2>Cookie Policy</h2>
      <p>
        - Our website uses cookies to improve your browsing experience. By using our website, you consent to the use of cookies in accordance with
        this Privacy Policy.
      </p>
      <p>- You can manage cookies through your browser settings, but disabling cookies may affect your browsing experience.</p>

      <h2>Third-Party Links</h2>
      <p>
        - Our website may contain links to third-party websites. We have no control over the content and privacy practices of these websites, so we
        encourage you to review the privacy policies of any third-party sites you visit.
      </p>

      <h2>Review Policy</h2>
      <p>
        - To leave a review on our website, you must have ordered and received the product. We believe that authentic reviews are essential for
        providing valuable feedback to our community.
      </p>
      <p>
        - Once your order has been delivered, you can submit a review through your account dashboard or via the email link provided after your
        purchase.
      </p>
      <p>
        - We encourage honest and constructive feedback from our customers. Please ensure that your reviews are respectful and relevant to the product
        and shopping experience.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        - Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If
        you are a parent or guardian and believe that your child has provided us with personal information, please contact us so that we can delete
        the information.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        - We may update this Privacy Policy from time to time. Any changes will be posted on this page, so please check back periodically for updates.
      </p>

      <h2>Contact Us</h2>
      <p>
        - If you have any questions about this Privacy Policy, please contact us at <strong>contact@mdmart.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
