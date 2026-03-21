const STATUS_CODE = {
        OK:200, // success
        CREATED:201,// success
        NO_CONTENT:204,// success - but no data delete and put
        BAD_REQUEST:400,// client sent invalid request
        UNAUTHORIZED:401,// user not logged in
        FORBIDDEN:403,// user logged in but not authorized
        NOT_FOUND:404,// resource not found
        CONFLICT:409, // resource already exists
        SERVER_ERROR:500 // internal server error
}

const MESSAGES = {
        USER_EXISTS:"User already exists",
        USER_NOT_FOUND:"User not found",
        INVALID_CREDENTIALS:"Invalid credentials",
        PASSWORD_MISMATCH:"Password mismatch",
        PASSWORD_LENGTH:"Password must be at least 6 characters",
        SIGNUP_SUCCESS:"You have signup successfully",
        LOGOUT_SUCCESS:"You have logged out successfully",
        LOGIN_SUCCESS:"You have logged in successfully",
        TOKEN_INVALID:"Token is invalid",
        TOKEN_MISSING:"Token is missing",
        MISSING_FIELDS:"Required fields are missing",
        NOT_AUTHORIZED:"You are not authorized",
        SERVER_ERROR:"Internal server error",
        ORGANIZATION_CREATED:"New organization created successfully",
        ORGANIZATIONS_FETCHED:"Organizations fetched successfully",
        ORGANIZATION_NOT_FOUND:"Organization not found",
        MEMBER_ADDED_TO_ORGANIZATION:"Member added to organization successfully",
        INVALID_MEMBER_ID:"Invalid member id",
        MEMBER_DELETED_FROM_ORGANIZATION:"Member deleted from organization successfully",
        ADMIN_CAN_PERFORM_ACTION:"Only admin can perform this action",
        CAN_PERFORM_ACTION:"Only organization admin or members can perform this action",
        BOARD_CREATED:"New board created successfully",
        BOARD_NOT_FOUND:"Board not found",
        CREATE_ISSUE_SUCCESS:"New issue created successfully"
}

const TOKEN_NAME = "trello_token"

export {
        STATUS_CODE,
        MESSAGES,
        TOKEN_NAME
}