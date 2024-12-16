>アプリケーション名
>>TaskManagment

>アプリケーション概要
>>自分のタスクを書き出し、時間、使用するurlを入れ日々のタスクを整理するアプリケーション

>URL
>>[オリジナルアプリのurl](https://taskmanagement-5i3x.onrender.com)

>利用方法  
>投稿方法
>>ログインを行い真ん中に表示されている新規登録を押す  
>>プロジェクト名、小タスク名、詳細、時間、urlを入れたら完了（5つ小タスクを設定できます）その後一番下にある保存ボタンを押す  

>保存したタスクを実行する
>>メイン画面に戻るので左側にあるサブタスクバーボタンを押すとサブバーが開きその中にプロジェクトがあるのでそれを押す  
>>真ん中に登録されたデーターが表示されそこでurl先に飛ぶこととタスクをスタートさせることが可能でタスク開始ボタンを押すと時間の測定が始まり、設定した時間になるとプッシュ通知がくる

>アプリケーションを作成した背景
>>学習を始め、自分なりに勉強をする中どうしても自分の思った時間通りに進めることができず、無駄な時間を過ごすことや
時間のメリハリをつけるのが難しく感じていました、携帯で予定を管理するアプリをしようしていましたが時間を指定できるアプリが
無く僕のように時間にメリハリをつけることが難しく感じた人に使いやすく、予定通りに進めることができるようになってほしいと思い作成しました。
>>>

>実装した機能についての画像やGIFおよびその説明

>実装予定の機能  
>>現在、経過時間を測定しタスクが完了したらタスク完了ボタンを押すと測定終了が可能になるものを実装中  
>>>今後はタスクを終えたものを格納できる場所を作成し、そこに入れれるようにする
>>>>現在ログインしたら全ての使用者が作成したタスクが見えるようになってしまっているのでそれを作成者のみが見れるようにするのと、passwordを設定して大規模のプロジェクトを作成できるよにし、チームで動く際に使えるようなものを作成できるようにする

>データベース設計  
>>[![Image from Gyazo](https://i.gyazo.com/9b5445a29a41f71d1dac11c4846562e3.png)](https://gyazo.com/9b5445a29a41f71d1dac11c4846562e3)

>画面遷移図
>>[![Image from Gyazo](https://i.gyazo.com/ce941e4bb42e9e1edc238b836309640b.png)](https://gyazo.com/ce941e4bb42e9e1edc238b836309640b)

>開発環境
>>Rubyonrails  
>>JavaScript

>ローカルでの動作方法
>>cd xxxxx  
>>bundle install  
>>rails db:create  
>>rails db:migrate

>工夫したポイント  
>>javascriptを使用してサブバーを作成、時間設定とプッシュ機能で通知が来るようにしました
