---
layout: post
title: Quick Introduction to Renormalisation
date: 2025-08-05 14:09:00
description: renormalisation without QED, field theory...
tags: physics intro
categories: physics
featured: true
thumbnail: assets/img/thumbnails/inf-under-rug.png
---

### What even is renormalisation that all the high-energy theorists talk about?

I had always been interested in learning about renormalisation, that all the elementary physics theorists praise. In my pursuit, I came across two kinds of resources; one that started from the ground up with several chapters/sections of intense stuff that I could never wrap my head around leading to renormalisation (unsurprisingly I never got to it). The second kind of resource just explained why its a great 'tool' to 'sweep infinities under the rug', I get the idea but what is it? Why are we dealing with infinities in the first place? And what do you mean by removing it? 

I came across this nice [paper](https://arxiv.org/abs/hep-th/0212049) on arxiv by B. Delamotte, that explains the crux of renormalisation without any baggage of QED or field theory. Here is my toned down explaination of what renormalisation is.

# Renormalisation

Say a theory gives the result (perturbatively):

$$\begin{equation}
F(x) = g_0 + g_0^2 F_1(x) + g_0^3 F_2(x) + \cdots
\end{equation}$$

and each term $ F_1(x), F_2(x), \ldots $ are diverging.  
For example,

$$\begin{equation}
F_1(x) = \int_0^\infty \frac{dt}{t + x} = \ln\left( \frac{\Lambda + x}{x} \right)
\end{equation}$$

Then $ F(x) $ is also diverging. The theory has seemingly failed.

To still use the theory, assume that:

$$\begin{equation}
F(\mu) = g_R
\end{equation}$$

i.e., at some $ x = \mu $ value, $ F(x) $ is known to be $ g_R $ (say it's a physical quantity).

---

Now the goal is to write

$$\begin{equation}
F(x) = g_R + g_R^2 \tilde{F}_1(x) + g_R^3 \tilde{F}_2(x) + \cdots
\end{equation}$$

where $ \tilde{F}_i(x) $ are non-diverging.

---

<details>
<summary><strong>Example of ignoring infinity in Physics</strong></summary>
<blockquote>
  A physical example where we ignore the infinity is in "electric potential of point particles". One can write the electric potential energy for two nearby charged spheres by adding the self-energy of each sphere and add the interaction potential to it. Now shrink the spheres to point charge keeping the net charge on it the same, the density will diverge off to infinity and so will the potential energy; but to do physics we tend to ignore the self-energy of the spheres and just work with the interaction energy part. This is not the same as in renormalisation but it shows that divergence doesn't always mean the theory is wrong.
</blockquote>
</details>


## First order in $ g $

$$\begin{equation}
F(x) = g_0 + \mathcal{O}(g_0^2)
\end{equation}$$

and

$$\begin{equation}
F(\mu) = g_R
\end{equation}$$

Equate these at $ x = \mu $ to get:

$$\begin{equation}
g_0 = g_R + \mathcal{O}(g_R^2)
\end{equation}$$

Hence we get:

$$\begin{equation}
F(x) = g_R + \mathcal{O}(g_R^2)
\end{equation}$$

Motivated from this, we say:

$$\begin{equation}
g_0 = g_R + \delta g_R^2 + \delta g_R^3 + \cdots
\end{equation}$$

---

## Second order in $ g $

$$\begin{equation}
F(x) = g_0 + g_0^2 F_1(x) + \mathcal{O}(g_0^3)
\end{equation}$$

Now write $ F_1(x) $ in terms of a parameter $ (\lambda) $ such that it is well-defined:

$$\begin{equation}
F_1(x) = \int_0^\infty \frac{dt}{t + x} = \lim_{\lambda \to \infty} \int_0^\lambda \frac{dt}{t + x} = \lim_{\lambda \to \infty} \ln\left( \frac{\lambda + x}{x} \right)
= F_{1, \lambda}(x)
\end{equation}$$

Using

$$\begin{equation}
g_0 = g_R + \delta g_R^2 + \mathcal{O}(g_R^3)
\end{equation}$$

we get:

$$
\begin{align}
F(x) &= g_R + \delta g_R^2 + g_R^2 F_1(x) + \mathcal{O}(g_R^3) \notag\\
     &= \lim_{\lambda \to \infty} \left( g_R + \delta g_R^2 + g_R^2 F_{1, \lambda}(x) \right) + \mathcal{O}(g_R^3)
\end{align}
$$


Comparing at $ F(\mu) = g_R $, we get:

$$\begin{equation}
\delta g_R^2 = -g_R^2 F_{1, \lambda}(\mu) = -g_R^2 \ln\left( \frac{\lambda + \mu}{\mu} \right)
\end{equation}$$

Hence,

<details>
<summary>
(click to see detailed calculation)
\begin{equation}
\boxed{
F(x) = g_R + \alpha g_R^2 \ln\left( \frac{\mu}{x} \right) + \mathcal{O}(g_R^3)
}
\end{equation}
</summary>

<p>

$$
\begin{align}
F(x) &= \lim_{\lambda \to \infty} \left[ g_R + g_R^2 \left( F_{1, \lambda}(x) - F_{1, \lambda}(\mu) \right) \right] + \mathcal{O}(g_R^3) \notag\\
&= g_R + \alpha g_R^2 \underbrace{\lim_{\lambda \to \infty} \left( \ln\left( \frac{\lambda + x}{x} \right) - \ln\left( \frac{\lambda + \mu}{\mu} \right) \right)}_{\ln\left( \frac{\mu}{x} \right) + \lim_{\lambda \to \infty} \ln\left( \frac{\lambda + x}{\lambda + \mu} \right) = \ln\left( \frac{\mu}{x} \right)} + \mathcal{O}(g_R^3) \notag\\
&= g_R + \alpha g_R^2 \ln\left( \frac{\mu}{x} \right) + \mathcal{O}(g_R^3) \notag
\end{align}
$$

</p>
</details>

<!-- 
$$
\begin{equation}
\boxed{
F(x) = g_R + \alpha g_R^2 \ln\left( \frac{\mu}{x} \right) + \mathcal{O}(g_R^3)
}
\end{equation}
$$ -->

---

# Conventions

Write

$$
\begin{equation}
F_{1, \lambda}(x) = \underbrace{F_{1, \lambda}^S(x)}_{\text{singular part}} + \underbrace{F_{1, \lambda}^R(x)}_{\text{regular part}}
\end{equation}
$$

So that

$$
\begin{equation}
\lim_{\lambda \to \infty} F_{1, \lambda}(x) = \underbrace{\left( \lim_{\lambda \to \infty} F_{1, \lambda}^S(x) \right)}_{\text{Diverge}} + \underbrace{\left( \lim_{\lambda \to \infty} F_{1, \lambda}^R(x) \right)}_{\text{Finite}} = F_1(x)
\end{equation}
$$

Notice the decomposition is **not unique** (e.g., $ \infty + c = \infty $).  
**Convention** is to choose $ F_1^S(x) = F^S $, i.e., independent of $ x $.

Example:

$$
\begin{align}
F_1(x) &= \lim_{\lambda \to \infty}  \ln\left( \frac{\lambda + x}{x} \right) \notag\\
 &= \lim_{\lambda \to \infty} \left[ \ln(\lambda) + \ln\left( 1 + \frac{x}{\lambda} \right) \right] \notag\\
&= \left[ \lim_{\lambda \to \infty} \ln(\lambda) \right] - \ln(x)
\end{align}
$$

where, the first term is singular and second term regualar

---

## 2nd order in $ g $ (without specific form of function)

$$
\begin{equation}
F(x) = g_0 + g_0^2 F_1(x) + \mathcal{O}(g_0^3)
\end{equation}
$$

and

$$
\begin{equation}
g_0 = g_R + \delta g_R^2 + \mathcal{O}(g_R^3)
\end{equation}
$$

So, 

$$
\begin{align}
F(x) &= g_R + g_R^2 F_1(x) + \delta g_R^2 + \mathcal{O}(g_R^3) \\
F(\mu) &= g_R + g_R^2 F_1^S + g_R^2 F_1^R(\mu) + \delta g_R^2
\end{align}
$$

Rearranging we get,
$$
\begin{equation}
g_R^2 F_1^S + \delta g_R^2 = -g_R^2 F_1^R(\mu)
\end{equation}
$$

or

$$
\begin{equation}
S g_R^2 = -g_R^2 F_1(\mu)
\end{equation}
$$

Hence,

$$
\begin{equation}
F(x) = g_R + g_R^2 \left( F_1^R(x) - F_1^R(\mu) \right)
\end{equation}
$$

as the singular parts are $ x $ independent and cancel (correct upto second order).

---

<details>
<summary><strong>3rd order in \( g \) (click to expand)</strong></summary>

$$
\begin{equation}
F(x) = g_0 + g_0^2 F_1(x) + g_0^3 F_2(x) + \mathcal{O}(g_0^4)
\end{equation}
$$

and

$$
\begin{equation}
g_0 = g_R + \delta g_R^2 + \delta_2 g_R^3 + \mathcal{O}(g_R^4)
\end{equation}
$$

So,

$$
\begin{align}
F(x) &= g_R + \left(\delta g_R^2 + g_R^2 \right) F_1(x) + g_R^3 F_2(x) \notag\\
& \qquad \quad + \left(\delta g_R^3 + 2 g_R\delta g_R^2 F_1(x) \right) + \delta_2 g_R^3 + \mathcal{O}(g_R^4) \\
\Rightarrow F(\mu) &= g_R + \left[\delta g_R^2 + g_R^2 \right] F_1(\mu) + g_R^3 F_2(\mu) + \left( \delta_2 g_R^3 + 2 g_R\delta g_R^2 F_1(\mu) \right)
\end{align}
$$

Rearranging we get,

$$
\begin{equation}
\delta_2 g_R^3 = -g_R^3 \left[ 2 F_1(\mu) - F_2(\mu) \right]
\end{equation}
$$

Hence,

$$
\begin{equation}
F(x) = g_R + g_R^2 \left( F_1^R(x) - F_1^R(\mu) \right) + g_R^3 \left( 2 F_1(\mu) F_1(x) - F_2(\mu) - 2 F_1(x) F_1(\mu) + F_2(x) \right)
\end{equation}
$$

For this to be well-defined we need the singular part of the expression to vanish.

$$
\begin{equation}
\text{Singular} \Bigl( F_2(x) - F_2(\mu) + 2 F_1(\mu)(F_1(x) - F_1(\mu)) \Bigr)= 0
\end{equation}
$$

Using,

$$
\begin{equation}
F_1(\mu) \Bigl[ F_1(\mu) - F_1(x) \Bigr] = \left( F_1^S + F_1^R(\mu) \right) \left( F_1^R(\mu) - F_1^R(x) \right)
\end{equation}
$$

we get,

$$
\begin{equation}
F_2^S(x) - F_2^S(\mu) - 2 F_1^S \Bigl( F_1^R(x) - F_1^R(\mu) \Bigr) = 0
\end{equation}
$$

The above equation is similar to 2nd order when one replaces  
$$
\begin{align}
F_1^S &\to F_2^S(x) - 2 F_1^S F_1^R(x) ,\\  
F_1^S(\mu) &\to F_2^S(\mu) - 2 F_1^S F_1^R(\mu)
\end{align}
$$

Hence we take
$$
\begin{equation}
F_2^S(x) = F_1^S + 2 F_1^S F_1^R(x) 
\end{equation}
$$

Finally we arrive at the correct result upto third order

$$
\begin{equation}
\boxed{
    F(x) = g_R + g_R^2 \left( F_1^R(x) - F_1^R(\mu) \right) + \mathcal{O}(g_R^3)
+ g_R^3 \left[ F_2^R(x) - F_2^R(\mu) - 2 F_1^R(x) F_1^R(\mu) \right]
}
\end{equation}
$$

</details>


---
# Takeaway
The key idea of renormalisation is to use the knowledge of the value of the seemingly diverging function at a point ($\mu$ in the above example) to find its relative value at some other point ($x$). Please read the [paper](https://arxiv.org/abs/hep-th/0212049) (https://arxiv.org/abs/hep-th/0212049) if you can, it goes into more details and gives more solid explainations which I have avoided to keep this simple. 

