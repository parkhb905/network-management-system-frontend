// 아이디 영어+숫자 조합만 허용
export const usernameFormat = (message = '아이디는 영어와 숫자 조합만 가능합니다.') => ({
    check: (value) => {
        const regex = /^[a-zA-Z0-9]+$/; // 영어와 숫자만 허용
        return regex.test(value);
    },
    message,
});

// 빈 값 검사
export const required = (message = '값을 입력해주세요.') => ({
    check: (value) => value !== undefined && value !== null && String(value).trim().length > 0,
    message,
});

// 길이 제한 검사
export const lengthBetween = (name, min, max, message) => ({
    check: (value) => {
        return value.trim().length >= min && value.trim().length <= max;
    },
    message: message ?? `${name}: ${min}자 이상 ${max}자 이하로 입력해주세요.`,
});

// 길이 제한 검사 (숫자)
export const numberBetween = (name, min, max, message) => ({
    check: (value) => {
        if (typeof v !== 'number') return false;
        return value >= min && value <= max;
    },
    message: message ?? `${name}: ${min} 이상 ${max} 이하의 숫자를 입력해주세요.`,
});

// 이메일 형식 검사
export const emailFormat = (message = '올바른 이메일 형식이 아닙니다.') => ({
    check: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    },
    message,
});

// 유효성 검사 실행
export function validateForm(values, rules) {
    for (const field in rules) {
        const value = values[field]; // validation 대상 값
        const validations = rules[field]; // validation 목록
        for (const validation of validations) {
            if (!validation.check(value)) {
                return validation.message; // 첫 번째 에러 메시지 반환
            }
        }
    }
    return null; // 모든 검사를 통과한 경우 null 반환
}
