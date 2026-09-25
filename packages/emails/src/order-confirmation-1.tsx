// Copyright (c) 2026 Nimul Islam Mahin and contributors
// SPDX-License-Identifier: MIT
// See the LICENSE file for details.

/**
 * Designed By:
 * Name: Sherif
 * Dribble Profile: https://dribbble.com/sans-sherif
 */

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
  userName?: string;
  orderNumber?: string;
  productName?: string;
  productDescription?: string;
  subtotal?: string;
  vat?: string;
  vatPercent?: string;
  total?: string;
  billingAddress?: {
    company: string;
    street: string;
    cityStateZip: string;
    country: string;
  };
  cardLast4?: string;
  receiptUrl?: string;
  companyName?: string;
  supportEmail?: string;
  supportPhone?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  unsubscribeUrl?: string;
}

const OrderConfirmationEmail1 = ({
  userName = "[user name]",
  orderNumber = "12345",
  productName = "Product Name",
  productDescription = "Short description here",
  subtotal = "$1,620.00",
  vat = "$324.00",
  vatPercent = "20.0",
  total = "$1,944.00",
  billingAddress = {
    company: "Delight Confection",
    street: "123 Billing Street",
    cityStateZip: "Billtown, Kentucky K2P0B0",
    country: "United States",
  },
  cardLast4 = "1881",
  receiptUrl = "#",
  companyName = "[Company Name]",
  supportEmail = "xxx@email.com",
  supportPhone = "555-555-5555",
  appStoreUrl = "#",
  playStoreUrl = "#",
  unsubscribeUrl = "#",
}: OrderConfirmationEmailProps) => {
  return (
    <Html dir="ltr" lang="en">
      <Head />
      <Preview>
        Thank you for joining the {productName} community! Your order N°{" "}
        {orderNumber} has been received.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo + Company name */}
          <Row>
            <Column style={{ width: "35px" }}>
              <Img
                src="https://resend-attachments.s3.amazonaws.com/526ce4bd-32a7-49ea-abbb-ed232eb88d1f"
                width="31"
                height="31"
                alt="A stylized upward-pointing arrow with a gradient of pink to orange above a downward-curving arc with a gradient of purple to blue."
                style={logo}
              />
            </Column>
            <Column style={{ paddingTop: 0, marginTop: "5px" }}>
              <Text style={companyNameText}>Company</Text>
            </Column>
          </Row>

          <Text style={greeting}>Hi {userName},</Text>
          <Text style={paragraph}>
            Thank you for joining the {productName} community! We've received
            your order N° {orderNumber}. You can now access all the great
            features of your Team Plan account.
          </Text>

          {/* Order summary card */}
          <Section style={orderCard}>
            <Text style={orderCardLabel}>Order Summary</Text>
            <Text style={productNameText}>{productName}</Text>
            <Text style={productDescriptionText}>{productDescription}</Text>

            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              style={summaryTable}
            >
              <tbody>
                <tr>
                  <td style={summaryCell}>
                    <Text style={summaryCellText}>{subtotal}</Text>
                  </td>
                  <td style={summaryCell}>
                    <Text style={summaryCellText}>Subtotal</Text>
                  </td>
                </tr>
                <tr>
                  <td style={summaryCell}>
                    <Text style={summaryCellText}>{vat}</Text>
                  </td>
                  <td style={summaryCell}>
                    <Text style={summaryCellText}>VAT ({vatPercent}%)</Text>
                  </td>
                </tr>
                <tr>
                  <td style={summaryCell}>
                    <Text style={summaryCellText}>{total}</Text>
                  </td>
                  <td style={summaryCell}>
                    <Text style={summaryCellText}>Total</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Billing address + Payment method */}
          <Row>
            <Column style={{ verticalAlign: "top" }}>
              <Text style={sectionHeading}>Billing Address</Text>
              <Text style={addressText}>
                {billingAddress.company}
                <br />
                {billingAddress.street}
                <br />
                {billingAddress.cityStateZip}
                <br />
                {billingAddress.country}
              </Text>
            </Column>
            <Column style={{ verticalAlign: "top" }}>
              <Text style={paymentHeading}>Payment Method</Text>
              <Row>
                <Column style={{ width: "46px" }}>
                  <Img
                    src="https://resend-attachments.s3.amazonaws.com/3158206c-e8f4-43cb-9461-a1b28244e069"
                    width="40"
                    height="20"
                    alt="The Visa logo in blue text."
                    style={visaLogo}
                  />
                </Column>
                <Column style={{ paddingTop: "4px", paddingLeft: "5px" }}>
                  <Text style={cardNumberText}>
                    {" "}
                    4012************{cardLast4}
                  </Text>
                </Column>
              </Row>
            </Column>
          </Row>

          {/* Download receipt button */}
          <Row>
            <Column align="left">
              <Button href={receiptUrl} style={button}>
                Download receipt
              </Button>
            </Column>
          </Row>

          <Text style={{ ...paragraph, paddingTop: "15px" }}>
            Thousands of teams like yours use features like [Integrated XXX] and
            [Unlimited YYY] every day to ensure easy and efficient workflows
            within their team. How are they doing it? Check out our FAQs and
            forum for advice and tips.
          </Text>

          <Hr style={divider} />

          <Text style={{ ...paragraph, paddingTop: 0 }}>
            Can't find the answers you're looking for? Contact us directly at{" "}
            <Link href={`mailto:${supportEmail}`} style={link}>
              {supportEmail}
            </Link>{" "}
            or {supportPhone}.
          </Text>

          <Hr style={divider} />

          <Text style={paragraph}>
            {productName} at the touch of a button! Download our app for
          </Text>

          <Row>
            <Column style={{ width: "124px" }}>
              <Link href={appStoreUrl}>
                <Img
                  src="https://resend-attachments.s3.amazonaws.com/8ccdc290-1fb2-4259-8831-0a899d493079"
                  width="116"
                  height="34"
                  alt='Black button with white text that says "Available on the App Store" and a white Apple logo.'
                />
              </Link>
            </Column>
            <Column>
              <Link href={playStoreUrl}>
                <Img
                  src="https://resend-attachments.s3.amazonaws.com/1a4db1ec-8d91-483f-910f-4db25a1f104f"
                  width="101"
                  height="33"
                  alt="Android app on Google Play button."
                />
              </Link>
            </Column>
          </Row>

          <Text style={{ ...paragraph, paddingTop: "16px" }}>
            Questions or concerns? Get in touch with us at{" "}
            <Link href={`mailto:${supportEmail}`} style={link}>
              {supportEmail}
            </Link>{" "}
            or {supportPhone}. Never miss a beat! Follow us on Twitter, Facebook
            and Instagram.
          </Text>

          <Text style={paragraph}>
            Don't want any more emails from {companyName}?{" "}
            <Link href={unsubscribeUrl} style={link}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail1;

// ---------------------------------------------------------------
// Styles
// ---------------------------------------------------------------

const main: React.CSSProperties = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "1em",
  lineHeight: "155%",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  width: "100%",
  margin: "0 auto",
  padding: "20px 0",
};

const logo: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "none",
  textDecoration: "none",
  borderRadius: "8px",
};

const companyNameText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "22px",
  fontWeight: "bold",
  lineHeight: "0%",
};

const greeting: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "17px",
  fontWeight: "bold",
  paddingTop: "23px",
  paddingBottom: "8px",
};

const paragraph: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const orderCard: React.CSSProperties = {
  boxSizing: "border-box",
  backgroundColor: "#f5f5f5",
  borderRadius: "20px",
  padding: "10px 20px",
  marginTop: 0,
  marginBottom: "15px",
};

const orderCardLabel: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "13px",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const productNameText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "17px",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  lineHeight: "48%",
};

const productDescriptionText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  lineHeight: "48%",
};

const summaryTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
  marginTop: "12px",
  marginBottom: "8px",
};

const summaryCell: React.CSSProperties = {
  padding: "2px 12px",
  verticalAlign: "top",
  textAlign: "left",
  border: "1px solid #e4e4e7",
};

const summaryCellText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const sectionHeading: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  lineHeight: "77%",
};

const paymentHeading: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  lineHeight: "77%",
};

const addressText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: 0,
  paddingBottom: "8px",
  lineHeight: "149%",
};

const visaLogo: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "1px solid",
  textDecoration: "none",
  borderRadius: "4px",
  background: "white",
  padding: "5px",
  marginTop: "3px",
};

const cardNumberText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  lineHeight: "77%",
  textAlign: "left",
};

const button: React.CSSProperties = {
  backgroundColor: "#1EAF98",
  color: "#ffffff",
  borderRadius: "10px",
  fontWeight: 500,
  fontSize: "15px",
  textAlign: "center",
  padding: "12px 20px",
  marginTop: "10px",
  lineHeight: "100%",
  textDecoration: "none",
  display: "inline-block",
};

const divider: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderTop: "2px solid #eaeaea",
  marginBottom: "1em",
};

const link: React.CSSProperties = {
  color: "#0670DB",
  textDecoration: "underline",
};
