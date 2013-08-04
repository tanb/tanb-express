---
layout: post
title: #00 - クラスのインスタンス変数やmethodを調べる
---

#クラスのインスタンス変数やmethodを調べる

###はじめに
 - Objective-C Runtime APIを用いてクラスのivarやmethodを調べます.
 - NSObjectにカテゴリを実装します.
 - サンプルコードに[TBObjeCRuntime](https://github.com/tanB/TBObjCRuntime)を使います.

##runtime API
[Objective-C Runtime Reference](https://developer.apple.com/library/mac/#documentation/Cocoa/Reference/ObjCRuntimeRef/Reference/reference.html)

 - class_copyIvarList
 - class_copyPropertyList
 - class_copyMethodList
 - class_copyProtocolList

などを用いてクラスに記述された情報を調べることができます.

##引数や戻り値の型を表す記号
 - ivar_getTypeEncoding
 - method_copyReturnType
 - method_copyArgumentType
 - property_getAttributes

などのメソッドは値の型を記号で表記します.

必要になったときは以下のリファレンスを参照してください.

[Declared Properties](https://developer.apple.com/library/mac/#DOCUMENTATION/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtPropertyIntrospection.html)

[Type Encodings](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html)


##UIViewを調べる
 サンプルコード[TBObjeCRuntime](https://github.com/tanB/TBObjCRuntime)を使用してUIViewのivarやmethodを調べます.

 TBObjCRuntimeのtb_descriptionForClassNameは与えられたクラスから次のような内容を返します。

__ivars:__

 - name, [TypeEncoding](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html)

__properties:__

 - name, [Attributes](https://developer.apple.com/library/mac/#DOCUMENTATION/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtPropertyIntrospection.html)

__protocols:__

 - name

__class_methods:__

 - name, [ArgumentType](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html), [ReturnType](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html)

__instance_methods:__

 - name, [ArgumentType](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html), [ReturnType](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html)


methodのArgumentTypeが'@:'から始まるのは, 実行される関数の第一引数がid self, 第二引数がSEL _cmdになることに起因します. Objective-Cのmethodの実装は最終的にIMP型(typedef id (*IMP)(id, SEL, ...))の関数になるためです.

例えば_renderSnapshotWithRect:inContext:のArgumentTypeは'@:{CGRect={CGPoint=ff}{CGSize=ff}}^{CGContext=}'であり, methodの引数は'CGRect, CGContextRef'ということになります.

実際にlldbのコンソールで試した結果がこちらです.

{% gist 6149274 %}

