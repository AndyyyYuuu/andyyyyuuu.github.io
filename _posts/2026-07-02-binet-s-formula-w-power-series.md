---
layout: post
title: Binet's Formula w/ Power Series
tags:
- math
blurb: Deriving a closed-form expression for the n-th  Fibonacci number
date: 2026-07-02 11:24 -0700
---
As a first post, I thought I'd share a derivation that may be of interest to anybody who has recently taken first-year college calculus. 

For ease of reading, I've separated this derivation into sections using horizontal lines, where each section builds upon the conclusion of the previous section. It goes something like this.

---

Let $$\{F_n\}_{n=0}^\infty$$ be the Fibonacci Sequence. This is defined by base cases

$$F_0 = 0, \quad F_1 = 1$$

and for all $$n \geq 2$$, the Sequence is defined recurrently by

$$F_n = F_{n-1} + F_{n-2}.$$

---

We first establish that $$F_n$$ is an increasing sequence (you can prove this rigorously using induction), and therefore, that $$F_n \geq 0.$$

Then, for all $$n \geq 2$$, we have from the definition that $$F_n=F_{n-1}+F_{n-2} \leq F_{n-1} + F_{n-1} = 2F_{n-1}$$, so $$F_n \leq 2F_{n-1}$$. A little intuition tells us that since the next item in the Sequence is less than or equal to double the previous, the growth speed of this function at most follows $$2^n$$. Indeed, $$F_n \leq 2^n$$, and you can again prove this using induction if you like. 

We bound $$0 \leq F_n \leq 2^n$$ from the last two paragraphs. Then, for $$n \geq 0$$, 

$$\displaylines{
\frac{0}{4^n} \leq \frac{F_n}{4^n} \leq \frac{2^n}{4^n}\br
0 \leq \frac{F_n}{4^n} \leq \frac1{2^n}.
}$$

Therefore, by the comparison test, since $$\sum\limits_{n=0}^\infty\frac1{2^n}$$ converges, the series $$\sum\limits_{n=0}^\infty\frac{F_n}{4^n}$$ also converges. 

Okay, stay with me. 

---

Consider now a power series with Fibonacci coefficients: 

$$\sum\limits_{n=0}^\infty F_nx^n$$

Note that we can plug in $$\frac14$$ to get $$\sum\limits_{n=0}^\infty\frac{F_n}{4^n}$$, which we just proved converges, and the series converges to $$0$$ trivially when $$x=0$$. Using a few theorems from Calculus on radii of convergence, we know that this series converges on at least a radius of $$\frac14$$ around $$0$$. So for some function $$f$$, 

$$f(x) = \sum\limits_{n=0}^\infty F_nx^n$$

when $$-\frac14 < x \leq \frac14$$. 

By the uniqueness of power series representations, any function that adheres to its power series on an interval has a **unique** power series representation on that interval. We can thus claim that within $$(-\frac14, \frac14]$$, $$\sum\limits_{n=0}^\infty F_nx^n$$ is not only a power series representation of $$f(x)$$, it is the **unique** one. 

---

That's a cool result, but let's try and obtain more information about this mysterious $$f(x)$$. Of course, the below calculations are bounded on our working interval of $$(-\frac14, \frac14]$$. We first separate out the first two elements of the series: 

$$f(x) = \sum\limits_{n=0}^\infty F_nx^n = F_0 x^0 + F_1 x^1 + \sum\limits_{n=2}^\infty F_nx^n.$$

Substituting $$F_0, F_1,$$ and $$F_n$$ out for their definitions from earlier and simplifying, we have

$$f(x) = 0 + x + \sum\limits_{n=2}^\infty (F_{n-1} + F_{n-2}) x^n.$$

We then split up the remaining series by distributive property and reindex them: 

$$f(x) = x + \sum\limits_{n=2}^\infty F_{n-1} x^n + \sum\limits_{n=2}^\infty F_{n-2} x^n = x + \sum\limits_{n=1}^\infty F_{n} x^{n+1} + \sum\limits_{n=0}^\infty F_{n} x^{n+2}.$$

Factor out $$x$$ and $$x^2$$: 

$$f(x) = x + x \sum\limits_{n=1}^\infty F_{n} x^n + x^2\sum\limits_{n=0}^\infty F_{n} x^n.$$

We can then substitute in $$\sum\limits_{n=0}^\infty F_{n} x^n = f(x)$$ to obtain: 

$$f(x) = x + xf(x) + x^2f(x),$$

completely removing any infinite sequences from the equation. 

---

Let's solve for $$f(x)$$. Rearranging the equation yields

$$f(x) = \frac{x}{1-x-x^2}.$$

We then decompose the fraction to get 

$$f(x) = \frac{\frac{1}{\sqrt5}}{1-\frac{1+\sqrt5}{2}x}-\frac{\frac{1}{\sqrt5}}{1-\frac{1-\sqrt5}{2}x}.$$

(You're just gonna have to take my prof's word on this one, because I don't want to spend time decomposing this)

At this point, we notice that these forms may look very familiar from the formula $$\frac{a}{1-r} = \sum\limits_{n=0}^\infty ar^n$$, so we apply it on the fractions above to get back to infinite series: 

$$f(x) = \sum\limits_{n=0}^\infty\frac1{\sqrt5}\left(\frac{1+\sqrt5}{2}x\right)^n-\sum\limits_{n=0}^\infty\frac1{\sqrt5}\left(\frac{1-\sqrt5}{2}x\right)^n = \sum\limits_{x=0}^\infty\left[\frac1{\sqrt{5}}\left(\frac{1+\sqrt5}2\right)^n-\frac1{\sqrt{5}}\left(\frac{1-\sqrt5}2\right)^n\right]x^n.$$

We now have two power series representations for $$f(x)$$ on its domain: 

$$\displaylines{
    f(x) = \sum\limits_{n=0}^\infty F_nx^n \br
    f(x) = \sum\limits_{n=0}^\infty\left[\frac1{\sqrt{5}}\left(\frac{1+\sqrt5}2\right)^n-\frac1{\sqrt{5}}\left(\frac{1-\sqrt5}2\right)^n\right]x^n.
}$$

Since $$f(x)$$ has a unique power series representation, these two series must have the same coefficients; so, we can equate 

$$F_n = \frac1{\sqrt{5}}\left(\frac{1+\sqrt5}2\right)^n-\frac1{\sqrt{5}}\left(\frac{1-\sqrt5}2\right)^n,$$

and bam, we have a closed form for the Fibonacci Sequence!

The use of generating functions to find closed forms for sequences is not uncommon. But it did surprise me, and I hope you found it interesting too. 

Thanks for reading! 


