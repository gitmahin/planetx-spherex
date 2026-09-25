import "dotenv/config";

export type ResendConfigType = {
  RESEND_API_KEY: string;
  RESEND_WEBHOOK_SECRET: string;
};

export const resendConfig: ResendConfigType = {
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET!,
};
