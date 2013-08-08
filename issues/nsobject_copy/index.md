---
layout: post
title: #02 - copy, mutableCopyについて
---

#copy, mutableCopyについて

##はじめに
 - NSObjectのcopyおよびmutableCopyメソッドについて調べます.
 - NSString, NSMutableStringに対するcopy, mutableCopyの動作を調べます.
 - NSArrayを複製するときの動作について調べます.

##NSObjectのcopy, mutableCopyメソッドについて
[NSObject](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Classes/NSObject_Class/Reference/Reference.html#//apple_ref/occ/cl/NSObject)

Referenceによれば, copyメソッドはcopyWithZoneメソッドの返却値を返します. mutableCopyはmutableCopyWithZone:メソッドの返却値を返します. copyWithZone:, mutableCopyWithZone:メソッドはNSObjectにProtocolとして定義されています. NSObject自体にはメソッドの実装が無いことに注意してください.

単純にNSObjectのcopyを呼んでみましょう.

{% gist 6172986 %}

copyWithZone:メソッドが実装されていないため __NSInvalidArgumentException__ をraiseします. NSObjectのサブクラスはNSCoping Protocolをサポートし, copyWithZone:メソッドを実装する必要があります.

##NSCopying Protocolについて
[NSCopying Protocol](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Protocols/NSCopying_Protocol/Reference/Reference.html)

copyWithZone:を実装する方法がReferenceに書いてあります

- copyWithZone:を継承していないclassではalloc, init...メソッドを使います.
- NSCopyingの動作を継承しているならばsuperclassのcopyWithZone:を呼びます. もし, そのsuperclassでの実装が[NSCopyObject](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Miscellaneous/Foundation_Functions/Reference/reference.html#//apple_ref/c/func/NSCopyObject)関数を使っいる可能性がある場合, retainされているオブジェクトに対するポインタのインスタンス変数を明示的に割り当てます. NSCopyObject関数はNSCopying Protocolに準拠していないオブジェクトでも使うことができるshallow copyを行うための関数です. ARC環境では扱うことができません. OS X v10.8.ではdeprecatedになるとReferenceにあります.
- そのクラス及びコンテンツがimmutableであるときは, 新しい複製を作成するのではなくオリジナルの値をretainし続けるようにします.

３つ目の項目について着目しましょう. 

__immutableであるクラスでcopyメソッドを使用した場合はオリジナルの値への参照を返します__. NSStringで動作を確かめてみましょう.

{% gist 6173257 %}

immutableなNSStringのインスタンスstrとそれをcopyしたcopyStrは同じ実体を指していることがわかります.

ではmutableなNSMutableStringのインスタンスmutableStrに対しcopyを呼んだ場合はどうなるでしょうか？ こちらは参照先のアドレスが変わります. 実は __mutableなオブジェクトに対してcopyメソッドを呼ぶと, 新たにimmutableなオブジェクトを複製を生成して返す__ のです. もちろん複製されたimmutableなオブジェクトのcopyメソッドを呼べば, オリジナルの値への参照が返され, 新しくオブジェクトが作成されることはありません.

mutableなオブジェクトのcopyがimmutableになることに注意しなければいけません. 以下のようにappendString:といった変更を加えるメソッドを実行しようとすると, 実行時に __NSInvalidArgumentException__ をraiseします.

{% gist 6179794 %}


##NSMutableCopying Protocolについて
[NSMutableCopying Protocol](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Protocols/NSMutableCopying_Protocol/Reference/Reference.html)

NSMutableCopying Protocolは, クラスが可変か不可変かどうか, 明確に区別して定義する場合に必要になります. なので不可変なクラスを定義し, 対に可変なクラスを定義する必要が無い場合はNSCopying Protocolのみを使用すべきです.

NSMutableCopying Protocolに定義されているmutableCopyWithZone:メソッドはオリジナルのオブジェクトがmutableかimmutableかにかかわらず, そのオブジェクトのmutableな複製を返すために用意されています.

##NSArrayの複製
NSArrayのcopy, mutableCopyを呼んでみましょう. 

{% gist 6179936 %}

copy, mutableCopyの動作はNSStringの時と同様です. immutableなオブジェクトに対してcopyメソッドを呼ぶとオリジナルへの参照が返されます. mutableCopyメソッドを呼ぶとmutableなオブジェクトが新たに複製されて返されます.

ではcopy, mutableCopyを呼んだ時に配列の要素はどうなるでしょうか. 実はmutableCopyでオリジナルのNSArrayが複製された場合であっても, その要素は複製されず同じ実体を参照しつづけます. いわゆるshallow copyです.

もし完全なdeep copyを行いたいのであればはNSKeyedArchiver, NSKeyedUnarchiverを使います.

{% gist 6180122 %}

[Copying Collections](https://developer.apple.com/library/ios/#documentation/Cocoa/Conceptual/Collections/Articles/Copying.html#//apple_ref/doc/uid/TP40010162-SW1)を参照して下さい.

__deep copy__ と __true deep copy__ という言葉が出てきます. 前者はinitWithArray:copyItems:のcopyオプションをYESにして複製を得るものです. このcopyオプションはcopyWithZone:を内部で呼ぶため, mutabilityが失われてしまいます. __mutableなオブジェクトに対してcopyメソッドを呼んだ場合immutableなオブジェクトが生成されたのを覚えていますか？__ それぞれの要素のcopyメソッドを呼ぶのと同じことなのです. 後者は一度オブジェクトをNSDataにArchiveした後, それをUnarchiveして異なるアドレス空間に複製します. 完全なdeep copyと言ったのはこのことです. 

ただし, このArchivingを用いた完全なdeep copyを行うためには, 配列のすべての要素が[NSCoding Protocol](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Protocols/NSCoding_Protocol/Reference/Reference.html)に準拠している必要があります. [NSCoding Protocol](http://developer.apple.com/library/mac/#documentation/Cocoa/Reference/Foundation/Protocols/NSCoding_Protocol/Reference/Reference.html)を参照して下さい.