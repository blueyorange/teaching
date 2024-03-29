---
marp: true
theme: gaia
math: mathjax
style: |
  section.resistor-series ul {
    list-style-type: none;
    display: flex;
  }
  section.resistor-series li {
    border: 1px solid black;
    padding: 0.5em 0.75em;
  }
  section.resistor-series li:nth-child(2) {
    border: none;
    border-bottom: 5px solid black;
    height: 10px;
  }
  section.word-grid ul {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    list-style-type: none;
  }
---

<!-- _class: word-grid -->

# How many do you know?

- resolution
- precision
- accuracy
- systematic error
- random error
- uncertainty
- error
- zero error

---

# :pen: Do It Now :straight_ruler:

State the absolute uncertainty and calculate the relative (percentage) uncertainty in these measurements.

1. A metre ruler is used to make a measurement of 1.51 m.
2. A micrometer is used to make a measurement of 2.43 mm.
3. ![w:500px](./images/ammeter_example.jpeg)

---

# :pen: Answers :straight_ruler:

State the absolute uncertainty and calculate the relative (percentage) uncertainty in these measurements.

1. A metre ruler is used to make a measurement of 1.51 m.
   _1.51 &plusmn; 0.01 m &plusmn; 0.7%_
2. A micrometer is used to make a measurement of 2.43 mm.
   _2.43 &plusmn; 0.01 mm &plusmn; 0.4%_
3. ![w:300px](./images/ammeter_example.jpeg) _0.5 &plusmn; 0.1A &plusmn; 20%_

---

# Learning Objectives

- estimate the uncertainty in a quantity which relies on one or more uncertain measurements
- estimate the uncertainty in repeat measurements which are subject to random error

---

# Propagating uncertainties

Sometimes we make an **indirect measurement**.

For example:

- we measure **perimeter** by measuring side lengths of a rectangle
- we measure **resistance** by measuring potential difference and current
- we measure **acceleration** by measuring distance and time taken of a falling object

---

# Repeat measurements and random error

- Many measurements are repeated as they are subject to **random error**.
- Repeating and taking an average improves **accuracy**.
- To estimate the uncertainty in repeated measurements, use **half the range**, eg (28.23-28.17)/2 in the example below.

| $20T_1$ / s | $20T_2$ / s | $20T_3$ / s |
| ----------- | ----------- | ----------- |
| 28.17       | 28.23       | 28.21       |

---

# The rules

Without any further explanation:

1. When adding _or_ subtracting quantities, we always **add** the **absolute** uncertainties
2. When multiplying _or_ dividing quantities, we always **add** the **percentage** uncertainties
3. Multiplying by a fixed constant multiplies the absolute uncertainty by that constant. It does not affect the percentage uncertainty.

---

<!-- _class: resistor-series -->

# Example 1

Two resistors in series have resistances of 4.0 &Omega; and 6.0 &Omega;. Calculate their total resistance and the uncertainty in the measurement.

- 4.0 &Omega;
-
- 6.0 &Omega;

---

# Example 2

An ammeter in series with a resistor reads 0.60 A and a voltmeter in parallel reads 1.2 V.

Calculate the resistance of the resistor.

---

# Example 3

A vernier calliper is used to measure the thickness of a stack of 50 sheets of card to be 12.7 mm.

What is the thickness of one sheet of card?

---

# Example 4

An A4 sheet of paper measures 210 x 197 mm, to the nearest mm.

Calculate the perimeter and the area, and the percentage uncertainties in these measurements.

---

# Example 5

A ball falls from rest through s = 1.00 &plusmn; 0.01 m, and is timed to take t = 0.45 s.

Calculate the acceleration due to free fall, g.

Use the equation $s=\frac{1}{2}gt^2$

---

# Example 6

| $20T_1$ / s | $20T_2$ / s | $20T_3$ / s |
| ----------- | ----------- | ----------- |
| 28.17       | 28.23       | 28.21       |

The above table shows three measurements of 20 swings of a pendulum.

Calculate the time for one swing, and the percentage uncertainty in this measurement.

---

# Further Questions

Try the examples on Isaac Physics.

---

# Appendix

### Mathematical reasoning for rules

1. When adding or subtracting quantities, we always add the absolute uncertainties.

Consider two measurements $a$ and $b$ with uncertainties $\delta a$ and $\delta b$.

$$
(a\pm \delta a) + (b\pm\delta b) = (a + b) \pm (\delta a + \delta b)\\
$$

$(a+b)$ is the sum of the measured values. $(\delta a + \delta b)$ is the sum of the absolute uncertainties.

---

2. When multiplying _or_ dividing quantities, we always **add** the **percentage** uncertainties

$$
(a\pm \delta a) \times (b\pm\delta b) = ab \pm a\delta b \pm b\delta a \pm \delta a \delta b
$$

$ab$ is the product of the two measured values. So the uncertainty is $a\delta b + b\delta a + \delta a \delta b$. Dividing by ab will give the percentage uncertainty.

This gives

$$
\frac{a\delta b + b\delta a + \delta a \delta b}{ab}=\frac{\delta b}{b} +\frac{\delta b}{a}+ \frac{\delta a \delta b}{ab}
$$

The last term is very small so we ignore, and the first two are the sum of the percentage uncertainties!

---

# Measurement circus

1. 1.5 V cell, unmarked resistor, ammeter and voltmeter set up as circuit to measure resistance
2. micrometer and short length of thick wire
3. vernier calliper and short length of hollow pipe
4. ruler and short length of thick wire with kinks
5. approx 0.50 m pendulum set up with stopclock
6. 500 sheets of A4 paper and ruler to measure thickness of sheet of paper

Show your working for each example.

---

# 1. Resistance

1. Set up a circuit to measure the resistance.
2. Record the p.d. and current, and the uncertainty in both.
3. Calculate the resistance and the % uncertainty in that value.

V = \_\_\_\_\_ &plusmn; \_\_\_\_\_ V &plusmn; \_\_\_\_\_ %
I = \_\_\_\_\_ &plusmn; \_\_\_\_\_ A &plusmn; \_\_\_\_\_ %

so R = \_\_\_\_\_ &plusmn; \_\_\_\_\_ &Omega; &plusmn; \_\_\_\_\_ %

---

# 2. Micrometer

![bg right:35% fit](https://www.miniphysics.com/wp-content/uploads/2014/11/micrometer-0.jpg)

- Use the micrometer to measure the **diameter** of the wire.
- Measure in three places and take and average.

| $d_1$ / mm | $d_2$ / mm | $d_3$ / mm | $\bar{d}$ / mm |
| ---------- | ---------- | ---------- | -------------- |
| &#160;     |            |            |                |

so d = \_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &plusmn; \_\_\_\_\_ %

---

# 2. Micrometer (continued)

Can you find the cross-sectional area A, with uncertainty?

so A = \_\_\_\_\_\_\_\_\_\_ &plusmn; \_\_\_\_\_ mm&sup2; &plusmn; \_\_\_\_\_ %

---

# 3. Vernier calliper

1. Use the vernier calliper to measure the internal diameter x of the pipe.
2. Measure the external diameter y.
3. Calculate the thickness t = y-x.

x = \_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &plusmn;
y = \_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &plusmn;
t = \_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &plusmn;

---

# 4. Ruler

Use the ruler to find the length of the wire.

Estimate the uncertainty in your measurement.

so l = \_\_\_\_\_\_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &sup2; &plusmn; \_\_\_\_\_ %

---

# 5. Pendulum

Measure 20 swings of the pendulum 3 times. Find the average. Divide by 20 to find the average period.

| $20T_1$ / s | $20T_2$ / s | $20T_3$ / s | $\overline{20T}$ / s | $\overline{T}$ / s |
| ----------- | ----------- | ----------- | -------------------- | ------------------ |
| &#160;      |             |             |

Calculate the absolute and percentage uncertainties.

so T = \_\_\_\_\_\_\_\_\_\_ &plusmn; \_\_\_\_\_ s &sup2; &plusmn; \_\_\_\_\_ %

---

# 6. Thickness of a sheet of paper

Measure the thickness of 500 sheets of paper.

500t = \_\_\_\_\_\_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &plusmn; \_\_\_\_\_ %

Calculate the thickness of one sheet.

t = \_\_\_\_\_\_\_\_\_\_ &plusmn; \_\_\_\_\_ mm &plusmn; \_\_\_\_\_ %
