#/bin/bash

function createDirectory() {
    while : 
    do
        echo "【 ${1} 】文字列を入力してください"
        read input

        if [ -z $input ] ; then
            echo "空文字はダメです。"
        else
            break
        fi
    done

    if [[ ! -d $input ]]; then
        # ディレクトリが存在しない場合のみ実行する
        mkdir $input
        echo "ディレクトリを作成しました"
    else
        echo "既に存在するディレクトリ名です。"
    fi
}

createDirectory "mkdir"