---
layout: post
title: Quick Introduction to Renormalisation
date: 2025-08-05 14:09:00
description: renormalisation without QED, field theory...
tags: physics intro
categories: physics
featured: true
# thumbnail: assets/img/thumbnails/terminal.png
---

### What even is renormalisation that all the high-energy theorists talk about?

I had always been interested in learning about renormalisation, that all the elementary physics theorists praise. In my pursuit, I came across two kinds of resources; one that started from the ground up with several chapters/sections of intense stuff that I could never wrap my head around leading to renormalisation (unsurprisingly I never got to it). The second kind of resource just explained why its a great 'tool' to 'sweep infinities under the rug', I get the idea but what is it? Why are we dealing with infinities in the first place? And what do you mean by removing it? 

I came across this nice [paper](https://arxiv.org/abs/hep-th/0212049) on arxiv by B. Delamotte, that explains the crux of renormalisation without any baggage of QED or field theory. Here is my toned down explaination of what renormalisation is.

# Renormalisation

Say a theory gives the result (perturbatively):

$$
F(x) = g_0 + g_0^2 F_1(x) + g_0^3 F_2(x) + \cdots
$$

and each term $$ F_1(x), F_2(x), \ldots $$ are diverging.  
E.g.,

$$
F_1(x) = \int_0^\infty \frac{dt}{t + x} = \ln\left( \frac{\Lambda + x}{x} \right)
$$

Then $$ F(x) $$ is also diverging. The theory has seemingly failed.

To still use the theory, assume that:

$$
F(\mu) = g_R
$$

i.e., at some $$ x = \mu $$ value, $$ F(x) $$ is known to be $$ g_R $$ (say it's a physical quantity).

---

Now the goal is to write

$$
F(x) = g_R + g_R^2 F_1'(x) + g_R^3 F_2'(x) + \cdots
$$

where $$ F_i'(x) $$ are non-diverging.

---

> A physical example where we ignore the infinity is in "electric potential of point particles". One can write the electric potential energy for two nearby charged spheres by adding the self-energy of each sphere and add the interaction potential to it. Now shrink the spheres to point charge keeping the net charge on it the same, the density will diverge off to infinity and so will the potential enenrgy; but to do physics we tend to ignore the self-energy of the spheres and just work with the interaction energy part. This is not the same as in renormalisation but it shows that divergence doesn't always mean the theory is wrong. 

## First order in $$ g $$

$$
F(x) = g_0 + \mathcal{O}(g_0^2)
$$

and

$$
F(\mu) = g_R
$$

Equate these at $$ x = \mu $$ to get:

$$
g_0 = g_R + \mathcal{O}(g_R^2)
$$

Hence we get:

$$
F(x) = g_R + \mathcal{O}(g_R^2)
$$

Motivated from this, we say:

$$
g_0 = g_R + \delta g_R^2 + \delta g_R^3 + \cdots
$$

---

## Second order in $$ g $$

$$
F(x) = g_0 + g_0^2 F_1(x) + \mathcal{O}(g_0^3)
$$

Now write $$ F_1(x) $$ in terms of a parameter $$ (\lambda) $$ such that it is well-defined:

$$
F_1(x) = \int_0^\infty \frac{dt}{t + x} = \lim_{\lambda \to \infty} \int_0^\lambda \frac{dt}{t + x} = \lim_{\lambda \to \infty} \ln\left( \frac{\lambda + x}{x} \right)
= F_{1, \lambda}(x)
$$

Using

$$
g_0 = g_R + \delta g_R^2 + \mathcal{O}(g_R^3)
$$

we get:

$$
F(x) = g_R + \delta g_R^2 + g_R^2 F_1(x) + \mathcal{O}(g_R^3)
= \lim_{\lambda \to \infty} \left( g_R + \delta g_R^2 + g_R^2 F_{1, \lambda}(x) \right) + \mathcal{O}(g_R^3)
$$

Comparing at $$ F(\mu) = g_R $$, we get:

$$
\delta g_R^2 = -g_R^2 F_{1, \lambda}(\mu) = -g_R^2 \ln\left( \frac{\lambda + \mu}{\mu} \right)
$$

Hence,

$$
F(x) = \lim_{\lambda \to \infty} \left[ g_R + g_R^2 \left( F_{1, \lambda}(x) - F_{1, \lambda}(\mu) \right) \right] + \mathcal{O}(g_R^3)
$$

$$
= g_R + \alpha g_R^2 \lim_{\lambda \to \infty} \left( \ln\left( \frac{\lambda + x}{x} \right) - \ln\left( \frac{\lambda + \mu}{\mu} \right) \right)
$$

$$
= \ln\left( \frac{\mu}{x} \right) + \ln\left( \frac{\lambda + x}{\lambda + \mu} \right)
\rightarrow \ln\left( \frac{\mu}{x} \right) \quad \text{as } \lambda \to \infty
$$

Thus:

$$
\boxed{
F(x) = g_R + \alpha g_R^2 \ln\left( \frac{\mu}{x} \right) + \mathcal{O}(g_R^3)
}
$$

---

# Conventions

1. Write

$$
F_{1, \lambda}(x) = F_{1, \lambda}^S(x) + F_{1, \lambda}^R(x)
$$

- $$ F^S $$: singular part
- $$ F^R $$: regular part

So that

$$
\lim_{\lambda \to \infty} F_{1, \lambda}(x) = \left( \lim_{\lambda \to \infty} F_{1, \lambda}^S(x) \right) + \left( \lim_{\lambda \to \infty} F_{1, \lambda}^R(x) \right) = F_1(x)
$$

- Diverge + Finite

Notice the decomposition is **not unique** (e.g., $$ \infty + c = \infty $$).  
**Convention** is to choose $$ F_1^S(x) = F^S $$, i.e., independent of $$ x $$.

Example:

$$
F_1(x) = \ln\left( \frac{\lambda + x}{x} \right) = \ln(\lambda) + \ln\left( 1 + \frac{x}{\lambda} \right)
$$

$$
\Rightarrow F_1(x) = \lim_{\lambda \to \infty} \ln(\lambda) - \ln(x)
$$

where, the first term is singular and second term regualar

---

### 2nd order in $$ g $$ (symbolic)

$$
F(x) = g_0 + g_0^2 F_1(x) + \mathcal{O}(g_0^3)
$$

and

$$
g_0 = g_R + S g_R^2 + \mathcal{O}(g_R^3)
$$

$$
\Rightarrow F(x) = g_R + g_R^2 F_1(x) + S g_R^2 + \mathcal{O}(g_R^3)
$$

So

$$
F(\mu) = g_R + g_R^2 F_1^S + g_R^2 F_1^R(\mu) + S g_R^2
$$

$$
\Rightarrow g_R^2 F_1^S + S g_R^2 = -g_R^2 F_1^R(\mu)
$$

or

$$
S g_R^2 = -g_R^2 F_1^R(\mu)
$$

Hence,

$$
F(x) = g_R + g_R^2 \left( F_1^R(x) - F_1^R(\mu) \right)
$$

---

# 3rd order in $$ g_0 $$ (symbolic)

$$
F(x) = g_0 + g_0^2 F_1(x) + g_0^3 F_2(x) + \mathcal{O}(g_0^4)
$$

$$
g_0 = g_R + S g_R^2 + S_2 g_R^3 + \mathcal{O}(g_R^4)
$$

$$
\Rightarrow F(x) = g_R + \left( S g_R^2 + g_R^2 \right) F_1(x) + g_R^3 F_2(x)
$$

$$
+ \left( S g_R^3 + 2 g_R S g_R^2 F_1(x) \right) + S_2 g_R^3 + \mathcal{O}(g_R^4)
$$

$$
\Rightarrow F(\mu) = g_R + \left[ S g_R^2 + g_R^2 \right] F_1(\mu) + g_R^3 F_2(\mu) + \left( S_2 g_R^3 + 2 g_R S g_R^2 F_1(\mu) \right)
$$

$$
\Rightarrow S_2 g_R^3 = -g_R^3 \left[ 2 F_1(\mu) - F_2(\mu) \right]
$$

Hence,

$$
F(x) = g_R + g_R^2 \left( F_1^R(x) - F_1^R(\mu) \right) + g_R^3 \left( 2 F_1(\mu) F_1(x) - F_2(\mu) - 2 F_1(x) F_1(\mu) + F_2(x) \right)
$$

For this to be well-defined we need the singular part of:

$$
F_2(x) - F_2(\mu) + 2 F_1(\mu)(F_1(x) - F_1(\mu)) = 0
$$

Now,

$$
F_1(\mu)[F_1(\mu) - F_1(x)] = \left( F_1^S + F_1^R(\mu) \right) \left( F_1^R(\mu) - F_1^R(x) \right)
$$

$$
\Rightarrow F_2^S(x) - F_2^S(\mu) - 2 F_1^S \left( F_1^R(x) - F_1^R(\mu) \right) = 0
$$

The above equation is similar to 2nd order when one replaces  
$$ F_1^S \to F_2^S(x) - 2 F_1^S F_1^R(x) $$,  
$$ F_1^S(\mu) \to F_2^S(\mu) - 2 F_1^S F_1^R(\mu) $$

Hence we take 
$$ F_2^S(x) = F_1^S + 2 F_1^S F_1^R(x) $$

Finally we arrive at the correct result upto second order

$$
\boxed{
F(x) = g_R + g_R^2 \left( F_1^R(x) - F_1^R(\mu) \right) + \mathcal{O}(g_R^3)
+ g_R^3 \left[ F_2^R(x) - F_2^R(\mu) - 2 F_1^R(x) F_1^R(\mu) \right]
}
$$

---
# Takeaway
The key idea of renormalisation is to use the knowledge of the value of the seemingly diverging function at a point ($$\mu$$ in the above example) to find its relative value at some other point ($$x$$). Please read the [paper](https://arxiv.org/abs/hep-th/0212049) (https://arxiv.org/abs/hep-th/0212049) if you can, it goes into more details and gives more solid explainations which I have avoided to keep this simple. 

