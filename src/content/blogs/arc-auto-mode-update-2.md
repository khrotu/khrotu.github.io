---
title: 'Arc: Auto Mode Update 2'
date: '2026-10-08'
slug: arc-auto-mode-update-2
---

Auto mode now trains on nearly 78,000 prompts, with a much larger share drawn from real conversations.

In our internal tests, the new version matches the strong tier's quality at the highest quality setting while routing nearly a third of prompts to less capable models. The routing model still runs on your device in under half a millisecond.

## Highlights

### Trained on more of what you ask

The expanded dataset includes around 20,000 real developer prompts and 23,000 real user chats, alongside recent TypeScript and JavaScript repository tasks and freelance coding jobs with real payouts[^1]. Short, everyday prompts now outnumber long benchmark tasks.

Auto mode also identifies six task types: code, math, reasoning, agentic, general, and extraction. Each prompt gets its own task label, rather than inheriting one from its source dataset.

### More control over cost and quality

The quality setting now produces a consistent progression across the routing system. Lower it, and more work goes to cheaper models. Raise it, and measured quality improves, coming within a few points of the best model choice for each prompt in our tests.

Auto mode is still in beta. Its training labels come from a model, not ground truth, and that model has its own biases. The cheapest tier is also rarely selected: the training data contains relatively few genuinely trivial prompts.

## Methodology

### New labels

The previous version learned from a few thousand prompts graded by an LLM judge. That approach had limits. The judge favored its own answers, the prompts covered a narrow range of usage, and the classifier was partly learning benchmark writing styles rather than task difficulty.

For this version, we replaced the grades with labels from [Perplexity's open decision model](https://huggingface.co/perplexity-ai/pplx-decider-v1.1-27b). It evaluates three questions for each prompt: what kind of task is it, does it need a frontier model, and how capable must a model be to answer it correctly?

This removes the previous step in which a judge graded candidate answers, including its own. It doesn't eliminate model bias, but it gives us probability-based labels for each prompt without relying on those answer grades.

### The same lightweight classifier

The routing model keeps the same architecture: TF-IDF word-pair features, a logistic head, and probabilities averaged across five folds.

Its difficulty target is P(weak suffices): the probability that a less capable model can handle the prompt. Training weights reflect the teacher's confidence, giving uncertain labels little influence.

Calibration uses a piecewise fit to set required-model thresholds for each difficulty bin without overshooting. This keeps a tier eligible when its measured performance meets your quality setting.

### Results

In internal testing, AUC on held-out prompts increased from 0.774 to 0.883, with scores of 0.82 to 0.93 across the six task types. Task-type accuracy reached 82.4%.

[^1]: Every source in the new 71,676-prompt pool, plus the original 6,268 retained prompts.

| Source | Prompts | What it is |
| --- | --- | --- |
| [WildChat](https://huggingface.co/datasets/allenai/WildChat-1M) | 22,598 | Real user chats, non-toxic English first turns |
| [DevGPT](https://github.com/NAIST-SE/DevGPT) | 20,284 | Real developer prompts linked to issues and PRs |
| [OpenAssistant](https://huggingface.co/datasets/OpenAssistant/oasst1) | 14,430 | Human-written assistant prompts |
| [SWE-chat](https://huggingface.co/datasets/SALT-NLP/SWE-chat) | 6,771 | Real agentic coding sessions, stratified by intent |
| [SWE-Gym](https://huggingface.co/datasets/SWE-Gym/SWE-Gym) | 2,365 | Real GitHub issues |
| [SWE-PolyBench](https://huggingface.co/datasets/AmazonScience/SWE-PolyBench) | 2,067 | Repo tasks, mostly TypeScript and JavaScript |
| [SWE-bench-Live](https://huggingface.co/datasets/SWE-bench-Live/SWE-bench-Live) + [MultiLang](https://huggingface.co/datasets/SWE-bench-Live/MultiLang) | 2,042 | Post-cutoff issues, contamination-safe |
| [R2E-Gym](https://huggingface.co/datasets/R2E-Gym/R2E-Gym-Subset) | 573 | Execution-grounded repo tasks |
| [SWE-Lancer](https://github.com/EchoverseCorp/swelancer-benchmark) | 557 | Freelance coding jobs with real payouts |
