// Copyright (c) 2026 Nimul Islam Mahin and contributors
// SPDX-License-Identifier: MIT
// See the LICENSE file for details.

/**
 * Designed By:
 * Name: Imalsha Kandamby
 * Dribble Profile: https://dribbble.com/gihKandamby
 */

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OtpVerificationEmailProps {
  recipientName?: string;
  otp?: string;
  otpValiditySeconds?: number;
  supportEmail?: string;
  teamName?: string;
  companyName?: string;
  companyLogoUrl?: string;
  companyDomain?: string;
  companyDomainUrl?: string;
  year?: number;
  contactEmail?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
}

const OtpVerificationEmail1 = ({
  recipientName = "Hansi",
  otp = "748291",
  otpValiditySeconds = 120,
  supportEmail = "support@bookhaven.com.lk",
  teamName = "Team Book Haven",
  companyName = "Company",
  companyLogoUrl = "https://resend-attachments.s3.amazonaws.com/1d45bb9f-b203-443e-b04d-87bbc783ef94",
  companyDomain = "bookhavenpublications.com.lk",
  companyDomainUrl = "http://bookhavenpublications.com.lk",
  year = new Date().getFullYear(),
  contactEmail = "hello@bookhaven.com.lk",
  facebookUrl = "#",
  linkedinUrl = "#",
  youtubeUrl = "#",
}: OtpVerificationEmailProps) => {
  const otpDigits = otp.split("");
  const otpMinutes = Math.floor(otpValiditySeconds / 60);
  const otpValidityLabel =
    otpValiditySeconds % 60 === 0
      ? `${otpMinutes} minute${otpMinutes === 1 ? "" : "s"}`
      : `${otpValiditySeconds} seconds`;

  return (
    <Html dir="ltr" lang="en">
      <Head />
      <Preview>Your OTP code is {otp}. Use it to reset your password.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={greeting}>Hi {recipientName},</Text>
          <Text style={paragraph}>
            You have requested to reset your account.
          </Text>
          <Text style={paragraph}>
            To ensure safety &amp; security, please use the following OTP code
            to verify your account. You will then be prompted to reset a new
            password.
          </Text>

          {/* OTP box */}
          <Section style={otpSection}>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              align="center"
              style={{ margin: "0 auto" }}
            >
              <tbody>
                <tr>
                  {otpDigits.map((digit, index) => (
                    <td
                      key={index}
                      style={{
                        padding:
                          index === otpDigits.length - 1 ? 0 : "0 8px 0 0",
                      }}
                    >
                      <table
                        role="presentation"
                        cellPadding="0"
                        cellSpacing="0"
                        style={otpBox}
                      >
                        <tbody>
                          <tr>
                            <td style={otpBoxCell}>{digit}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Section>

          <Text style={paragraph}>
            Please enter this OTP within {otpValidityLabel} of receiving this
            email to complete your verification process.
          </Text>

          <Text style={{ ...paragraph, color: "#5d5d5d", fontStyle: "italic" }}>
            If you did not request this, please contact support.
          </Text>
          <Text style={paragraph}>
            <Link href={`mailto:${supportEmail}`} style={link}>
              {supportEmail}
            </Link>
          </Text>

          <Text style={{ ...paragraph, color: "#5d5d5d" }}>
            Note: This is a system generated message. Do not reply.
          </Text>

          <Text style={paragraph}>
            Best Regards,
            <br />
            <strong>{teamName}</strong>
          </Text>

          <Hr style={divider} />

          <Row>
            <Column align="center">
              <Img
                src={companyLogoUrl}
                width="127"
                height="28"
                alt={`Logo with three overlapping circles and the word "${companyName}".`}
                style={logo}
              />
            </Column>
          </Row>

          <Text style={footerCenteredText}>
            © <span style={{ color: "#5d5d5d" }}>{year}</span>{" "}
            <Link href={companyDomainUrl} style={link}>
              {companyDomain}
            </Link>
          </Text>
          <Text style={footerCenteredText}>
            <Link href={`mailto:${contactEmail}`} style={link}>
              {contactEmail}
            </Link>
          </Text>

          {/* Social icons */}
          <table
            role="presentation"
            cellPadding="0"
            cellSpacing="0"
            align="center"
            style={{ margin: "16px auto 0" }}
          >
            <tbody>
              <tr>
                <td style={socialIconCell}>
                  <Link href={facebookUrl}>
                    <Img
                      src="https://resend-attachments.s3.amazonaws.com/fab7594c-d92b-4003-81df-706cbce231ff"
                      width="25"
                      height="25"
                      alt="The Facebook logo is a white lowercase f on a blue circle."
                      style={socialIcon}
                    />
                  </Link>
                </td>
                <td style={socialIconCell}>
                  <Link href={linkedinUrl}>
                    <Img
                      src="https://resend-attachments.s3.amazonaws.com/9961c4cc-8ff7-4ab3-ad80-15c2267b5837"
                      width="25"
                      height="25"
                      alt='The LinkedIn logo is a white "in" on a blue square background.'
                      style={socialIcon}
                    />
                  </Link>
                </td>
                <td style={{ ...socialIconCell, paddingRight: 0 }}>
                  <Link href={youtubeUrl}>
                    <Img
                      src="https://resend-attachments.s3.amazonaws.com/b60a2f28-8def-4a2e-9893-c4600216636a"
                      width="30"
                      height="20"
                      alt="The YouTube logo is a red rectangle with rounded corners and a white play button in the center."
                      style={socialIcon}
                    />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Container>
      </Body>
    </Html>
  );
};

export default OtpVerificationEmail1;

// ---------------------------------------------------------------
// Styles
// ---------------------------------------------------------------

const main: React.CSSProperties = {
  margin: 0,
  padding: "8px",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "1em",
  lineHeight: "155%",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  width: "100%",
  margin: "0 auto",
};

const greeting: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const paragraph: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const otpSection: React.CSSProperties = {
  boxSizing: "border-box",
  backgroundColor: "#e0f2fe",
  padding: "20px",
  textAlign: "center",
};

const otpBox: React.CSSProperties = {
  width: "40px",
  height: "40px",
  backgroundColor: "#bae6fd",
  borderRadius: "5px",
  border: "1px solid #38bdf8",
};

const otpBoxCell: React.CSSProperties = {
  width: "40px",
  height: "40px",
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "16px",
  fontWeight: 600,
  color: "#000000",
};

const divider: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderTop: "1px solid #eaeaea",
  margin: "24px 0",
};

const logo: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "none",
  textDecoration: "none",
  margin: "0 auto",
};

const footerCenteredText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  textAlign: "center",
};

const socialIconCell: React.CSSProperties = {
  paddingRight: "12px",
  verticalAlign: "middle",
};

const socialIcon: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "none",
  textDecoration: "none",
};

const link: React.CSSProperties = {
  color: "#0670DB",
  textDecoration: "underline",
};
