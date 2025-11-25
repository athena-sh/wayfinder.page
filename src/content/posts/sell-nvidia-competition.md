---
title: "Sell NVIDIA Stock — The Competition Is Coming for Jensen's Throne"
published: 2025-11-25
description: "NVIDIA's 80% AI chip monopoly faces threats from AMD, hyperscaler custom silicon, and shifting workloads. History says it won't last."
image: arrow-trend-up.svg
hero: https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1764095404/wayfinder-images/fyqd66oqpux3olwnwwdv
tags: [Investing, AI]
category: Opinion
draft: false
---

_Athena Character @ openart.ai. NVIDIA and the NVIDIA logo are trademarks of NVIDIA Corporation. This article is independent and not affiliated with or endorsed by NVIDIA._

:::note

**Part 2 of the "Sell NVIDIA" Series.** If you haven't read [Part 1](/posts/sell-nvidia), start there for context on NVIDIA's valuation, the crypto mining parallel, and why the smart money is heading for the exits.

:::

> "In the technology industry, there is something called the innovator's dilemma. Companies get locked into their most successful products and fail to see new threats coming."
> — Clayton Christensen

## Why Chip Monopolies Never Last

_(Intel Dominated for 20 Years. Then It Didn't.)_

The bull case for NVIDIA's $4.4 trillion valuation rests on one foundational assumption: **that NVIDIA can maintain near-monopoly market share in AI accelerators indefinitely.**

History says otherwise. In fact, history says the opposite with violent certainty.

Let's talk about Intel.

### The Intel Precedent

In 2015, Intel controlled roughly 80% of the client and server CPU market.[^1] They had dominated for two decades. Their manufacturing process was years ahead of competitors. The "Intel Inside" sticker was synonymous with computing itself.

::linechart{title="Intel CPU Market Share Decline (2015-2024)" data="2015|80,2017|75,2019|70,2021|65,2023|62,2024|60"}

By 2024, that market share had plummeted to around 60%.[^1] In some segments—desktop CPUs, data center revenue—Intel no longer outsells AMD by 9:1. The ratio is closer to 2:1.[^2] In Q3 2024, AMD's data center division actually outearned Intel's for the first time ever: \$3.549 billion versus \$3.3 billion.[^2]

Between 2021 and 2024, Intel's revenue declined by more than 30%.[^1] That's not a correction. That's a structural collapse. (If you think rapid market cap losses only happen to smaller companies, check out how [Apple lost \$112 billion in two days](/posts/apple-stock-decline-iphone-launch) after a disappointing product launch—even tech giants aren't immune to investor sentiment shifts.)

What happened? AMD happened. ARM happened. Apple's decision to build its own silicon happened. Intel got complacent, missed manufacturing transitions, and competitors caught up.

The Communications of the ACM put it bluntly: "Intel's commitment to manufacture its own designs turned an Intel strength into a glaring disadvantage."[^3]

Here's the thing about monopolies: **they're not defended by being good. They're defended by being so far ahead that catching up is impossible.** The moment catching up becomes merely difficult instead of impossible, the lead starts eroding.

![Athena Character @ openart.ai](https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1764015258/wayfinder-images/ut7e9rc1vrzjnjv9bb93)

_Athena Character @ openart.ai_

### NVIDIA's Moat Is Real. But It's Not Forever.

NVIDIA bulls will correctly point out that NVIDIA's position is different from Intel's. And they're right—in some ways.

NVIDIA's CUDA ecosystem represents an 18-year head start in GPU software development.[^3] Millions of developers are trained in CUDA programming. PyTorch, TensorFlow, and every major AI framework are optimized first for CUDA. Libraries like cuDNN and cuBLAS have been refined through countless iterations. The ecosystem is genuinely impressive.

But CUDA isn't magic. It's a software moat—and software moats can be bridged.

AMD's ROCm software stack has narrowed the performance gap considerably. PyTorch now officially supports ROCm. AMD has funded development of ZLUDA, a drop-in CUDA compatibility layer that allows many CUDA applications to run on AMD hardware without modification.[^4] Microsoft is reportedly developing toolkits to convert CUDA models to run on AMD chips.[^5]

The CUDA lock-in is real, but it's weaker than the market believes. And every year, the alternatives get better.

### The Smart Money Isn't Just Reducing—It's Diversifying

Remember those institutional investors from Part 1 who are reducing their NVIDIA positions? They're not moving to cash. They're moving to alternatives.

Microsoft is deploying AMD Instinct MI300X accelerators to power Azure OpenAI Service workloads, achieving what it calls "leading price/performance" on GPT inference.[^6] Meta allocated 43% of its 2024 GPU shipments to AMD—173,000 MI300X units versus 224,000 from NVIDIA.[^7] Oracle is building out MI300X capacity for its cloud offerings.[^7]

The hyperscalers aren't stupid. They saw what happened when everyone became dependent on Intel for CPUs. They're not going to let NVIDIA achieve permanent lock-in without building alternatives.

## The Technical Case Against GPUs

_(1,000 Watts Per Chip Is Not Sustainable)_

NVIDIA's Blackwell GPU architecture is a marvel of engineering. It's also a monster that devours power.

The full-spec B200 AI GPU consumes up to 1,200 watts.[^8] That's a 71% increase from the 700W H100 that was already straining data center infrastructure. The GB200 NVL72 rack—NVIDIA's flagship product for training large models—draws approximately 120 kilowatts and requires liquid cooling.[^9]

Let me put that in perspective: a typical household uses about 1.2 kilowatts on average. A single NVIDIA rack consumes more power than 100 homes.

### The Power Wall

Data centers are not ready for this. According to a Deloitte survey of 120 US-based data center and power company executives, 72% consider power grid and capacity to be "very or extremely challenging" for AI infrastructure buildout.[^10]

Fewer than 5% of the world's data centers can support even 50kW per rack.[^11] Blackwell configurations require 60-120kW per rack. The infrastructure gap is enormous. And when infrastructure fails—as [AWS's 16-hour us-east-1 outage](/posts/aws-ai-outage) demonstrated—the cascading effects can cost hundreds of millions in losses across the entire cloud ecosystem.

Goldman Sachs Research forecasts global power demand from data centers will increase 165% by 2030.[^12] Grid connection requests in key regions like Virginia now face wait times of four to seven years.[^13] The AI buildout is running headlong into physical infrastructure constraints.

What does this mean for NVIDIA? It means there's a ceiling on how many Blackwell GPUs can actually be deployed, regardless of demand. And it creates massive pressure to develop more power-efficient alternatives.

### The Efficiency Arms Race

Google's new Ironwood TPU—their 7th generation custom AI chip—delivers 4,614 TFLOPs of peak performance while claiming twice the performance per watt of its predecessor.[^14] Each Ironwood pod consumes approximately 10 megawatts while delivering 42.5 exaFLOPS of compute.[^14]

Intel's Gaudi 3 accelerator costs roughly half the price of an NVIDIA H100 (\$15,625 vs \$30,678 per chip) and consumes 600W versus 700W.[^15] Intel claims 2.3x better performance-per-dollar for inference workloads.[^16]

::donut{title="AI Accelerator Power Consumption (Watts)" data="NVIDIA B200|1200|#FF6B6B,NVIDIA H100|700|#FFA500,Intel Gaudi 3|600|#0071C5,Google TPU v7|550|#4CAF50"}

These alternatives may not match NVIDIA's raw performance in every benchmark. But for many inference workloads—which account for a growing share of AI compute—they're "good enough" at significantly lower cost and power consumption.

![Athena Character @ openart.ai](https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1764015224/wayfinder-images/kvvzozmec5wtgr2vfnv0)

_Athena Character @ openart.ai_

### The Inference Shift

Here's the structural change that NVIDIA bulls are underestimating: the AI industry is shifting from training to inference.

Training is where NVIDIA dominates most completely. Training runs consume massive amounts of compute over days or weeks, and NVIDIA's hardware and software are optimized for exactly this use case.

But inference—actually running trained models to generate outputs—is becoming the dominant share of AI spending. Inference workloads will make up 75% of global AI compute demand by 2030.[^17] One analysis suggests the training-inference crossover will occur by 2027.[^18]

Inference is a fundamentally different workload. It's more latency-sensitive, more cost-sensitive, and more amenable to specialized hardware. Companies like Google, Amazon, and now Qualcomm are building chips specifically optimized for inference rather than training.

NVIDIA can compete in inference. But they'll face far more competition there than in training. And the customers who are panic-buying H100s and B200s for training today will be shopping for alternatives when it comes time to scale inference.

## The Competitive Landscape

_(AMD, Intel, Google, Amazon, Microsoft, Meta, and Now Qualcomm)_

Let's count the competitors actually shipping or developing AI accelerators:

| Competitor | Product | Memory | Key Advantage | 2024 Deployments |
|------------|---------|---------|---------------|------------------|
| **AMD** | Instinct MI300X | 192GB HBM3 | More memory than H100, Microsoft/Meta adoption | ~327,000 units |
| **Intel** | Gaudi 3 | 128GB HBM2e | Half the price of H100, better TCO | Dell/HPE/Lenovo systems |
| **Google** | Ironwood TPU v7 | 192GB HBM3e | 2x power efficiency, Anthropic partnership | Anthropic: 1M TPUs planned |
| **Amazon** | Trainium 2 | Custom | AWS integration, cost optimization | 900,000 Inferentia/Trainium |
| **Microsoft** | Maia 100 | Custom | Azure-optimized workloads | Early deployment |
| **Meta** | MTIA | Custom | Internal workloads, no NVIDIA margins | 1.5M+ chips deployed |
| **Qualcomm** | AI200/AI250 | TBA | Mobile efficiency expertise | 2026/2027 launch |

**AMD Instinct MI300X:** Already deployed at Microsoft Azure powering ChatGPT inference. 192GB of HBM3 memory with 5.3 TB/s bandwidth—more memory than NVIDIA's H100. AMD shipped approximately 327,000 MI300X units in 2024 across Microsoft, Meta, Oracle, and other customers.[^7] The MI325X (256GB HBM3e) shipped in Q4 2024, and the MI350 series with CDNA 4 architecture arrives in 2025, claiming up to 35x inference performance improvement.[^19]

**Intel Gaudi 3:** Priced at roughly half the cost of H100 with 128GB HBM2e memory. Intel claims 1.5x faster training than H100 on certain workloads and 2.3x better price/performance.[^15] Dell, HPE, Lenovo, and Supermicro all offer Gaudi 3 systems.

**Google Ironwood TPU:** The 7th generation TPU delivers 4.6 petaFLOPS of dense FP8 performance—slightly higher than NVIDIA's B200—with 192GB of HBM3e.[^14] Anthropic plans to use up to one million Ironwood TPUs to run Claude.[^14] Google's TPU ecosystem has been maturing for a decade.

**Amazon Trainium:** AWS's custom silicon for AI training. Amazon deployed approximately 900,000 Inferentia chips and is scaling Trainium 2 across its data centers.[^7] Anthropic is training models on half a million Trainium 2 chips.[^20]

**Microsoft Maia 100:** Microsoft's in-house AI accelerator, designed specifically for Azure workloads. Still early, but Microsoft is investing heavily.

**Meta MTIA:** Meta's Training and Inference Accelerator. Meta deployed over 1.5 million MTIA chips in 2024 for internal workloads.[^7]

**Qualcomm AI200/AI250:** The new entrant. Qualcomm announced these data center AI chips in October 2025, with the AI200 shipping in 2026 and AI250 in 2027. Their stock surged 11-20% on the news.[^21] Saudi Arabia's Humain signed up as the first major customer for 200 megawatts of capacity.[^21]

That's seven well-funded competitors with shipping or near-shipping products. Plus Broadcom, which is helping OpenAI develop custom ASICs starting in 2026.[^20]

### The Hyperscaler Insourcing Threat

The biggest risk to NVIDIA isn't AMD or Intel. It's NVIDIA's own customers building their own chips.

Google, Amazon, Meta, and Microsoft are all investing billions in custom silicon. They have the resources, the engineering talent, and—critically—the scale to justify the investment. A hyperscaler running millions of inference queries per day can amortize chip development costs across an enormous volume.

The logic is simple: why pay NVIDIA's 73% gross margins when you can build your own chips at cost?

Google has been on this path the longest—TPUs have been in development for a decade. But Amazon's Trainium program is catching up fast. And the deal between OpenAI and Broadcom signals that even the AI labs themselves are looking to reduce dependence on NVIDIA.

This isn't speculation. This is happening right now. Every hyperscaler is diversifying away from NVIDIA dependence because they've seen what single-vendor reliance did to them with Intel.

Want contrarian tech analysis that challenges Wall Street groupthink? [Subscribe for investment insights](https://wayfinder.page/subscribe) that follow the data, not the hype.

![SUBSCRIBE](https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1763257626/wayfinder-images/rspfquexlvlljwpdlh3p)

Part 3 drops soon with the valuation math Wall Street doesn't want you to see.

## The Architectural Risk

_(What Happens When AI Moves Beyond GPUs)_

The most underappreciated risk to NVIDIA isn't competition from other GPU vendors. It's the possibility that GPUs themselves become less central to AI workloads.

### The Rise of Smaller, Specialized Models

For the past three years, the AI industry has been obsessed with scaling. Bigger models. More parameters. More training compute. NVIDIA's GPUs were perfectly positioned for this arms race.

But the industry is shifting. Small language models (SLMs) are gaining traction for enterprise use cases. Anthropic's Claude Haiku 4.5 matches much of the accuracy of larger models while running twice as fast and costing one-third as much.[^22] IBM's Granite 4.0 "Nano" and "Tiny" models can run directly on local devices.[^22]

NVIDIA itself acknowledges that SLMs could perform 70-80% of enterprise AI tasks, with large-scale systems reserved for the most complex reasoning.[^22]

What does this mean? It means a growing share of AI workloads can run on cheaper, less power-hungry hardware. Edge devices. CPUs with integrated AI accelerators. Purpose-built inference chips like Google's TPUs or Amazon's Inferentia. (Meanwhile, the hype around "autonomous" AI agents continues despite [70% failure rates on real-world multi-step tasks](/posts/agent-hype-vs-reality)—suggesting the industry may be overestimating near-term AI capabilities while underestimating infrastructure requirements.)

The "bigger is better" era that drove NVIDIA's revenue explosion may be giving way to an efficiency era where power consumption and total cost of ownership matter more than raw FLOPS.

### The Power Crunch Favors Alternatives

Data center power consumption from AI is projected to reach 68 gigawatts globally by 2027—almost a doubling from 2022 levels.[^13] Individual AI training runs could require up to 8 gigawatts by 2030.[^13]

This is creating intense pressure to develop more power-efficient solutions. Every watt saved at the chip level translates to massive savings at the data center level—in power costs, cooling costs, and infrastructure costs.

NVIDIA's Blackwell chips are more efficient per operation than prior generations. But they're still power-hungry compared to purpose-built inference accelerators. Google claims Ironwood delivers 30x better power efficiency than its first Cloud TPU.[^14] Intel positions Gaudi 3 as a TCO leader partly because of its lower power consumption.[^15]

When the industry hits power constraints—and it's hitting them now—efficiency becomes more valuable than raw performance. NVIDIA's advantage in peak performance may become less relevant than competitors' advantages in performance-per-watt.

### The CUDA Moat Is Eroding

AMD's ROCm 7 software stack, expected soon, claims up to 3.5x better inference performance compared to ROCm 6. PyTorch officially supports ROCm. HIP (Heterogeneous-compute Interface for Portability) allows developers to write code that runs on both AMD and NVIDIA GPUs with minimal changes.[^4]

Microsoft is reportedly building toolkits to convert CUDA models to ROCm.[^5] OpenAI has added support for AMD Instinct accelerators in Triton 3.0.[^19] The open-source community is actively working on bridging the software gap.

CUDA's dominance isn't going to disappear overnight. But the "lock-in" is weaker than the market believes. And every year, the friction of switching decreases.

## The Uncomfortable Math

![Athena Character @ openart.ai](https://res.cloudinary.com/ddicetqs5/image/upload/c_fill,f_auto,fl_force_strip,q_auto:best/v1764096087/wayfinder-images/frnuywvvyw8vtxlnln4g)

Let me connect these threads:

**NVIDIA's 80-90% market share in AI training chips** is the foundation of its valuation. But:

1. **Monopolies in semiconductors never last.** Intel went from 80% to 60% in less than a decade. AMD's data center revenue now exceeds Intel's.

2. **Power constraints create demand for alternatives.** Blackwell chips consume 1,000-1,200W each. Most data centers can't handle this. Competitors offering better efficiency will win on TCO.

3. **The AI industry is shifting from training to inference.** NVIDIA's training dominance is less relevant when 75% of compute demand comes from inference workloads where competitors are more competitive.

4. **Every hyperscaler is building custom silicon.** Google, Amazon, Microsoft, and Meta are all investing billions in alternatives to NVIDIA. They're not doing this for fun.

5. **New competitors keep arriving.** Qualcomm just entered the market. OpenAI is working with Broadcom on custom chips. The competitive landscape is getting more crowded, not less.

6. **The CUDA software moat is eroding.** ROCm is improving. Microsoft is building conversion tools. Open-source alternatives are maturing. Lock-in decreases every year.

None of this means NVIDIA is going to zero. NVIDIA will remain a major player in AI hardware for years to come.

But it does mean that NVIDIA's current valuation—which assumes permanent near-monopoly market share and sustained 73% gross margins—is pricing in a future that history and current developments suggest is unlikely to materialize.

## What Comes Next

_(The outline for the rest of this analysis)_

In Part 3, I'll cover:

1. **The valuation math** — what the stock price actually implies about future growth and margins
2. **The gaming angle** — why the original use case can't support a $4 trillion valuation
3. **Counterarguments** — the best bull cases and why I'm still bearish
4. **What to do instead** — how to express an AI thesis without betting everything on one name

The core argument is already clear: **NVIDIA's valuation assumes the competitive dynamics of 2024 will persist indefinitely. But the competitive landscape in 2026 will look nothing like 2024.**

You can own a great company at the wrong price. And $4.4 trillion is the wrong price for a semiconductor company facing seven major competitors and a structural shift in workload composition.

:::tip

**Want the rest of this analysis? Smash that subscribe button at [wayfinder.page/subscribe](https://wayfinder.page/subscribe) to stay in the know when Part 3 drops.**

:::

## Am I Wrong? Let's Argue.

I know what you're thinking. "But NVIDIA's moat is impenetrable! Jensen Huang is a genius! The CUDA ecosystem is unbeatable!"

Here's what I want to know:

**Am I being too bearish?** Is there something I'm missing about NVIDIA's competitive position that makes this time actually different from Intel's collapse?

**Which competitor eats NVIDIA's lunch first?** AMD with their growing hyperscaler adoption? Google with a decade of TPU development? Or the dark horse—custom silicon from Meta and Microsoft?

**What's your NVIDIA thesis?** Are you holding, buying more, or heading for the exits? And more importantly—why? I want data, not hopium.

**For the true believers:** What would it take for you to change your mind? What metric, what competitive development, what price point makes you reconsider?

Drop your takes in the comments. Best counterarguments get featured in Part 3.

## FAQ: NVIDIA

### Q: Doesn't NVIDIA's software ecosystem make switching costs prohibitive?

A: Switching costs are real but declining. AMD's ROCm now officially supports PyTorch. Microsoft is reportedly building CUDA-to-ROCm conversion tools.[^5] AMD has funded ZLUDA, a drop-in CUDA compatibility layer.[^4] The friction of switching decreases every year. And for new workloads, customers increasingly evaluate total cost of ownership rather than defaulting to NVIDIA.

### Q: What about NVIDIA's lead in training? Isn't that where the money is?

A: Training is where NVIDIA dominates most completely today. But inference workloads are growing faster and will represent 75% of AI compute demand by 2030.[^17] Inference is more price-sensitive and more amenable to specialized hardware. NVIDIA faces stiffer competition in inference than in training.

### Q: Don't hyperscalers still need NVIDIA alongside their custom chips?

A: Yes—for now. Google uses both TPUs and NVIDIA GPUs. Amazon uses both Trainium and NVIDIA. But the mix is shifting. Every custom chip deployed is one fewer NVIDIA GPU purchased. And as custom silicon matures, the mix will shift further away from NVIDIA.

### Q: What about Blackwell's performance leadership?

A: Blackwell is genuinely impressive. But it also consumes 1,200W per chip.[^8] Fewer than 5% of data centers can handle Blackwell power densities.[^11] Performance leadership matters less when you can't actually deploy the hardware due to infrastructure constraints.

### Q: Isn't Qualcomm too late to the market?

A: Qualcomm's AI200 doesn't ship until 2026. They're late. But they're not entering a stable market—they're entering a market that's still being defined. Their mobile chip expertise in power efficiency could translate well to inference workloads where TCO matters. And they already have a major customer (Humain) signed up for 200MW of capacity.[^21]

:::note

**Take away this:** NVIDIA's \$4.4T valuation prices in a monopoly that history says won't last. Seven major competitors are shipping alternatives, hyperscalers are building custom silicon, and the AI workload mix is shifting from training (where NVIDIA dominates) to inference (where competition thrives). You can own a great company at the wrong price—and this is the wrong price.

:::

[^1]: [Communications Today: Intel's CPU market share drops to 60% in 2024](https://www.communicationstoday.co.in/intels-cpu-market-share-drops-to-60-in-2024/)
[^2]: [Tom's Hardware: AMD's desktop PC market share hits a new high](https://www.tomshardware.com/pc-components/cpus/amds-desktop-pc-market-share-skyrockets-amid-intels-raptor-lake-crashing-scandal-amd-makes-biggest-leap-in-recent-history)
[^3]: [Communications of the ACM: Intel's Fall from Grace](https://cacm.acm.org/opinion/intels-fall-from-grace/)
[^4]: [Phoronix: AMD Quietly Funded A Drop-In CUDA Implementation Built On ROCm](https://www.phoronix.com/review/radeon-cuda-zluda)
[^5]: [WinBuzzer: Microsoft Apparently Wants to "Break" Nvidia's Moat](https://winbuzzer.com/2025/11/11/microsoft-apparently-wants-to-break-nvidias-moat-making-cuda-available-to-amd-ai-chips-xcxwbn/)
[^6]: [AMD Investor Relations: MI300X Accelerators Power Microsoft Azure OpenAI Service](https://ir.amd.com/news-events/press-releases/detail/1198/amd-instinct-mi300x-accelerators-power-microsoft-azure)
[^7]: [The Register: AMD Instinct, cloudy silicon vie for a slice of Nvidia's pie](https://www.theregister.com/2024/12/23/nvidia_ai_hardware_competition/)
[^8]: [TweakTown: NVIDIA's full-spec Blackwell B200 AI GPU uses 1200W of power](https://www.tweaktown.com/news/97059/nvidias-full-spec-blackwell-b200-ai-gpu-uses-1200w-of-power-up-from-700w-on-hopper-h100/index.html)
[^9]: [Introl: NVIDIA GB300 NVL72 Deployment Guide](https://introl.com/blog/why-nvidia-gb300-nvl72-blackwell-ultra-matters)
[^10]: [Deloitte: Can US infrastructure keep up with the AI economy?](https://www.deloitte.com/us/en/insights/industry/power-and-utilities/data-center-infrastructure-artificial-intelligence.html)
[^11]: [Navitas: NVIDIA's Grace Hopper Runs at 700W, Blackwell Will Be 1 KW](https://navitassemi.com/nvidias-grace-hopper-runs-at-700-w-blackwell-will-be-1-kw-how-is-the-power-supply-industry-enabling-data-centers-to-run-these-advanced-ai-processors/)
[^12]: [Goldman Sachs: AI to drive 165% increase in data center power demand by 2030](https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030)
[^13]: [RAND: AI's Power Requirements Under Exponential Growth](https://www.rand.org/pubs/research_reports/RRA3572-1.html)
[^14]: [The Register: TPU v7, Google's answer to Nvidia's Blackwell is nearly here](https://www.theregister.com/2025/11/06/googles_ironwood_tpus_ai/)
[^15]: [Tom's Hardware: Intel launches Gaudi 3 accelerator for AI](https://www.tomshardware.com/tech-industry/artificial-intelligence/intel-launches-gaudi-3-accelerator-for-ai-slower-than-h100-but-also-cheaper)
[^16]: [Jon Peddie Research: Intel GPU-esque Gaudi 3 to compete with H100/H200 GPUs on price](https://www.jonpeddie.com/news/intel-gpu-esque-gaudi-3-to-compete-with-h100-h200-gpus-on-price/)
[^17]: [PYMNTS: Small Models, Big Shift: How AI Is Moving Beyond Model Size](https://www.pymnts.com/artificial-intelligence-2/2025/small-models-big-shift-how-ai-is-moving-beyond-model-size/)
[^18]: [Medium: Measuring the Shift: How We Know Inference Is Overtaking Training](https://medium.com/@tfhbcpcy/measuring-the-shift-how-we-know-inference-is-overtaking-training-28ad40e320f1)
[^19]: [AMD Newsroom: AMD Accelerates Pace of Data Center AI Innovation](https://www.amd.com/en/newsroom/press-releases/2024-6-2-amd-accelerates-pace-of-data-center-ai-innovation-.html)
[^20]: [CNBC: Nvidia sales are 'off the charts,' but Google, Amazon and others now make their own custom AI chips](https://www.cnbc.com/2025/11/21/nvidia-gpus-google-tpus-aws-trainium-comparing-the-top-ai-chips.html)
[^21]: [CNBC: Qualcomm announces AI chips to compete with AMD and Nvidia — stock soars 11%](https://www.cnbc.com/2025/10/27/qualcomm-ai200-ai250-ai-chips-nvidia-amd.html)
[^22]: [PYMNTS: Small Models, Big Shift: How AI Is Moving Beyond Model Size](https://www.pymnts.com/artificial-intelligence-2/2025/small-models-big-shift-how-ai-is-moving-beyond-model-size/)