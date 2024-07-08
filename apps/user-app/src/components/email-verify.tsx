import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Tailwind,
} from "@react-email/components";

interface EmailTemplateProps {
  userName: string;
  otpCode: string;
}

const OTPEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  otpCode,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-100 text-gray-800 font-sans">
          <Container className="mx-auto p-4 max-w-xl">
            <Section className="bg-white p-6 rounded-lg shadow-md">
              <Heading className="text-2xl font-bold mb-4 text-center text-blue-600">
                Verify Your Email
              </Heading>
              <Text>Hello {userName},</Text>
              <Text>Your verification code is:</Text>
              <Text className="text-3xl font-bold text-center my-6 p-3 bg-gray-100 rounded">
                {otpCode}
              </Text>
              <Text>
                Please enter this code to verify your account. This code will
                expire in 10 minutes.
              </Text>
              <Text>
                If you do not request this code, please ignore this email.
              </Text>
              <Hr className="my-4 border-gray-300" />
              <Text className="text-sm text-center text-gray-500">
                Thank you,
                <br />
                The AcrPay Team
              </Text>
            </Section>
            <Text className="text-xs text-center text-gray-500 mt-4">
              This is an automated message, please do not reply to this email.
              If you need assistance, please contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default OTPEmailTemplate;
