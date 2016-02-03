#!/bin/bash
user='http://fuwu.jikexueyuan.com//Upload/homework/submit/homework_id_46_20160116170806.rar?attname=homework_46_23133.rar&e=1452940253&token=dV7jc6SkxyhcyaMj0zkPp_CIvrTsRKQ-4Eoe3WIz:JuiINTS8rKlhvKoPTsNK28_icTE=,,,结果只在文本框下一闪而过，请问老师什么方法可以保留结果'
i=1
while((1==1))
do
        split=`echo $user|cut -d ",,," -f$i`
        if [ "$split" != "" ]
        then
                ((i++))
                echo $split
        else
                break
        fi
done
