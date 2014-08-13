pathtracing-canvas
==================

  パストレーシングをHTML5 Canvas と ECMA Script 6 で実装してみました。
  [edupt]: https://github.com/githole/edupt        "edupt" をもとにして実装してあります。
  traceurを使って、ES6からES5にコンパイルしています。ES6のModule機能は、AMDモジュールとしてコンパイルされます。
  ベクトル演算は独自で実装せず、numericjsを使っています。
  レンダリングは本家のC++実装に比べると非常に遅いです。
