pathtracing-canvas
==================

お勉強のためパストレーシングをjavascriptで[edupt](https://github.com/githole/edupt)を見ながら実装してみました。
traceurを使ってECMA Script6からECMA Script5にコンパイルしていますが、
非常に遅いコードが吐き出されることに開発途中で気付いたので、妥協したコードになっています。
ベクトルの計算は自分で実装せず、numericjsを使っています。
レンダリングは本家のC++実装に比べると非常に遅いです。
実際にレンダリングしてみるには[こちら](http://kanaihiroki.github.io/pathtracing-canvas/public/)
を表示してみてください。
firefoxとchromeで動作確認済みです。

ライセンス
----------

使用しているライブラリに関しては、それ自体のライセンスに従います。
本プロジェクトに関しては、Creative Commonsで公開します。
とはいえ、本家が素晴らしいのでこっちを見る価値はあまりないと思います。

pathtracing-canvas is licensed under a
Creative Commons Attribution-ShareAlike 3.0 Unported License.

You should have received a copy of the license along with this
work.  If not, see <http://creativecommons.org/licenses/by-sa/3.0/>.
