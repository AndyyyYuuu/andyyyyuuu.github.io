---
layout: post
title: Hello World!!
date: 2026-06-25 16:29 -0700
---
I just got this thing set up. Figured I could dump updates and thoughts here. 

In the meantime, we can approximate $$e^x$$ by

$$e^x = \sum\limits_{i=0}^\infty \frac{x^n}{n!},$$

from which we see that MathJax seems to be working. 

---


I can also paste some code. 

```py
def entropy(x: torch.Tensor, dim: int, alpha: float = 1) -> torch.Tensor:
    if alpha == 1: 
        return -torch.sum(x * torch.log(x), dim=dim)
    elif alpha == 0: 
        return torch.log((x != 0).sum(dim=dim).float())
    else: 
        return torch.log(torch.sum(x ** alpha, dim=dim)) / (1 - alpha)
```

Neat. 
