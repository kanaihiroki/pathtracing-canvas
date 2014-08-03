/**
 * ログ出力関数。
 * 出力できないときは、何もしない
 * @param args 出力対象オブジェクト
 */
export function log(...args) {
    if (console && console.log) {
        console.log(...args);
    }
}