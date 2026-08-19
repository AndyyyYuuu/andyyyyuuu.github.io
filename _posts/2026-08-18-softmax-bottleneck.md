---
layout: post
title: Notes for proving the Softmax bottleneck
blurb: Why language models can't perfectly model language
tags:
- math
- nlp
date: 2026-08-18 17:51 -0700
---
I'm not beating the allegations with all these proofs in my blog. 

This post was originally a personal note for the proof for the Softmax bottleneck presented in <a href="https://arxiv.org/abs/1711.03953" target="_blank">Yang et al. (2018)</a>. It puts a hard cap on how well transformers can represent distributions in language and is a tradeoff most of today's LLMs have to face. 

You probably need the first year of a math degree (proofs, linear algebra, basic probability) and at least some knowledge of language models to understand this; it's unfortunately not the most widely accessible. 

### Basic Notations

We define a natural language $$\mathcal L$$ as a set of pairs of a context and its conditional next-token distribution $$\mathcal L = \{(c_i, P^*(X\mid c_i))\}_{i=1}^N$$ with $$N$$ being the number of possible contexts in a language. $$P^*$$ denotes a true probability. 

For a vector $$\bf a \in \R^M$$, define

$$\text{Softmax}(\bf a)_j = \frac{\exp(a_j)}{\sum\limits_{k=1}^M \exp(a_k)}, \qquad j = 1, \dots, M$$

For a matrix $$\bf A \in \R^{N\times M}$$, $$\text{Softmax}(\bf A)$$ is applied **row-wise**, i.e. each row $$\bf a_i$$ of $$\bf A$$ is mapped independently by the vector definition above:

$$\text{Softmax}(\bf A)_{ij} = \frac{\exp(A_{ij})}{\sum\limits_{k=1}^M \exp(A_{ik})}$$

so that each row of the resulting matrix is a valid probability distribution over the $$M$$ tokens.


Most of today's autoregressive models obtain next-token distributions through 

$$P_\theta(x_j \mid c) = \text{Softmax}(\bf W_\theta \bf h)_j$$

where $$\bf h \in \R^d$$ is a hidden state vector computed in some way using $$c$$, and $$\bf W_\theta \in \R^{M\times d}$$ is the unembedding matrix which will be defined in more detail later. 


--- 

### Definitions

We define matrices

$$\bf H_\theta = \mat{\bf h_{c_1}\T \\ \bf h_{c_2}\T \\ \vdots \\ \bf h_{c_N}\T} ~;\quad \bf W_\theta = \mat{\bf w_{x_1}\T \\ \bf w_{x_2}\T \\ \vdots \\ \bf w_{x_M}\T}$$

$$\bf H_\theta\in \R^{N\times d}$$ is a matrix where each row is the hidden state given by feeding some context $$c_i$$ into the model. This is repeated over all $$N$$ possible contexts. You can think of this matrix as a complete summary of the behaviour of a language model's final hidden state $$\bf h$$. 

$$\bf W_\theta\in \R^{M\times d}$$ is a matrix where each row is the word embedding of a particular token, repeated over all $$M$$ tokens. In other words, it is the unembedding matrix. 

The $$\theta$$ subscript is used to indicate that both these matrices are dependent on the parameters of our model. 

For clarity, I define 

$$
\quad \bf P^* = \mat{P^*(x_1\mid c_1) & P^*(x_2\mid c_1) & \cdots & P^*(x_M\mid c_1) \\ P^*(x_1\mid c_2) & P^*(x_2\mid c_2) & \cdots & P^*(x_M\mid c_2) \\ \vdots & \vdots & \ddots & \vdots \\ P^*(x_1\mid c_N) & P^*(x_2\mid c_N) & \cdots & P^*(x_M\mid c_N)}
$$


<!--$$\quad \bf A = \mat{\log P^*(x_1\mid c_1) & \log P^*(x_2\mid c_1) & \cdots & \log P^*(x_M\mid c_1) \\ \log P^*(x_1\mid c_2) & \log P^*(x_2\mid c_2) & \cdots & \log P^*(x_M\mid c_2) \\ \vdots & \vdots & \ddots & \vdots \\ \log P^*(x_1\mid c_N) & \log P^*(x_2\mid c_N) & \cdots & \log P^*(x_M\mid c_N)}$$-->

$$\bf P^* \in \R^{N\times M}$$ is a matrix representation of $$P^*$$. Each row is the true next-token probability distribution of a particular context $$c_i$$ in the language. This is repeated over all $$N$$ possible contexts. This absolutely colossal matrix is a mathematical representation of the true distribution behind the language. 

Yang et al. use notation such as $$P$$ to denote both a probability distribution and a matrix, where $$P(x_j \mid c_i) \equiv P_{ij}$$ equivalently. For simplicity, I will use bold $$\bf P$$ to denote matrices and try to use this form as much as possible to ensure consistency with the rest of the linear algebra. Just remember, matrix $$\bf P$$ or any variation thereof represents a conditional probability distribution by $$\bf P_{ij} = P(x_j \mid c_i)$$. 

We finally define the true log probability matrix of the language, 

$$\bf A = \log (\bf P^*)$$

where $$\log$$ is element-wise. 



--- 

We also define a rather important set

$$F(\bf A) = \{\bf A + \bf {\Lambda J}_{N, M} \mid \Lambda \in \R^{N\times N} \text{ is diagonal}\}$$

where $$J_{N,M} \in \R^{N\times M}$$ is all ones. $$F(\bf A)$$ is the set of all matrices that result from adding arbitrary real numbers to the rows of $$\bf A$$. 



--- 

### Properties of $$F(\bf A)$$

$$F(\bf A)$$ has two key properties: 

#### Property 1
$$F(\bf A) = \{\bf A' \mid \text{Softmax}(\bf A') = \bf P^*\}$$.

In other words, the matrices in $$F(\bf A)$$ is the set of all possible logits that can give the true distribution of the language when passed through Softmax. 

One direction of this can be seen intuitively by looking at $$\bf A$$ per-row. Recall that Softmax only cares about the **relative** size of the values in each row. Adding a constant $$\lambda$$ to a row multiplies every exponentiated entry by the same factor $$\exp(a_i + \lambda) = \exp(a_i)\exp(\lambda)$$, and that factor cancels when the row is normalized to sum to $$1$$. Adding a constant over an entire row therefore doesn't affect the distribution produced after the Softmax operation. 

---


#### Property 2

For any $$\bf A_1, \bf A_2 \in F(\bf A), \|\rank A_1 - \rank A_2 \| \leq 1$$. In other words, any two matrices in $$F(\bf A)$$ have rank differing at most by $$1$$. 

Consider the row space of two matrices $$\bf A_1, \bf A_2 \in F(\bf A)$$. The space spanned by the rows of $$A_1$$ might not equal to that of $$A_2$$, but if we add a ones vector to the rows of $$A_1$$, we can suddenly obtain every vector in $$A_2$$, since the $$i$$-th row of $$A_1$$ differs from the $$i$$-th row of $$A_2$$ by a vector populated with identical values. You can convice yourself that this indicates that the ranks of the matrices differ by no more than $$1$$. 


---

### Language Modeling is Matrix Factorization

A lemma follows from Property 1. I'm gonna bring back conditional probability notation because things are getting more concrete. 



#### Lemma 1

Given model parameter $$\theta$$, the following statements are equivalent: 
- $$\bf H_\theta \bf W_\theta\T \in F(\bf A)$$.
- For all contexts $$c$$ in language $$\mathcal L$$, $$P_\theta(X\mid c) = P^*(X\mid c)$$. 


In other words, if the result of $$\bf H_\theta \bf W_\theta\T$$ is a member of $$F(A)$$, then our model's conditional next-token probabilities perfectly match those of the language, and vice versa. 

Of course, we really want our conditional probabilities to perfectly match the language; that would be the perfect language model. In order to do that, we must at the minimum be able to find $$\bf H_\theta$$ and $$\bf W_\theta$$ such that 

$$\bf H_\theta \bf W_\theta\T = \bf A'$$

where $$\bf A' \in F(A)$$. 

This reframes our language modeling problem into a matrix factorization. To set some minimal conditions under which this equation can be solved, we examine the rank of both sides of the equation, giving us Proposition 1. 

---

## The Softmax Bottleneck

#### Proposition 1

If there exists $$\theta$$ such that $$P_\theta(X\mid c) = P^*(X\mid c)$$, then $$d \geq \min\limits_{\bf A'\in F(\bf A)} \rank(\bf A')$$. 

This follows from Lemma 1. If $$P_\theta(X\mid c) = P^*(X\mid c)$$, then $$\bf H_\theta \bf W_\theta\T = \bf A'$$ for some $$A'\in F(A)$$. Since $$\bf H_\theta$$ is $$N\times d$$ and $$\bf W\T_\theta$$ is $$d\times M$$, their product has rank at most $$d$$. Then there must exist some $$A'\in F(A)$$ where its rank is at most $$d$$. 

In other words, in order for it to be possible to perfectly match the true conditional probabilities $$\bf P^*$$ of language using our model, there must be some element in $$F(\bf A)$$ whose rank is less than $$d$$. 

We also know from Property 2 that all elements in $$F(\bf A)$$ has rank at least $$\rank(\bf A) - 1$$. We rewrite the proposition in terms of $$\bf A$$, take the contrapositive, and get the following: 

#### Corollary 1 (Softmax Bottleneck)

If $$d < \rank(\bf A) - 1$$, then for any $$\theta$$, there exists some context $$c$$ such that $$P_\theta(X\mid c) \neq P^*(X\mid c)$$. 

This corollary, a formal statement of the Softmax bottleneck, essentially states that if the rank of $$\bf A$$ is more than $$1$$ greater than $$d$$, there will always be instances in the language where a next-token probability is not matched by the language model. 

---

So, in a practical sense, is $$\rank(\bf A) > d + 1$$? 

Looking at a typical example with Llama 3.2 3B, since vocabulary size is $$M=128~256$$ and the number of possible contexts $$N$$ is massive, $$\bf A \in \R^{N\times M}$$ is a huge matrix. 

In comparison, the hidden size of Llama 3.2 3B is $$d = 2048$$. Maybe $$\bf A$$ has a rank less than $$2048$$, but as Yang et al. pointed out, the prospective of being able to capture all the nuances of a language by linear combination of $$2048$$ vectors is quite unlikely. Thus, by Corollary 1, there are contexts where such language models cannot match true language distributions. 

This limitation is not one that could be resolved easily. Increasing $$d$$ in practice competes with other constraints such as compute cost and data quality. Plus, as [Basri & Jacobs (2025)](https://openreview.net/forum?id=DgJqQk6y19) finds, the bottleneck's constraints are not as restricting in practice. The theory is correct, but we should also consider whether a seamless fit of $$P^*$$ is necessary. 

I promise the next post won't be about math. 