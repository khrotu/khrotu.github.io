---
title: 'Arc: Auto Mode (Beta)'
date: '2026-08-04'
slug: arc-auto-mode-beta
---

[promo video](/blogs/arc-auto-mode-beta/video.webm)

Today, we're introducing Auto mode in beta.

Choosing a model shouldn't interrupt your work. With Auto mode, you write the prompt. Arc estimates how much capability it needs and selects the lowest-cost model it expects can handle it.

## Highlights

### Model choice, built in

A quick question can go to a fast, inexpensive model. A difficult task can go to a more capable one. Auto mode works with whichever models you have available, so you don't need to choose a fixed lineup to use it.

The quality setting lets you adjust that choice. Raise it to favor more capable models, or lower it to favor cost.

Auto mode is still in beta. It performs best on the kinds of prompts we've tuned it for; routing is less consistent on unfamiliar tasks.

## Methodology

Auto mode starts with a small model trained to estimate prompt difficulty.

To train it, we tested models at four capability levels, scoring 14, 34, 51, and 57 on the intelligence index. The dataset contains 6,127 unique prompts from real coding sessions and benchmarks[^1]. Each model used Arc's production system prompt and tools. That lets us measure difficulty in the environment where Auto mode will make its choices.

For the agentic banking and telecom suites, we ran each task for up to eight turns, with tools executing in the task environment. We then replayed the run and checked the results against database checks and natural-language assertions. For the remaining tasks, we used an LLM judge to grade the responses.

The classifier uses TF-IDF word-pair features with a logistic curve. We also tested fine-tuned MiniLM models and a three-fold ensemble. Their results were all within 0.01 AUC of the simpler classifier, so we chose the faster, simpler model.

In internal testing, the classifier achieved 0.79 AUC on mixed prompts, 0.71 on real coding prompts, and 0.9 to 0.99 on the agentic suites.

You can help shape the beta through the [community repo](https://github.com/khrotu/arc-community).

[^1]: Every source in the aggregated prompt dataset, containing 6,127 unique prompts.

| Source | Prompts |
| --- | --- |
| [swechat](https://huggingface.co/datasets/SALT-NLP/SWE-chat) | 3,735 |
| [tau2](https://github.com/sierra-research/tau2-bench) | 761 |
| [gpqa](https://huggingface.co/datasets/hendrydong/gpqa_main) / [gpqa_diamond](https://huggingface.co/datasets/hendrydong/gpqa_diamond) | 646 |
| [hle](https://huggingface.co/datasets/cais/hle) | 500 |
| [gdpval](https://huggingface.co/datasets/openai/gdpval) | 220 |
| [agenttrace](https://huggingface.co/datasets/trace-commons/agent-traces) | 167 |
| [tbench](https://github.com/harbor-framework/terminal-bench-2-1) | 89 |
| [scicode](https://huggingface.co/datasets/SciCode1/SciCode) | 80 |
| [critpt](https://huggingface.co/datasets/CritPt-Benchmark/CritPt) | 70 |
