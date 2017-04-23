/**
 * Created by ued on 2016/11/1.
 */

let idSeed = 0;

/**
 * 自动生成 id
 * @param {String} prefix id 前缀
 * @returns {String} 自动生成 id
 */
export default function uuid (prefix) {
    return (prefix || 'sf-id-') + (idSeed++);
}
