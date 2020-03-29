---
title: "Doctrineで発行されるSQLを確認する"
date: "2020/3/15"
slug: row-sql-doctrine
tags: [PHP, Symfony, Doctrine]
description: HP, Symfony, Doctrine
---
SymfonyでDoctrineを使用していて、発行されるSQLを確認したくなったので、やり方を記載する。

```php
$replaceTargets = [];
foreach ($qb->getQuery()->getParameters()->toArray() as $key => $parameters) {

    $value = $parameters->getValue();

    $replaceTarget = '';
    if (is_array($value)) {
        $n = [];
        foreach ($value as $row) {
            $n[] = "'".$row."'";
        }
        $replaceTarget = implode(',', $n);
    } else {
        $replaceTarget = "'".$value."'";
    }
    $replaceTargets[] = $target;
}

$replace = vsprintf(str_replace('?', '%s', $qb->getQuery()->getSQL()), $replaceTargets);

var_dump($replace);
```

上記のように書くことでsetParameterした値も含め、どのようなSQLが発行されるか確認することが出来る。