// Copyright (c) 2026 Nimul Islam Mahin and contributors
// SPDX-License-Identifier: MIT
// See the LICENSE file for details.

/**
 * Designed By:
 * Name: Chimela (Brain) Enyinnaya
 * Linkedin Profile: https://www.linkedin.com/in/chimela-enyinnaya-6165431b3/
 * Design Url: https://lnkd.in/p/gY355BEm
 */

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SignupVerificationEmailProps {
  otp?: string;
  appLogoUrl?: string;
  deviceInfo?: string;
  requestDate?: string;
  teamName?: string;
  email_title?: string;
}

const OtpVerificationEmail2 = ({
  otp = "748291",
  appLogoUrl = "https://resend-attachments.s3.amazonaws.com/65e9e264-3469-4cd6-b2a7-488b0571b4a8",
  deviceInfo = "Chrome on macOS",
  requestDate = "12/02/2024",
  teamName = "The Curatane Team",
  email_title = "Your signup verification code is",
}: SignupVerificationEmailProps) => {
  const otpDigits = otp.split("");

  return (
    <Html dir="ltr" lang="en">
      <Head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .logo-box, .otp-box {
              background-color: #e8e8e8 !important;
            }
          }
        `}</style>
      </Head>
      <Preview>
        {email_title} {otp}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* App logo */}
          <Row>
            <Column align="center">
              <table
                role="presentation"
                cellPadding="0"
                cellSpacing="0"
                style={logoBoxTable}
              >
                <tbody>
                  <tr>
                    <td className="logo-box" style={logoBoxCell}>
                      <Img
                        src={appLogoUrl}
                        width="54"
                        height="54"
                        alt="A light blue and white checkered pattern."
                        style={logoImage}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Column>
          </Row>

          <Heading as="h3" style={headingTop}>
            {email_title}
          </Heading>
          <Heading as="h3" style={headingBottom}>
            Code
          </Heading>

          {/* OTP boxes */}
          <table
            role="presentation"
            cellPadding="0"
            cellSpacing="0"
            align="center"
            style={{ margin: "24px auto 0" }}
          >
            <tbody>
              <tr>
                {otpDigits.map((digit, index) => (
                  <td
                    key={index}
                    style={{
                      padding: index === otpDigits.length - 1 ? 0 : "0 8px 0 0",
                    }}
                  >
                    <table
                      role="presentation"
                      cellPadding="0"
                      cellSpacing="0"
                      style={otpBoxTable}
                    >
                      <tbody>
                        <tr>
                          <td className="otp-box" style={otpBoxCell}>
                            {digit}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <Text style={centeredCaption}>
            Don't share this code with anyone!
          </Text>

          {/* Warning box */}
          <Section style={{ ...warningSection, color: "#545454" }}>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              width="100%"
              style={{ borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <td style={warningIconCell}>
                    <Img
                      src="https://resend-attachments.s3.amazonaws.com/a20d137b-41d0-47ed-9bd5-385f07182be4"
                      width="22"
                      height="22"
                      alt="An exclamation mark inside a black octagonal border."
                      style={warningIcon}
                    />
                  </td>
                  <td style={warningTitleCell}>
                    <Text style={warningTitle}>
                      Was this request not made by you?
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
            <Text style={warningBody}>
              <strong>Heads up! </strong>We noticed a request from {deviceInfo}
              <br />({requestDate}). If it wasn't you, no worries, just ignore
              this email.
            </Text>
          </Section>

          <Text style={centeredMuted}>
            <span>This is an automated message. </span>
            <strong>Please do not reply.</strong>
          </Text>

          <Text style={mutedParagraph}>
            We're glad you're here. Let's make a difference together.
          </Text>
          <Text style={{ ...mutedParagraph, paddingTop: "5px" }}>
            <strong>{teamName}</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OtpVerificationEmail2;

// ---------------------------------------------------------------
// Styles
// ---------------------------------------------------------------

const main: React.CSSProperties = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "1em",
  lineHeight: "165%",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  width: "100%",
  margin: "0 auto",
  padding: "32px 20px",
};

const logoBoxTable: React.CSSProperties = {
  borderCollapse: "separate",
};

const logoBoxCell: React.CSSProperties = {
  width: "84px",
  height: "84px",
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  textAlign: "center",
  verticalAlign: "middle",
  border: "1px solid #e5e5e5",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
};

const logoImage: React.CSSProperties = {
  display: "inline-block",
  outline: "none",
  border: "none",
  textDecoration: "none",
  borderRadius: "8px",
  verticalAlign: "middle",
};

const headingTop: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "25px",
  lineHeight: "130%",
  paddingTop: "24px",
  fontWeight: 600,
  textAlign: "center",
};

const headingBottom: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "25px",
  lineHeight: "130%",
  fontWeight: 600,
  textAlign: "center",
};

const otpBoxTable: React.CSSProperties = {
  borderCollapse: "separate",
};

const otpBoxCell: React.CSSProperties = {
  width: "40px",
  height: "40px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  textAlign: "center",
  verticalAlign: "middle",
  fontSize: "16px",
  fontWeight: 500,
  color: "#000000",
  border: "1px solid #e5e5e5",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const centeredCaption: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "0.875em",
  color: "#6b6b6b",
  paddingTop: "12px",
  paddingBottom: "24px",
  textAlign: "center",
};

const warningSection: React.CSSProperties = {
  boxSizing: "border-box",
  backgroundColor: "#fef2f2",
  borderRadius: "10px",
  color: "#000000",
  padding: "16px 20px",
};

const warningIconCell: React.CSSProperties = {
  width: "22px",
  paddingRight: "10px",
  verticalAlign: "middle",
};

const warningIcon: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "none",
  textDecoration: "none",
};

const warningTitleCell: React.CSSProperties = {
  verticalAlign: "middle",
};

const warningTitle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  lineHeight: "20%",
  color: "#545454",
};

const warningBody: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "14px",
  paddingTop: "8px",
  color: "#545454",
};

const centeredMuted: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "14px",
  paddingTop: "24px",
  paddingBottom: 0,
  textAlign: "center",
  color: "#545454",
};

const mutedParagraph: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "14px",
  paddingTop: "16px",
  paddingBottom: 0,
  color: "#545454",
};
