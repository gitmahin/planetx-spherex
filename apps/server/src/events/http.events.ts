enum SYSTEM_CUSTOM_ERROR_EVENTS {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",

  // -- 400: bad request / validation --
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_VERIFICATION_CODE = "INVALID_VERIFICATION_CODE",
  VERIFICATION_CODE_EXPIRED = "VERIFICATION_CODE_EXPIRED",
  WEBHOOK_HEADERS_MISSING = "WEBHOOK_HEADERS_MISSING",
  USER_NOT_VERIFIED = "USER_NOT_VERIFIED",
  INVALID_PHONE_NUMBER = "INVALID_PHONE_NUMBER",

  // -- 404: not found, one per resource --
  USER_NOT_FOUND = "USER_NOT_FOUND",
  PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND",
  CONTACT_NOT_FOUND = "CONTACT_NOT_FOUND",
  PHONE_NOT_FOUND = "PHONE_NOT_FOUND",
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  ADDRESS_NOT_FOUND = "ADDRESS_NOT_FOUND",

  // -- 409: conflict --
  USER_ALREADY_VERIFIED = "USER_ALREADY_VERIFIED",
  PHONE_ALREADY_VERIFIED = "PHONE_ALREADY_VERIFIED",
  EMAIL_ALREADY_VERIFIED = "EMAIL_ALREADY_VERIFIED",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",

  // -- 500: operation failed, one per resource per action --
  USER_CREATION_FAILED = "USER_CREATION_FAILED",
  USER_UPDATE_FAILED = "USER_UPDATE_FAILED",
  USER_DELETE_FAILED = "USER_DELETE_FAILED",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",

  PROFILE_CREATION_FAILED = "PROFILE_CREATION_FAILED",
  PROFILE_UPDATE_FAILED = "PROFILE_UPDATE_FAILED",

  CONTACT_CREATION_FAILED = "CONTACT_CREATION_FAILED",
  CONTACT_UPDATE_FAILED = "CONTACT_UPDATE_FAILED",
  CONTACT_DELETE_FAILED = "CONTACT_DELETE_FAILED",

  PHONE_CREATION_FAILED = "PHONE_CREATION_FAILED",
  PHONE_UPDATE_FAILED = "PHONE_UPDATE_FAILED",
  PHONE_DELETE_FAILED = "PHONE_DELETE_FAILED",

  EMAIL_CREATION_FAILED = "EMAIL_CREATION_FAILED",
  EMAIL_UPDATE_FAILED = "EMAIL_UPDATE_FAILED",
  EMAIL_DELETE_FAILED = "EMAIL_DELETE_FAILED",

  ADDRESS_CREATION_FAILED = "ADDRESS_CREATION_FAILED",
  ADDRESS_UPDATE_FAILED = "ADDRESS_UPDATE_FAILED",
  ADDRESS_DELETE_FAILED = "ADDRESS_DELETE_FAILED",

  WEBHOOK_SECRET_NOT_CONFIGURED = "WEBHOOK_SECRET_NOT_CONFIGURED",
  WEBHOOK_SIGNATURE_INVALID = "WEBHOOK_SIGNATURE_INVALID",
}

export const SystemCustomErrorCode: Record<SYSTEM_CUSTOM_ERROR_EVENTS, string> =
  {
    INTERNAL_SERVER_ERROR: "50000",
    UNAUTHORIZED: "40100",
    UNKNOWN_ERROR: "50001",

    VALIDATION_ERROR: "40001",
    INVALID_VERIFICATION_CODE: "40002",
    VERIFICATION_CODE_EXPIRED: "40003",
    WEBHOOK_HEADERS_MISSING: "40004",
    WEBHOOK_SIGNATURE_INVALID: "40005",
    USER_NOT_VERIFIED: "40006",
    INVALID_PHONE_NUMBER: "40007",

    USER_NOT_FOUND: "40401",
    PROFILE_NOT_FOUND: "40402",
    CONTACT_NOT_FOUND: "40403",
    PHONE_NOT_FOUND: "40404",
    EMAIL_NOT_FOUND: "40405",
    ADDRESS_NOT_FOUND: "40406",

    USER_ALREADY_VERIFIED: "40901",
    PHONE_ALREADY_VERIFIED: "40902",
    EMAIL_ALREADY_VERIFIED: "40903",
    USER_ALREADY_EXISTS: "40904",

    USER_CREATION_FAILED: "50010",
    USER_UPDATE_FAILED: "50011",
    USER_DELETE_FAILED: "50012",
    SERVICE_UNAVAILABLE: "50300",

    PROFILE_CREATION_FAILED: "50020",
    PROFILE_UPDATE_FAILED: "50021",

    CONTACT_CREATION_FAILED: "50030",
    CONTACT_UPDATE_FAILED: "50031",
    CONTACT_DELETE_FAILED: "50032",

    PHONE_CREATION_FAILED: "50040",
    PHONE_UPDATE_FAILED: "50041",
    PHONE_DELETE_FAILED: "50042",

    EMAIL_CREATION_FAILED: "50050",
    EMAIL_UPDATE_FAILED: "50051",
    EMAIL_DELETE_FAILED: "50052",

    ADDRESS_CREATION_FAILED: "50060",
    ADDRESS_UPDATE_FAILED: "50061",
    ADDRESS_DELETE_FAILED: "50062",

    WEBHOOK_SECRET_NOT_CONFIGURED: "50070",
  };

export type SystemCustomErrorMessageDataType = {
  title?: string;
  message: string;
  code: string;
};

type SystemCustomErrorMessageType = {
  [key: string]: SystemCustomErrorMessageDataType;
};

/**
 * Lookup table for system-wide error messages.
 *
 * @description Translates internal error codes into structured objects
 * containing a display title, a detailed message, and the original code.
 *
 * @example
 * const error = SystemCustomErrorMessageByCodes[SystemCustomErrorCode.USER_DUP_EMAIL];
 * return res.status(500).json(error);
 */
export const SystemCustomErrorMsgByCode: SystemCustomErrorMessageType = {
  [SystemCustomErrorCode.INTERNAL_SERVER_ERROR]: {
    title: "Unexpected Error",
    message:
      "Something went wrong on our end. Please try again later or contact support if the issue persists.",
    code: SystemCustomErrorCode.INTERNAL_SERVER_ERROR,
  },
  [SystemCustomErrorCode.UNAUTHORIZED]: {
    title: "Unauthorized",
    message: "Your session has expired or is invalid. Please log in again.",
    code: SystemCustomErrorCode.UNAUTHORIZED,
  },
  [SystemCustomErrorCode.UNKNOWN_ERROR]: {
    title: "Unknown Error",
    message:
      "An unexpected error occurred. Please try again later or contact support if the issue persists.",
    code: SystemCustomErrorCode.UNKNOWN_ERROR,
  },

  // -- 400 --
  [SystemCustomErrorCode.VALIDATION_ERROR]: {
    title: "Invalid Input",
    message: "One or more fields failed validation.",
    code: SystemCustomErrorCode.VALIDATION_ERROR,
  },
  [SystemCustomErrorCode.INVALID_VERIFICATION_CODE]: {
    title: "Invalid Code",
    message: "The verification code is incorrect.",
    code: SystemCustomErrorCode.INVALID_VERIFICATION_CODE,
  },
  [SystemCustomErrorCode.VERIFICATION_CODE_EXPIRED]: {
    title: "Code Expired",
    message: "The verification code has expired. Please request a new one.",
    code: SystemCustomErrorCode.VERIFICATION_CODE_EXPIRED,
  },
  [SystemCustomErrorCode.INVALID_PHONE_NUMBER]: {
    title: "Invalid Phone Number",
    message: "The phone number provided is not valid.",
    code: SystemCustomErrorCode.INVALID_PHONE_NUMBER,
  },

  [SystemCustomErrorCode.WEBHOOK_HEADERS_MISSING]: {
    title: "Missing Webhook Headers",
    message: "The request is missing required webhook headers.",
    code: SystemCustomErrorCode.WEBHOOK_HEADERS_MISSING,
  },
  [SystemCustomErrorCode.WEBHOOK_SIGNATURE_INVALID]: {
    title: "Invalid Webhook Signature",
    message: "The webhook signature could not be verified.",
    code: SystemCustomErrorCode.WEBHOOK_SIGNATURE_INVALID,
  },
  [SystemCustomErrorCode.USER_NOT_VERIFIED]: {
    title: "Account Not Verified",
    message: "Please verify your account before continuing.",
    code: SystemCustomErrorCode.USER_NOT_VERIFIED,
  },

  // -- 404 --
  [SystemCustomErrorCode.USER_NOT_FOUND]: {
    title: "User Not Found",
    message: "No user exists with the given input.",
    code: SystemCustomErrorCode.USER_NOT_FOUND,
  },
  [SystemCustomErrorCode.PROFILE_NOT_FOUND]: {
    title: "Profile Not Found",
    message: "No profile exists with the given id.",
    code: SystemCustomErrorCode.PROFILE_NOT_FOUND,
  },
  [SystemCustomErrorCode.CONTACT_NOT_FOUND]: {
    title: "Contact Not Found",
    message: "No contact exists with the given id.",
    code: SystemCustomErrorCode.CONTACT_NOT_FOUND,
  },
  [SystemCustomErrorCode.PHONE_NOT_FOUND]: {
    title: "Phone Not Found",
    message: "No phone number exists with the given id.",
    code: SystemCustomErrorCode.PHONE_NOT_FOUND,
  },
  [SystemCustomErrorCode.EMAIL_NOT_FOUND]: {
    title: "Email Not Found",
    message: "No email exists with the given id.",
    code: SystemCustomErrorCode.EMAIL_NOT_FOUND,
  },
  [SystemCustomErrorCode.ADDRESS_NOT_FOUND]: {
    title: "Address Not Found",
    message: "No address exists with the given id.",
    code: SystemCustomErrorCode.ADDRESS_NOT_FOUND,
  },

  // -- 409 --
  [SystemCustomErrorCode.USER_ALREADY_VERIFIED]: {
    title: "Already Verified",
    message: "This account has already been verified.",
    code: SystemCustomErrorCode.USER_ALREADY_VERIFIED,
  },
  [SystemCustomErrorCode.PHONE_ALREADY_VERIFIED]: {
    title: "Already Verified",
    message: "This phone number has already been verified.",
    code: SystemCustomErrorCode.PHONE_ALREADY_VERIFIED,
  },
  [SystemCustomErrorCode.EMAIL_ALREADY_VERIFIED]: {
    title: "Already Verified",
    message: "This email has already been verified.",
    code: SystemCustomErrorCode.EMAIL_ALREADY_VERIFIED,
  },
  [SystemCustomErrorCode.USER_ALREADY_EXISTS]: {
    title: "User Already Exists",
    message: "An account with this email or username already exists.",
    code: SystemCustomErrorCode.USER_ALREADY_EXISTS,
  },

  // -- 500: user --
  [SystemCustomErrorCode.USER_CREATION_FAILED]: {
    title: "Signup Failed",
    message: "Your account could not be created. Please try again.",
    code: SystemCustomErrorCode.USER_CREATION_FAILED,
  },
  [SystemCustomErrorCode.USER_UPDATE_FAILED]: {
    title: "Update Failed",
    message: "Your account could not be updated. Please try again.",
    code: SystemCustomErrorCode.USER_UPDATE_FAILED,
  },
  [SystemCustomErrorCode.USER_DELETE_FAILED]: {
    title: "Deletion Failed",
    message: "Your account could not be deleted. Please try again.",
    code: SystemCustomErrorCode.USER_DELETE_FAILED,
  },

  [SystemCustomErrorCode.WEBHOOK_SECRET_NOT_CONFIGURED]: {
    title: "Webhook Not Configured",
    message: "The webhook secret has not been configured on the server.",
    code: SystemCustomErrorCode.WEBHOOK_SECRET_NOT_CONFIGURED,
  },
  [SystemCustomErrorCode.SERVICE_UNAVAILABLE]: {
    title: "Service Unavailable",
    message:
      "The service is temporarily unavailable. Please try again in a few moments.",
    code: SystemCustomErrorCode.SERVICE_UNAVAILABLE,
  },

  // -- 500: profile --
  [SystemCustomErrorCode.PROFILE_CREATION_FAILED]: {
    title: "Profile Setup Failed",
    message: "Your profile could not be created. Please try again.",
    code: SystemCustomErrorCode.PROFILE_CREATION_FAILED,
  },
  [SystemCustomErrorCode.PROFILE_UPDATE_FAILED]: {
    title: "Profile Update Failed",
    message: "Your profile could not be updated. Please try again.",
    code: SystemCustomErrorCode.PROFILE_UPDATE_FAILED,
  },

  // -- 500: contact --
  [SystemCustomErrorCode.CONTACT_CREATION_FAILED]: {
    title: "Contact Creation Failed",
    message: "The contact could not be created. Please try again.",
    code: SystemCustomErrorCode.CONTACT_CREATION_FAILED,
  },
  [SystemCustomErrorCode.CONTACT_UPDATE_FAILED]: {
    title: "Contact Update Failed",
    message: "The contact could not be updated. Please try again.",
    code: SystemCustomErrorCode.CONTACT_UPDATE_FAILED,
  },
  [SystemCustomErrorCode.CONTACT_DELETE_FAILED]: {
    title: "Contact Deletion Failed",
    message: "The contact could not be deleted. Please try again.",
    code: SystemCustomErrorCode.CONTACT_DELETE_FAILED,
  },

  // -- 500: phone --
  [SystemCustomErrorCode.PHONE_CREATION_FAILED]: {
    title: "Phone Creation Failed",
    message: "The phone number could not be added. Please try again.",
    code: SystemCustomErrorCode.PHONE_CREATION_FAILED,
  },
  [SystemCustomErrorCode.PHONE_UPDATE_FAILED]: {
    title: "Phone Update Failed",
    message: "The phone number could not be updated. Please try again.",
    code: SystemCustomErrorCode.PHONE_UPDATE_FAILED,
  },
  [SystemCustomErrorCode.PHONE_DELETE_FAILED]: {
    title: "Phone Deletion Failed",
    message: "The phone number could not be deleted. Please try again.",
    code: SystemCustomErrorCode.PHONE_DELETE_FAILED,
  },

  // -- 500: email --
  [SystemCustomErrorCode.EMAIL_CREATION_FAILED]: {
    title: "Email Creation Failed",
    message: "The email could not be added. Please try again.",
    code: SystemCustomErrorCode.EMAIL_CREATION_FAILED,
  },
  [SystemCustomErrorCode.EMAIL_UPDATE_FAILED]: {
    title: "Email Update Failed",
    message: "The email could not be updated. Please try again.",
    code: SystemCustomErrorCode.EMAIL_UPDATE_FAILED,
  },
  [SystemCustomErrorCode.EMAIL_DELETE_FAILED]: {
    title: "Email Deletion Failed",
    message: "The email could not be deleted. Please try again.",
    code: SystemCustomErrorCode.EMAIL_DELETE_FAILED,
  },

  // -- 500: address --
  [SystemCustomErrorCode.ADDRESS_CREATION_FAILED]: {
    title: "Address Creation Failed",
    message: "The address could not be added. Please try again.",
    code: SystemCustomErrorCode.ADDRESS_CREATION_FAILED,
  },
  [SystemCustomErrorCode.ADDRESS_UPDATE_FAILED]: {
    title: "Address Update Failed",
    message: "The address could not be updated. Please try again.",
    code: SystemCustomErrorCode.ADDRESS_UPDATE_FAILED,
  },
  [SystemCustomErrorCode.ADDRESS_DELETE_FAILED]: {
    title: "Address Deletion Failed",
    message: "The address could not be deleted. Please try again.",
    code: SystemCustomErrorCode.ADDRESS_DELETE_FAILED,
  },
};

/**
 * Retrieves structured error metadata (title, message, and code) for a specific error key.
 *
 * This utility is primarily used for sending error events by key not error code
 *
 * @param key - The unique identifier from `SYSTEM_CUSTOM_ERROR_EVENTS`.
 * @returns The corresponding error object containing display text and the error code.
 *
 * @example
 * // Displaying a toast message when a database error occurs
 * const errorInfo = getSystemCustomErrorMsgByKey(SYSTEM_CUSTOM_ERROR_EVENTS.DB_CONNECTION_ERROR);
 *
 * return res.status(400).json({error: errorInfo})
 */
export const getSystemCustomErrorMsgByKey = (
  key: keyof typeof SYSTEM_CUSTOM_ERROR_EVENTS
) => {
  return SystemCustomErrorMsgByCode[SystemCustomErrorCode[key]]!;
};
