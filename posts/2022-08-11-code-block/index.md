---
title: Code Block Example
date: 2022-08-11T20:00:00+02:00
---

# Generic code block

```
Some generic code
Some very long line, which shouldn't cause horizontal scrolling on mobile.
```

# Inline code

This is a normal paragraph with `some very long inline code command, which should also not cause horizontal scrolling`.

# Code block with language

```java
public class Factorial {
    public static void main(String[] args) {
        int num = 10;
        long factorial = 1;
        for(int i = 1; i <= num; ++i) {
            // factorial = factorial * i;
            factorial *= i;
        }
        System.out.printf("Factorial of %d = %d", num, factorial);
    }
}
```

```kotlin
fun main() {
  println("Some Kotlin Code")
}
```

```bash
$ echo "This is a bash command"
```

# Code block with a filename

```js {data-filename=test.js}
const md = require('markdown-it')()
const prism = require('markdown-it-prism')

md.use(prism, options)
```

# Shell block (command and it's output)

```shell-session
$ ls -lah
total 1088
drwxr-xr-x   34 neonew  staff   1,1K 18 Dez 03:24 .
drwx------@  28 neonew  staff   896B  9 Dez 23:18 ..
-rw-r--r--    1 neonew  staff   1,9K  9 Dez 00:12 README.md
````
