---
layout: post
title: #01 - 無限スクロール
---

#UIDatePickerの無限スクロールについて(ios6.1.4)
![UIDatePicker](http://gifzo.net/RCXrCuuXcD.gif)

##はじめに
 - UIDatePickerの日付選択は無限に回転するように見えます. この実装について調べます.
 - サンプルコード[InfiniteScrolling](https://github.com/tanB/InfiniteScrolling)を参照して下さい.
 - UIDatePickerコンポーネントの実装を調べます.
 - Undocumented(Private) APIを呼び出してコンポーネントの動作について触れます.
 - 似たような動作をUITableViewで試します.


##コンポーネントの実装を調べる
UIKitの各コンポーネントの実装を調べるには, いくつかのアプローチがあります.

 - ヘッダファイルを読む.
 - viewの階層をダンプする.
 - ivar(インスタンス変数)をダンプする.
 - propertyをダンプする.
 - methodをダンプする.
 - etc...


##viewの階層構造
UIDatePickerのヘッダファイルには大して情報がないので、まずrecursiveDescriptionを呼んでviewの階層構造を調べます.
{% gist 6129356 %}
Private APIをperformSelectorで呼び出すと, *"PerformSelector may cause a leak because its selector is unknown"* という警告が出ます. 今回はこのメソッドを実行できることがわかっていますので, #pragmaディレクティブで警告を無視するようにしています. 

実行結果からUIDatePickerは_UIDatePickerViewを持っていることが分かります.

では_UIDatePickerViewについて調べていきましょう. サンプルコードではdatePickerViewというメソッドでこのviewを取り出せるようにしています.


##Private APIの呼び出し
_UIDatePickerViewのsuperclassはUIPickerViewです. __[ivarやmethodをダンプする](/issues/more_description/)方法については別の章で触れています__. UIPickerViewに実装されているメソッドを呼び出して_UIDatePickerViewの動作を検証します.

### ex.1 無限では無いrowの数
 NSInvocationを使用して __numberOfRowsInColumn:__ を呼びこのviewのrowの数を調べましょう. サンプルコードのexperimentNumberOfRowsInColumでは次のように呼び出しています. 
{% gist 6139305 %}
__numberOfRowsInColum:__ はNSIntegerを引数に受け取ります. performSelector呼び出しではメソッド引数にNSObjectしか渡せないため, NSInvocationを使います.

無限に回るように見える選択列の行の数は100000であり, 実際は終端が存在することがわかります.

### ex.2 選択した時のrowのindex
UIControlEventValueChangedをハンドルして, ex.1と同様に今度は __selectedRowForColumn:__ を呼んでみます. サンプルコードのexperimentSelectedRowForColumnを参照して下さい.

### ex.3 終端のindex 0と99999
 __selectRow:inColumn:animated:__ を呼んで終端までスクロールさせます. サンプルコードのexperimentSelectRowInColumnAnimatedを参照して下さい. _toggleFlagで選択index 0と99999を入れ替えています.