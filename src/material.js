/**
 * 反射の種類を定義している。
 *
 * REFLECTION_TYPE_DIFFUSE: 完全拡散面。いわゆるLambertian面。
 * REFLECTION_TYPE_SPECULAR: 理想的な鏡面。
 * REFLECTION_TYPE_REFRACTION: 理想的なガラス的物質。
 * @type {number}
 */
export const ReflectionType = {
    DIFFUSE: 0,
    SPECULAR: 1,
    REFRACTION: 2
};