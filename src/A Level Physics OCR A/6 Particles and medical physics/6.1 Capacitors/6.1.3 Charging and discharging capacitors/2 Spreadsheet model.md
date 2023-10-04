---
marp: true
math: mathjax
theme: gaia
---

# :pen: Do It Now!

For capacitor discharge:
$$\frac{Q}{Q_0} = \frac{I}{I_0} = \frac{V}{V_0} = e^{-\frac{t}{CR}}$$

A 470 &mu;F capacitor charged to 6.0V discharges through a 100 k&Omega; resistor. Calculate:

1. The time constant CR.
2. The time taken to discharge to 2.2V.
3. The voltage after 1m34s.

---

# Answers

1. 47s
2. 47s
3. 94s = 2CR so $e^{-2} \times 6.0 = 0.82 \text{ V}$

---

# Learning Objectives

- Use an **iterative** spreadsheet model to simulate capacitor discharge.

---

# Iterative model of capacitor discharge

We will **not** use $\frac{Q}{Q_0} = e^{-\frac{t}{CR}}$

Instead, choosing a **small** value of $\Delta t$:

1. calculate the initial charge $Q_0$.
2. Calculate the change in charge using $\Delta Q = -\frac{Q}{CR}\Delta t$
3. Calculate the new charge using $Q_1 = Q_0+\Delta Q = Q_0 - \frac{Q}{CR}\Delta t$

&Delta;t is called the **time step**. The smaller you make this, the more accurate your model will be.

---

# Example: discharge

With 100 &mu;F capacitor, 3.00 k&Omega; resistor, 5.0 V cell.
Decide on a suitable value for &Delta;t, e.g. 0.1s or 0.01s.

|     | A            | B             | C                                 |
| --- | ------------ | ------------- | --------------------------------- |
| 1   | **t / s**    | **Q / &mu;C** | **&Delta;Q / &mu;C**              |
| 2   | 0            | =100\*5.0     | =-B2/(100\*10^-6\*3000)\*&Delta;t |
| 3   | =A2+&Delta;t | =B2+C2        | =-B3/(100\*10^-6\*3000)\*&Delta;t |

Notice that B2 is different to B3, but C3 is the same formula as C2.
You can _fill down_ from row 3 to the desired time.

---

# Taking it further

1. Separate your constants on to e.g. a separate tab so that they can be changed. Use a fixed cell reference e.g.
2. Plot a graph of Q vs t.
3. Try adjusting the time step and the other constants to see the effect on capacitor discharge.
4. Add columns for I and V. How will these be calculated?
5. Compare your model with the equation $\frac{Q}{Q_0} = e^{-\frac{t}{CR}}$. You could create another column with these results to compare.
6. Create a model for **charging** a capacitor.

---

# Discussion

Why do we use iterative models? What are the advantages?
