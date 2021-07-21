
export function isGender(bodyShap: Array<string>, shap: string) {
    if (!bodyShap) return false
    if (bodyShap.length !== 1) return false
    return bodyShap[0] === shap
}

export const isUnisex = (bodyShap: Array<string>) => {
    if (!bodyShap) return false;
    return bodyShap.length === 2;
};
