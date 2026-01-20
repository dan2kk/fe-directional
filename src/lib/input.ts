export function emailValidator(value: string) {
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return "옳바른 이메일 형식이 아닙니다.";
    }
    return undefined;
}

export function passwordValidator(value: string) {
    if (value.length < 8) {
        return "비밀번호는 8자 이상이어야 합니다.";
    }
    return undefined;
}

export function titleValidator(value: string) {
    if (value.length < 1) {
        return "제목은 1자 이상이어야 합니다.";
    }
    else if (value.length > 80) {
        return "제목은 80자 이하여야 합니다.";
    }
    return undefined;
}

export function bodyValidator(value: string) {
    if (value.length < 1) {
        return "내용은 1자 이상이어야 합니다.";
    }
    else if (value.length > 2000) {
        return "내용은 2000자 이하여야 합니다.";
    }
    const filterValue = ["캄보디아", "프놈펜", "불법체류", "텔레그램"];
    for (let i = 0; i < filterValue.length; i++) {
        if (value.includes(filterValue[i])) {
            return "내용에 금지된 단어가 포함되어 있습니다.";
        }
    }
    return undefined;
}

export function tagValidator(value: string) {
    const tags = value.split(',');
    if (tags.length > 5) {
        return "태그는 최대 5개까지 가능합니다.";
    }
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].length > 24) {
            return "태그는 최대 24자까지 가능합니다.";
        }
    }
    return undefined;
}