/**
 * ログ出力関数。
 * 出力できないときは、何もしない
 * @param str 出力対象ログ文字列
 */
export function log(str) {
    if (console && console.log) {
        console.log(str);
    }
}