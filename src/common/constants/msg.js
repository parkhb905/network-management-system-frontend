export const MESSAGES = {
    DB_ERROR: 'DB 오류가 발생했습니다.',
    SERVER_ERROR: '서버 오류가 발생했습니다.',

    INSERT_SUCCESS: '등록되었습니다.',
    UPDATE_SUCCESS: '수정되었습니다.',
    DELETE_SUCCESS: '삭제되었습니다.',

    INVALID_INPUT: '입력값을 확인해주세요.',

    FORBIDDEN: '접근이 금지되었습니다.',

    AUTH_USER_NOT_FOUND: '존재하지 않는 사용자입니다.',
    AUTH_INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
    AUTH_EXPIRED: '인증이 만료되었습니다. 다시 로그인 해주세요.',

    USERNAME_ALREADY_EXISTS: '이미 사용 중인 아이디입니다.',
    EMAIL_ALREADY_EXISTS: '이미 등록된 이메일입니다.',

    NETWORK_ERROR: '네트워크 오류가 발생했습니다. 연결 상태를 확인해주세요.',
};

export const ERROR_MESSAGES = {
    1001: MESSAGES.AUTH_USER_NOT_FOUND,
    1002: MESSAGES.AUTH_INVALID_PASSWORD,
    1003: MESSAGES.AUTH_EXPIRED,
    1004: MESSAGES.FORBIDDEN,

    2001: MESSAGES.USERNAME_ALREADY_EXISTS,
    2002: MESSAGES.EMAIL_ALREADY_EXISTS,

    9001: MESSAGES.SERVER_ERROR,
    9999: MESSAGES.SERVER_ERROR,
};
