---
title: Code Block Example
date: 2022-08-11T20:00:00+02:00
---

This is a code block:

```
Some generic code
Some very long line, which shouldn't cause horizontal scrolling on mobile.
```

This is a normal paragraph with `some very long inline code command, which should also not cause horizontal scrolling`.

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
