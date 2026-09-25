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
  Heading,
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

interface OrderProduct {
  name: string;
  imageUrl: string;
  priceFrom: string;
  color: string;
  colorLabel?: string;
}

interface OrderConfirmationEmailProps {
  customerName?: string;
  orderNumber?: string;
  products?: OrderProduct[];
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
  unsubscribeUrl?: string;
}

const OrderConfirmationEmail2 = ({
  customerName = "[Customer Name]",
  orderNumber = "34341",
  products = [
    {
      name: "Apple Watch Ultra 2",
      imageUrl:
        "https://resend-attachments.s3.amazonaws.com/aa044177-eeba-4f8b-939a-ed824bb9a5ee",
      priceFrom: "$450",
      color: "#ff6f08",
      colorLabel: "Orange",
    },
  ],
  subtotal = "$450.00",
  vat = "$90.00",
  vatPercent = "20.0",
  total = "$540.00",
  billingAddress = {
    company: "Delight Confection",
    street: "123 Billing Street",
    cityStateZip: "Billtown, Kentucky K2P0B0",
    country: "United States",
  },
  cardLast4 = "1881",
  receiptUrl = "#",
  companyName = "[Company Name]",
  unsubscribeUrl = "#",
}: OrderConfirmationEmailProps) => {
  return (
    <Html dir="ltr" lang="en">
      <Head />
      <Preview>
        Thank you for shopping with us! We've received your order №{" "}
        {orderNumber}.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://resend-attachments.s3.amazonaws.com/e69a6a69-05ac-4b49-8ad7-03ccfbbcddcf"
            width="146"
            height="33"
            alt='Company logo with three overlapping circles and the word "Company".'
            style={logo}
          />

          <Heading as="h3" style={headingTop}>
            Order
          </Heading>
          <Heading as="h3" style={headingBottom}>
            Confirmation
          </Heading>

          <Text style={greeting}>Hi {customerName},</Text>
          <Text style={paragraph}>
            Thank you for shopping with us! We've received your order
            <br />
            №: {orderNumber}. We will notify you when we send it.
          </Text>

          {/* Order summary card */}
          <Section style={orderCard}>
            <Text style={orderCardTitle}>Order Summary</Text>

            {products.map((product, index) => (
              <React.Fragment key={`${product.name}-${index}`}>
                <Row>
                  <Column style={{ width: "166px" }}>
                    <Img
                      src={product.imageUrl}
                      width="166"
                      height="166"
                      alt={product.name}
                      style={productImage}
                    />
                  </Column>
                  <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                    <Text style={productNameText}>{product.name}</Text>
                    <Text style={productPriceText}>
                      From {product.priceFrom}
                    </Text>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      role="presentation"
                      style={{ marginTop: "10px" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              width: "24px",
                              height: "24px",
                              background: product.color,
                              borderRadius: "50%",
                            }}
                            title={product.colorLabel ?? product.color}
                          />
                        </tr>
                      </tbody>
                    </table>
                  </Column>
                </Row>
                <Hr style={cardDivider} />
              </React.Fragment>
            ))}

            <Row>
              <Column>
                <Text style={rowLabel}>Subtotal</Text>
              </Column>
              <Column align="right">
                <Text style={rowValue}>{subtotal}</Text>
              </Column>
            </Row>

            <Hr style={cardDivider} />

            <Row>
              <Column>
                <Text style={rowLabel}>VAT ({vatPercent}%)</Text>
              </Column>
              <Column align="right">
                <Text style={rowValue}>{vat}</Text>
              </Column>
            </Row>

            <Hr style={cardDivider} />

            <Row>
              <Column>
                <Text style={rowLabelBold}>Total</Text>
              </Column>
              <Column align="right">
                <Text style={rowValueBold}>{total}</Text>
              </Column>
            </Row>
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
              <Text style={sectionHeading}>Payment Method</Text>
              <Row>
                <Column style={{ width: "68px" }}>
                  <Img
                    src="https://resend-attachments.s3.amazonaws.com/ae0ffb0a-3bb6-4176-a9b1-e03f82a90d2d"
                    width="40"
                    height="20"
                    alt="The Visa logo in blue on a white background."
                    style={visaLogo}
                  />
                </Column>
                <Column>
                  <Text style={paragraph}>4012************{cardLast4}</Text>
                </Column>
              </Row>
            </Column>
          </Row>

          {/* Download receipt button */}
          <Row style={{ marginTop: "15px" }}>
            <Column align="left">
              <Button href={receiptUrl} style={button}>
                Download Receipt
              </Button>
            </Column>
          </Row>

          <Text style={unsubscribeText}>
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

export default OrderConfirmationEmail2;

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

const headingTop: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "30px",
  lineHeight: "79%",
  paddingTop: "36px",
  fontWeight: 600,
};

const headingBottom: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "30px",
  lineHeight: "79%",
  paddingTop: "0.389em",
  fontWeight: 600,
};

const greeting: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "36px",
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
  backgroundColor: "#efefef",
  borderRadius: "10px",
  padding: "10px 20px",
  marginTop: "10px",
  marginBottom: "36px",
};

const orderCardTitle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "18px",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const productImage: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "none",
  textDecoration: "none",
  borderRadius: "8px",
};

const productNameText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "16px",
  fontWeight: "bold",
  paddingTop: "8px",
  paddingBottom: "8px",
};

const productPriceText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: 0,
  paddingBottom: 0,
};

const cardDivider: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderTop: "2px solid #eaeaea",
  margin: "8px 0",
};

const rowLabel: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const rowValue: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  textAlign: "right",
};

const rowLabelBold: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const rowValueBold: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  textAlign: "right",
};

const sectionHeading: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  fontWeight: "bold",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
};

const addressText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: 0,
  paddingBottom: 0,
};

const visaLogo: React.CSSProperties = {
  display: "block",
  outline: "none",
  border: "1px solid",
  textDecoration: "none",
  borderRadius: "5px",
  padding: "5px",
};

const button: React.CSSProperties = {
  backgroundColor: "#1EAF98",
  color: "#ffffff",
  borderRadius: "4px",
  fontWeight: 500,
  fontSize: "16px",
  textAlign: "center",
  padding: "7px 12px",
  lineHeight: "100%",
  textDecoration: "none",
  display: "inline-block",
};

const unsubscribeText: React.CSSProperties = {
  margin: 0,
  padding: 0,
  fontSize: "1em",
  paddingTop: "15px",
  paddingBottom: 0,
};

const link: React.CSSProperties = {
  color: "#0670DB",
  textDecoration: "underline",
};
