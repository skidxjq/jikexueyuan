#!/usr/bin/env bash
if [  -n $1 ]; then
fileNum=3
#    获取下载链接
    # downUrl=`node /Users/skidxjq/Downloads/node-test/node-lessons/lesson3/download.js $1`
    downUrl=`node /Users/skidxjq/jikexueyuan/download.js $1`

#    判断是zip还是rar
    patternZip='zip'
    patternRar='rar'

    #判断开始
    echo "$downUrl" | grep -q "$patternZip"
    if [ $? -eq 0 ]; then
        echo "url include zip"
        wget  $downUrl -O homework_$1.zip
        homeworkname=homework_$1.zip


#    开始解压缩 第一个参数为zip名称，第二个参数为目标文件夹的名称
        python ~/gbk-unzip.py $homeworkname  homework_$1
#        mypath=`ls -l |sed -e 1d|awk '{print $9}'|head -n 1`
#        echo "route is"
#        echo $mypath
#        mv $mypath homeworkname
        cd  homework_$1
        ~/atom.sh
        #判断是否需要把内层的东西剥离出来
#        lineNum=`ls -l |wc -l`
#        echo $lineNum
#
#         if [ "$lineNum" -eq 3 ]; then
#            把文件夹里面东西翻出来
#            folderName= `ls -l |grep drw|awk '{print $9}'`
#            cd $folderName
#            cd "$folderName"
#            ls -l
#            mv "$folderName"/* ./
#         fi


    else
        echo "url include rar"
        wget  $downUrl -O homework_$1.rar

        # homeworkname=homework_$1.rar
        unrar x homework_$1.rar homework_$1/
        cd  homework_$1 && ~/atom.sh




    fi
    echo $homeworkname


#    echo $pattern
#    echo {$pattern}'abcd'
#    如果是zip压缩
#    if [ -n $pattern]; then
#    if [  -n $pattern ]; then
#
#    fi
#    判断是rar还是zip文件
fi
