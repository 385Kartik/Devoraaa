export interface LegalDocSection {
  title?: string;
  body: string;
}

export interface LegalDoc {
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalDocSection[];
}

export const legalDocs: Record<string, LegalDoc> = {
  "privacy-policy": {
    title: "Privacy Policy",
    lastUpdated: "June 2026",
    intro: "Welcome to Devoraaa (\"we\", \"our\", \"us\").\n\nAt Devoraaa, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you use our platform, website, and services.",
    sections: [
      {
        title: "1. Information We Collect",
        body: "Personal Information\n\nWhen you register or use Devoraaa, we may collect:\n- Full Name\n- Email Address\n- Phone Number\n- Profile Information\n- Portfolio Links\n- Resume or Professional Details\n- Payment Information (if applicable)\n\nUsage Information\n\nWe may automatically collect:\n- Device Information\n- Browser Type\n- IP Address\n- Pages Visited\n- Session Data\n- Referral Sources\n- Cookies and Analytics Data"
      },
      {
        title: "2. How We Use Your Information",
        body: "We use collected information to:\n- Create and manage user accounts\n- Match freelancers with clients\n- Improve platform functionality\n- Provide customer support\n- Prevent fraud and abuse\n- Process payments\n- Send important updates and notifications\n- Comply with legal obligations"
      },
      {
        title: "3. Sharing of Information",
        body: "We do not sell personal information.\n\nWe may share information with:\n- Service providers assisting platform operations\n- Payment processors\n- Analytics providers\n- Legal authorities when required by law\n- Other users where profile information is intentionally made public"
      },
      {
        title: "4. Cookies & Tracking Technologies",
        body: "Devoraaa may use cookies and similar technologies to:\n- Remember user preferences\n- Improve performance\n- Analyze traffic patterns\n- Enhance user experience\n\nUsers may disable cookies through browser settings, though some features may not function properly."
      },
      {
        title: "5. Data Security",
        body: "We implement reasonable administrative, technical, and physical safeguards to protect your information.\n\nHowever, no internet transmission or electronic storage system can be guaranteed to be 100% secure."
      },
      {
        title: "6. Third-Party Services",
        body: "Our platform may integrate with third-party services including:\n- Payment Providers\n- Authentication Services\n- Analytics Platforms\n- Cloud Hosting Providers\n\nThese services operate under their own privacy policies."
      },
      {
        title: "7. User Rights",
        body: "You may:\n- Access your information\n- Update profile information\n- Request account deletion\n- Request correction of inaccurate information\n- Withdraw consent where applicable\n\nRequests can be submitted through our support team."
      },
      {
        title: "8. Data Retention",
        body: "We retain information only as long as necessary for operational, legal, security, and business purposes."
      },
      {
        title: "9. Children's Privacy",
        body: "Devoraaa is not intended for individuals under the age of 18.\n\nWe do not knowingly collect information from minors."
      },
      {
        title: "10. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time.\n\nContinued use of the platform after updates constitutes acceptance of the revised policy."
      },
      {
        title: "11. Contact Us",
        body: "For privacy-related questions, contact:\n\nDevoraaa Support\nEmail: support@devoraaa.com"
      }
    ]
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    lastUpdated: "June 2026",
    intro: "Welcome to Devoraaa.\n\nBy accessing or using Devoraaa, you agree to comply with these Terms & Conditions.",
    sections: [
      {
        title: "1. Acceptance of Terms",
        body: "By creating an account or using the platform, you agree to these Terms and all applicable laws and regulations.\n\nIf you do not agree, please do not use Devoraaa."
      },
      {
        title: "2. Platform Overview",
        body: "Devoraaa is a platform that connects freelancers, professionals, and clients.\n\nDevoraaa acts only as an intermediary platform and is not a direct employer, contractor, or agency unless explicitly stated otherwise."
      },
      {
        title: "3. User Accounts",
        body: "Users agree to:\n- Provide accurate information\n- Maintain account security\n- Keep login credentials confidential\n- Accept responsibility for account activity\n\nWe reserve the right to suspend accounts that violate these terms."
      },
      {
        title: "4. Freelancer Responsibilities",
        body: "Freelancers agree to:\n- Deliver services honestly and professionally\n- Provide accurate portfolio information\n- Meet agreed deadlines\n- Avoid fraudulent or misleading claims"
      },
      {
        title: "5. Client Responsibilities",
        body: "Clients agree to:\n- Provide clear project requirements\n- Communicate respectfully\n- Pay agreed fees where applicable\n- Avoid abusive or fraudulent behavior"
      },
      {
        title: "6. Payments",
        body: "Where payment services are offered:\n- All payments must follow platform guidelines.\n- Processing fees may apply.\n- Refund eligibility will be determined according to platform policies.\n\nDevoraaa may use third-party payment providers."
      },
      {
        title: "7. Intellectual Property",
        body: "Users retain ownership of content they create.\n\nBy posting content on Devoraaa, users grant Devoraaa a limited license to display and distribute content for platform operation and promotion."
      },
      {
        title: "8. Prohibited Activities",
        body: "Users may not:\n- Upload illegal content\n- Impersonate others\n- Engage in fraud or scams\n- Harass users\n- Distribute malware\n- Attempt unauthorized access\n- Manipulate reviews or ratings\n\nViolation may result in account suspension or termination."
      },
      {
        title: "9. Limitation of Liability",
        body: "Devoraaa is provided on an \"as is\" and \"as available\" basis.\n\nWe do not guarantee:\n- Continuous platform availability\n- Project success\n- Freelancer performance\n- Client payment behavior\n\nTo the maximum extent permitted by law, Devoraaa shall not be liable for indirect, incidental, or consequential damages."
      },
      {
        title: "10. Termination",
        body: "We reserve the right to suspend or terminate accounts that violate these Terms or pose risks to platform integrity."
      },
      {
        title: "11. Modifications",
        body: "We may modify these Terms at any time.\n\nContinued use of the platform constitutes acceptance of updated Terms."
      },
      {
        title: "12. Governing Law",
        body: "These Terms shall be governed by and interpreted in accordance with the laws of India.\n\nAny disputes shall be subject to the jurisdiction of the courts located in Mumbai, Maharashtra, India."
      },
      {
        title: "13. Contact",
        body: "Devoraaa Support\nEmail: support@devoraaa.com"
      }
    ]
  },
  "refund-policy": {
    title: "Refund Policy",
    lastUpdated: "June 2026",
    intro: "We aim to ensure a fair and secure marketplace for both clients and freelancers. This policy outlines how refunds are handled on Devoraaa.",
    sections: [
      {
        title: "1. Freelance Contracts",
        body: "Because Devoraaa acts as an intermediary connecting clients and freelancers, refunds are primarily governed by the specific contract and milestone agreements established between the two parties."
      },
      {
        title: "2. Escrow & Milestones",
        body: "When funds are held in escrow, clients may request a refund before the milestone is approved. Once a milestone is approved and funds are released to the freelancer, the transaction is generally considered final."
      },
      {
        title: "3. Dispute Resolution",
        body: "If a client is dissatisfied with the delivered work, they must initiate a dispute within 7 days of the delivery. Devoraaa will mediate the dispute based on the original project requirements, communications, and delivered assets."
      },
      {
        title: "4. Platform Fees",
        body: "Devoraaa platform fees and payment processing fees are non-refundable unless the refund is initiated due to a technical error on our part."
      }
    ]
  },
  "cookie-policy": {
    title: "Cookie Policy",
    lastUpdated: "June 2026",
    intro: "This Cookie Policy explains how Devoraaa uses cookies and similar technologies to recognize you when you visit our platform.",
    sections: [
      {
        title: "1. What are cookies?",
        body: "Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information."
      },
      {
        title: "2. Why do we use cookies?",
        body: "We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our platform to operate (Essential Cookies). Other cookies enable us to track and target the interests of our users to enhance the experience on our platform (Performance and Functionality Cookies)."
      },
      {
        title: "3. How can you control cookies?",
        body: "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted."
      }
    ]
  },
  "community-guidelines": {
    title: "Community Guidelines",
    lastUpdated: "June 2026",
    intro: "Devoraaa is a professional community. We expect all users to interact with respect, integrity, and professionalism.",
    sections: [
      {
        title: "1. Professionalism",
        body: "Maintain a high standard of professional communication. Do not use profanity, hate speech, or discriminatory language."
      },
      {
        title: "2. No Spam or Self-Promotion",
        body: "Do not spam clients with irrelevant proposals or messages. Ensure that your communications are targeted and relevant to the project at hand."
      },
      {
        title: "3. Honesty and Transparency",
        body: "Accurately represent your skills, experience, and the work you deliver. Do not claim ownership of work that is not yours."
      },
      {
        title: "4. Zero Tolerance for Harassment",
        body: "We have a zero-tolerance policy for harassment, bullying, or intimidation. Any user found violating this will be permanently banned."
      }
    ]
  },
  "freelancer-code-of-conduct": {
    title: "Freelancer Code of Conduct",
    lastUpdated: "June 2026",
    intro: "As a freelancer on Devoraaa, you represent not just yourself, but the entire community of professionals on our platform. Adhering to this Code of Conduct ensures a trusted environment for everyone.",
    sections: [
      {
        title: "1. Quality of Work",
        body: "Commit to delivering high-quality work that meets or exceeds the client's expectations and matches the agreed-upon requirements."
      },
      {
        title: "2. Communication",
        body: "Respond to client messages promptly. If you face delays or challenges, communicate them transparently and proactively."
      },
      {
        title: "3. Meeting Deadlines",
        body: "Time is money. Respect the deadlines you agree to. Consistently missing deadlines may result in penalties or account suspension."
      },
      {
        title: "4. Confidentiality",
        body: "Respect the confidentiality of your clients. Do not share their proprietary information, code, or business strategies without explicit permission."
      }
    ]
  },
  "client-protection-policy": {
    title: "Client Protection Policy",
    lastUpdated: "June 2026",
    intro: "Devoraaa is committed to ensuring that clients get exactly what they pay for. Our Client Protection Policy is designed to give you peace of mind.",
    sections: [
      {
        title: "1. Vetted Professionals",
        body: "We implement screening processes to ensure that the freelancers on our platform have the skills and experience they claim."
      },
      {
        title: "2. Secure Payments",
        body: "Funds are held securely and are only released when milestones are met and approved by you. You have full control over the release of funds."
      },
      {
        title: "3. Dispute Mediation",
        body: "If a project goes off track and an agreement cannot be reached with the freelancer, our dedicated mediation team will step in to review the evidence and make a fair determination."
      },
      {
        title: "4. Anti-Fraud Mechanisms",
        body: "We actively monitor the platform for fraudulent activity, fake profiles, and suspicious transactions to protect your financial and project data."
      }
    ]
  },
  "trust-and-safety": {
    title: "Trust & Safety Policy",
    lastUpdated: "June 2026",
    intro: "Trust is the foundation of the Devoraaa marketplace. This policy outlines our continuous efforts to maintain a secure and reliable platform.",
    sections: [
      {
        title: "1. Identity Verification",
        body: "We employ robust identity verification mechanisms to ensure that users are who they say they are, reducing the risk of impersonation and scams."
      },
      {
        title: "2. Secure Infrastructure",
        body: "Devoraaa uses industry-standard encryption protocols (SSL/TLS) for data transmission and secure hash algorithms for data storage."
      },
      {
        title: "3. Reporting Mechanism",
        body: "Users can easily report suspicious behavior, inappropriate content, or policy violations directly through the platform. Our Trust & Safety team reviews these reports 24/7."
      },
      {
        title: "4. Algorithmic Monitoring",
        body: "We utilize advanced machine learning algorithms to detect anomalies in messaging patterns, payment flows, and account activities to proactively block threats."
      }
    ]
  }
};
