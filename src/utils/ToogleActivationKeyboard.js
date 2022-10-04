export const disableKeyboard = () => {
    document.onkeydown = function () {
        return false;
    }
}

export const enableKeyboard = () => {
    document.onkeydown = function () {
        return true;
    }
}