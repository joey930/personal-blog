import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vbckoho0', dataset: 'production',
  apiVersion: '2024-01-01', useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

const k = (text) => ({ _type: 'block', _key: Math.random().toString(36).slice(2), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text }] })
const h2 = (text) => ({ ...k(text), style: 'h2' })

// ── BATCH 1: Faith posts ─────────────────────────────────────────────────────

const posts = [
  {
    id: 'EyALIez9Ug6PSJt2Ro6tGz',
    body_en: [
      k(`There is a ritual I have kept for six years, across three companies, two countries, and more difficult rooms than I care to count. In the ninety seconds before any meeting that matters — a board presentation, a difficult negotiation, a conversation in which I might have to deliver news that will change someone's life — I close my laptop, set down my phone, and sit with my eyes closed. Thirty seconds. Sometimes a minute. Whatever I can afford.`),
      k(`My team assumes I am composing my thoughts. I am, though not in any way a productivity consultant would recognize. I am praying — not performing the act of prayer as a kind of psychological preparation technique, not doing a dressed-up version of box breathing — but actually attempting to make contact with something larger than the meeting I am about to walk into. This distinction matters to me, even if it is invisible to anyone watching.`),
      k(`I did not arrive at this practice through spiritual discipline. I arrived at it through desperation, during a period in 2020 when our pharmaceutical distribution business in Korea had lost thirty percent of its revenue in eight weeks as the pandemic reshaped supply chains, and I was flying to Seoul to meet with our three largest creditors simultaneously. I had nothing to offer them except candor. I had prayed before that meeting not because I believed prayer would change the outcome, but because I had exhausted every alternative form of preparation and still felt completely unready.`),
      h2(`What prayer does that preparation cannot`),
      k(`The meeting in Seoul went better than I had any right to expect, not because of divine intervention in any legible sense, but because something about the thirty seconds before I walked in had shifted the quality of my attention. I was less defended. I had, in some small way, acknowledged that the result was not entirely mine to control — that the men across the table from me had their own fears and pressures and calculations, and that my job was to be honest with them rather than to manage them.`),
      k(`Business runs on narrative management. We walk into rooms carrying carefully constructed stories about our companies and our competence and our futures, and we spend the meeting protecting those stories from contamination by contrary data. This is exhausting and it is frequently counterproductive. The investors who eventually funded us through that difficult period did not fund us because our story held up. They funded us because they could see that we were telling them the truth about what was happening, which is a much rarer commodity than a tight pitch deck.`),
      k(`Prayer, for me, is the practice of setting the story down before the meeting starts. Of walking in with the genuine intention to be present to what actually happens rather than what I have predicted will happen. The Jesuit tradition calls this "indifference" — not passivity or lack of care, but the capacity to receive whatever comes without having pre-decided what it means. I do not manage to this standard consistently. The thirty seconds before the meeting is a reminder to try.`),
      h2(`The empirical case, for those who need one`),
      k(`I am aware that some readers will find the preceding paragraphs unconvincing on theological grounds and would prefer a secular account of why this practice is worth considering. Here is one. Research on what psychologists call "ego depletion" suggests that the self-regulatory resources we use to manage our performance in high-stakes interactions are finite and consumable. The more energy we spend projecting confidence, managing impressions, and suppressing responses we judge to be inappropriate, the less capacity we have for the actual cognitive work of the meeting — listening carefully, processing what we hear, generating creative responses to unexpected information.`),
      k(`Prayer, or any practice that genuinely releases the performer's preoccupation with performance, may reduce the ego-depletion load before high-stakes interactions. The effect is real regardless of the theological framework you use to explain it. Meditators who sit before difficult conversations, athletes who enter "the zone" before competition, therapists who "bracket" their personal concerns before seeing a client — all are doing something functionally similar to what I am doing in those thirty seconds. I happen to use the frame of prayer because it is the frame that is honest about what I am actually doing, which is acknowledging the limits of my own agency and asking for help from something that might know better than I do.`),
      k(`The investor who passed on us twice and then led our next round told me, on the call when he said yes, that what had changed was not our numbers, which had not improved materially. What had changed was that he had the sense, in our last meeting, that I was not trying to sell him anything. He did not know what to make of that, but he trusted it. I did not tell him about the thirty seconds.`),
      h2(`Six years of evidence`),
      k(`I have now kept this practice through everything that has happened to the businesses under the 한아원 umbrella — through growth periods when hubris would have been the easier posture, through the period in 2022 when we were running four businesses simultaneously and I was averaging five hours of sleep, through board conflicts and key-person departures and a lawsuit that consumed eighteen months and a sum of money I prefer not to remember.`),
      k(`What I can say is that the practice has made me, meeting by meeting, marginally less likely to do the thing I most regret in business interactions: to perform rather than to communicate. The performance impulse is strong and professionally rewarded in the short term. It is, over a career, corrosive — to relationships, to one's own judgment, and to the kind of organizational culture that can actually sustain a business through difficult periods.`),
      k(`The meetings I am most proud of, looking back, are almost never the ones where I performed well. They are the ones where I told the truth about something difficult, heard something I did not want to hear and actually processed it, or admitted uncertainty in a room where certainty was expected. None of these things come naturally to me. All of them are, I think, made slightly more accessible by the practice of thirty seconds of genuine prayer before I walk through the door.`),
      k(`I am not recommending this to anyone as a business strategy. I am describing it as a personal practice and leaving the reader to assess its relevance to their own situation. But I will say this: the thirty seconds costs nothing, requires no subscription, and has never once made a meeting worse. In six years and more meetings than I can count, that is a more consistent track record than almost anything else I have tried.`),
    ],
    body_ko: [
      k(`나는 6년 동안, 세 개의 회사에 걸쳐, 두 나라에서, 수많은 어려운 자리에서 하나의 습관을 지켜왔다. 중요한 모든 회의 — 이사회 발표, 어려운 협상, 누군가의 인생을 바꿀 소식을 전해야 할 수도 있는 대화 — 90초 전에 나는 노트북을 닫고, 핸드폰을 내려놓고, 눈을 감고 앉는다. 30초. 때로는 1분. 여유가 허락하는 만큼.`),
      k(`팀원들은 내가 생각을 정리한다고 생각한다. 실제로 그렇긴 하지만, 생산성 컨설턴트가 인식할 방식은 아니다. 나는 기도하고 있다 — 심리적 준비 기술로서 기도를 수행하거나, 복식호흡의 고급 버전을 하는 것이 아니라 — 막 들어갈 회의보다 더 큰 무언가와 진짜로 접촉하려는 시도를 하고 있다. 이 구별이 나에게는 중요하다, 지켜보는 사람 눈에 보이지 않더라도.`),
      k(`이 습관에 영적인 훈련을 통해 도달한 것이 아니다. 절박함을 통해 도달했다. 2020년, 팬데믹이 공급망을 재편하면서 8주 만에 한국 의약품 유통 사업 매출의 30%를 잃었고, 나는 세 명의 주요 채권자를 동시에 만나기 위해 서울로 가는 비행기를 타고 있었다. 그들에게 줄 수 있는 것은 솔직함뿐이었다. 기도가 결과를 바꿀 거라 믿어서가 아니라, 다른 모든 준비 형태를 소진하고도 여전히 완전히 준비가 안 된 느낌이었기 때문에 기도했다.`),
      h2(`기도가 준비로 할 수 없는 것`),
      k(`서울에서의 회의는 내가 기대할 권리가 있었던 것보다 잘 진행됐다. 눈에 보이는 신의 개입 때문이 아니라, 걸어 들어가기 전 30초가 내 주의의 질을 변화시켰기 때문이다. 나는 덜 방어적이었다. 어떤 작은 의미에서, 결과가 전적으로 나의 통제 안에 있지 않다는 것을 인정했다 — 테이블 맞은편에 있는 사람들도 그들만의 두려움과 압박과 계산이 있다는 것을, 내 역할은 그들을 관리하는 것이 아니라 솔직한 것이라는 것을.`),
      k(`비즈니스는 서사 관리로 운영된다. 우리는 회사와 역량과 미래에 대해 신중하게 구성된 이야기들을 들고 방에 들어가고, 회의 내내 그 이야기들을 반대 데이터의 오염으로부터 보호하는 데 시간을 쓴다. 이것은 지치는 일이고 종종 역효과를 낸다. 그 어려운 시기를 통해 우리에게 투자한 투자자들은 우리 이야기가 유지됐기 때문에 투자한 것이 아니었다. 우리가 실제로 일어나고 있는 일에 대해 진실을 말하고 있음을 볼 수 있었기 때문이었다.`),
      k(`기도는 내게 회의 시작 전에 이야기를 내려놓는 실천이다. 예측한 것이 아니라 실제로 일어나는 것에 현존하려는 진정한 의도를 가지고 들어가는 것. 예수회 전통은 이것을 "무집착"이라고 부른다 — 수동성이나 무관심이 아니라, 그것이 의미하는 바를 미리 결정하지 않고 무엇이든 받아들이는 능력. 나는 이 기준을 일관되게 달성하지 못한다. 회의 전 30초는 시도하라는 상기다.`),
      h2(`그것이 필요한 사람들을 위한 실증적 근거`),
      k(`일부 독자들은 신학적 근거에서 앞의 단락들이 설득력이 없다고 느낄 것이다. 세속적인 설명을 원한다면 이것이다. 심리학자들이 "자아 고갈"이라고 부르는 것에 관한 연구는 고위험 상호작용에서 우리의 수행을 관리하기 위해 사용하는 자기 조절 자원이 유한하고 소모 가능하다고 제안한다. 자신감을 투영하고, 인상을 관리하고, 부적절하다고 판단하는 반응을 억제하는 데 더 많은 에너지를 쓸수록, 실제 인지 작업 — 주의 깊게 듣기, 들은 것 처리하기, 예상치 못한 정보에 창의적으로 반응하기 — 에 대한 용량이 줄어든다.`),
      k(`기도, 또는 수행자의 수행에 대한 집착을 진정으로 해소하는 모든 실천은, 고위험 상호작용 전의 자아 고갈 부하를 줄일 수 있다. 어떤 신학적 프레임워크를 사용하든 효과는 실재한다. 어려운 대화 전에 앉는 명상가들, 경쟁 전에 "존"에 들어가는 운동선수들, 내담자를 만나기 전에 개인적 우려를 "괄호로 묶는" 치료사들 — 모두 내가 그 30초에 하는 것과 기능적으로 유사한 무언가를 하고 있다.`),
      h2(`6년의 증거`),
      k(`나는 이제 한아원 산하 사업들에 일어난 모든 것을 통해 이 실천을 유지해왔다 — 오만이 더 쉬운 태도였을 성장기를 통해, 2022년 네 개의 사업을 동시에 운영하며 평균 5시간 수면을 취하던 시기를 통해, 이사회 갈등과 핵심 인물 이탈, 18개월을 소모하고 기억하고 싶지 않은 금액의 소송을 통해.`),
      k(`말할 수 있는 것은, 이 실천이 회의마다 나를 비즈니스 상호작용에서 가장 후회하는 일을 할 가능성을 조금 낮춰줬다는 것이다: 소통 대신 공연하는 것. 공연 충동은 강하고 단기적으로는 직업적으로 보상받는다. 그러나 커리어에 걸쳐 그것은 관계에, 자신의 판단에, 그리고 실제로 어려운 시기를 통해 사업을 지탱할 수 있는 조직 문화에 부식성이다.`),
      k(`돌아보면, 내가 가장 자랑스러운 회의들은 거의 내가 잘 수행한 것들이 아니다. 어려운 무언가에 대해 진실을 말한 것들, 듣고 싶지 않은 것을 듣고 실제로 처리한 것들, 확실성이 기대되는 방에서 불확실성을 인정한 것들이다. 이것들 중 어느 것도 내게 자연스럽게 오지 않는다. 모두, 내 생각에는, 문 앞에 걸어 들어가기 전 진정한 기도 30초의 실천으로 조금 더 접근 가능해진다.`),
    ],
  },

  {
    id: 'kHQQtMLNbIJHgj7z87WHDO',
    body_en: [
      k(`In the spring of 2019, I hired a management consultant to help me understand why I was making poor decisions. Not the decisions themselves — I could see those. I wanted to understand the mechanism. She spent two days interviewing me and the people around me, reviewed my calendar for three months, and came back with a finding I had not expected: I was not making poor decisions because of bad information or flawed analysis. I was making them because I was exhausted, and I had been exhausted continuously for approximately four years.`),
      k(`The calendar she reviewed showed, with the clarity that only outside eyes can provide, that I had not taken a full day off in eleven months. Not a vacation, not even a Saturday uncontaminated by email. I was working, in some form, every day. I told her this was what building a business required, which is the thing you tell yourself when you have confused the symptoms of overwork with the requirements of the task.`),
      k(`What changed, that spring, was that I began keeping Sabbath. Not for religious reasons initially — I had let that part of my faith become theoretical — but because the consultant had framed it as a performance intervention, and I was desperate enough to try it. The results were so immediate and so pronounced that within six weeks I was doing it for theological reasons too, having rediscovered something my faith tradition had been telling me all along and that I had been too busy to hear.`),
      h2(`The economics of deliberate rest`),
      k(`Cortisol, the primary stress hormone, follows a predictable diurnal rhythm in healthy human beings. It peaks within thirty minutes of waking — the cortisol awakening response — and then declines through the day, reaching its nadir in the evening. This rhythm is not a quirk of physiology; it is the architecture of effective cognition. The morning peak exists to mobilize us for the challenges of the day. The evening trough exists to allow consolidation, recovery, and the unconscious processing that transforms experience into learning.`),
      k(`Chronic overwork disrupts this rhythm in ways that are well-documented and largely irreversible in the short term. The cortisol baseline rises. The peaks flatten. The recovery window that sleep is supposed to provide becomes insufficient because the system never fully down-regulates. The result, after months, is the cognitive profile I presented to that consultant: the inability to distinguish between urgent and important, the tendency toward reactive rather than generative thinking, the progressive narrowing of perspective that prevents seeing around corners.`),
      k(`The research on this is not new or obscure. What is remarkable is how thoroughly the startup and entrepreneurial culture I inhabited had built an immunity to it. The stories we tell about great founders celebrate their sleeplessness as evidence of commitment rather than as a warning sign. Elon Musk's sleeping on the factory floor, the thirty-six-hour coding marathons of the early Facebook years — these are presented as virtues rather than as data points in a story about the costs of unsustainable work.`),
      k(`What the Sabbath provides, in its traditional form, is a structural intervention against this tendency that does not rely on willpower or personal discipline. You do not observe Sabbath when you feel like it. You observe it because the week has a structure, and that structure includes a day when the ordinary mechanisms of production and achievement are suspended. The day is not contingent on having earned it, or on the business being in a stable enough condition to afford it. It comes regardless, which is the whole point.`),
      h2(`What rest actually means — and what it does not`),
      k(`The most important thing I learned in the first year of keeping Sabbath was the difference between leisure and rest. These are not the same thing, and conflating them is probably the most common reason people find that their "days off" do not actually restore them.`),
      k(`Leisure is the consumption of entertainment. It is watching a series on Netflix, scrolling a social media feed, playing a video game, going to a restaurant. None of these things are bad; they are the appropriate texture of human life in small quantities. But they do not produce rest, because they all share the property of being stimulating — they direct attention outward toward external content, they produce emotional responses that require regulation, they maintain the basic cognitive posture of consumption that is not so different from the posture of work.`),
      k(`Rest, in the Sabbath sense, means the suspension of performance and the cessation of production — including the subtle forms of production that we do not recognize as such. Checking email is obvious. Less obvious: mental rehearsal of tomorrow's agenda, the low-grade planning and problem-solving that continues in the background of "leisure" activities, the monitoring of work communications even when not actively responding. All of these maintain the autonomic state of alert readiness that the week requires and that the day of rest is supposed to interrupt.`),
      k(`What I do on Sabbath — and I am still imperfect at this, which is itself a kind of data — includes a long walk without a destination, reading something completely unrelated to business or strategy, cooking a slow meal, and sitting in my church, which does something for me that I cannot fully articulate in secular language but that reliably produces, by Sunday evening, a clarity and equanimity that I could not manufacture by any other means I have found.`),
      h2(`The business case, for those who need it`),
      k(`In the three years since I began keeping Sabbath consistently, the 한아원 businesses have grown from approximately 1.8 billion won monthly to 3.49 billion. I am not making the causal claim that rest caused this outcome. I am making the observation that the rest did not prevent it, and that in my experience of those years, the quality of the decisions made during the six working days was meaningfully higher than in the years when I worked all seven.`),
      k(`The specific improvements I can point to are the kind that do not show up cleanly in financial reports. I became better at distinguishing between fires that required immediate response and fires that would go out on their own if left alone — a distinction that sounds obvious and that, in practice, under conditions of chronic depletion, is surprisingly difficult to make. I became better at hiring, because I had recovered enough perspective to evaluate candidates against the actual requirements of roles rather than against my own current state of overwhelm. I became better at letting go of things that were not mine to control.`),
      k(`The Sabbath tradition, in its deepest form, is not about productivity or even about rest as I have described it. It is a weekly acknowledgment that the world does not depend on your management of it — that the grain will grow, the transactions will clear, the problems will take their own shape, regardless of whether you spend the seventh day trying to influence them. This acknowledgment is, for a founder, genuinely radical. It is also, I have found, genuinely true, and sitting with its truth for one day a week has made me, across the other six days, a more useful and more clearheaded steward of the things I have actually been given to tend.`),
    ],
    body_ko: [
      k(`2019년 봄, 나는 왜 내가 나쁜 결정을 내리는지 이해하기 위해 경영 컨설턴트를 고용했다. 결정 자체가 아니라 — 그것들은 볼 수 있었다. 메커니즘을 이해하고 싶었다. 그녀는 이틀 동안 나와 내 주변 사람들을 인터뷰하고, 3개월간의 달력을 검토한 후, 예상치 못한 결론을 가져왔다: 나는 나쁜 정보나 결함 있는 분석 때문에 나쁜 결정을 내리는 것이 아니었다. 지쳐 있었기 때문이었고, 약 4년간 지속적으로 지쳐 있었다.`),
      k(`그녀가 검토한 달력은 외부의 눈만이 제공할 수 있는 명료함으로, 내가 11개월 동안 온전한 하루도 쉬지 않았음을 보여줬다. 휴가는 물론이고, 이메일로 오염되지 않은 토요일조차 없었다. 어떤 형태로든 매일 일하고 있었다. 나는 그것이 사업을 구축하는 데 필요한 것이라고 말했다 — 과로의 증상을 과업의 요구사항으로 혼동했을 때 자신에게 하는 말이다.`),
      k(`그 봄에 달라진 것은 안식일을 지키기 시작했다는 것이다. 처음에는 종교적 이유에서가 아니라 — 신앙의 그 부분을 이론적으로 놔두었기 때문에 — 컨설턴트가 그것을 수행 개입으로 프레이밍했고, 나는 절박하여 시도할 의향이 있었기 때문이다. 결과가 너무 즉각적이고 두드러져서 6주 안에 신학적 이유로도 하게 됐다.`),
      h2(`의도적 휴식의 경제학`),
      k(`코르티솔은 건강한 인간에서 예측 가능한 일주기 리듬을 따른다. 기상 후 30분 내에 최고조에 달하고 — 코르티솔 각성 반응 — 하루 동안 감소하여 저녁에 최저점에 도달한다. 이 리듬은 생리학의 변덕이 아니다; 효과적인 인지의 구조다. 아침 최고조는 하루의 도전을 위해 우리를 동원하기 위해 존재한다. 저녁 최저점은 경험을 학습으로 변환하는 통합, 회복, 무의식적 처리를 허용하기 위해 존재한다.`),
      k(`만성적 과로는 잘 문서화된 방식으로 이 리듬을 교란시킨다. 코르티솔 기준선이 상승한다. 최고점이 평탄해진다. 수면이 제공해야 하는 회복 창이 시스템이 완전히 하향 조절되지 않기 때문에 불충분해진다. 결과는, 수개월 후, 내가 그 컨설턴트에게 제시한 인지 프로파일이다: 긴급한 것과 중요한 것을 구별하는 무능력, 생성적 사고 대신 반응적 사고 경향.`),
      h2(`실제로 휴식이 의미하는 것 — 그리고 의미하지 않는 것`),
      k(`안식일을 지킨 첫 해에 배운 가장 중요한 것은 여가와 휴식의 차이였다. 이것들은 같은 것이 아니고, 이것들을 혼동하는 것이 사람들이 "쉬는 날"이 실제로 회복시키지 않는다고 느끼는 가장 일반적인 이유다.`),
      k(`여가는 오락의 소비다. 넷플릭스 시리즈 보기, 소셜 미디어 피드 스크롤링, 비디오 게임, 식당 가기. 이것들 중 어느 것도 나쁘지 않다. 하지만 자극적이라는 속성을 공유하기 때문에 — 주의를 외부 콘텐츠로 향하게 하고, 조절이 필요한 감정적 반응을 생성하고, 일의 자세와 크게 다르지 않은 소비의 기본적 인지 자세를 유지한다 — 휴식을 만들어내지 않는다.`),
      k(`안식일 의미에서 휴식은 수행과 생산의 중단을 의미한다 — 우리가 그렇게 인식하지 않는 미묘한 형태의 생산 포함. 이메일 확인은 명백하다. 덜 명백한 것: 내일 안건의 정신적 리허설, "여가" 활동의 배경에서 계속되는 낮은 수준의 계획과 문제 해결.`),
      h2(`그것이 필요한 사람들을 위한 비즈니스 케이스`),
      k(`안식일을 일관되게 지키기 시작한 이후 3년 동안, 한아원 사업들은 월 약 18억 원에서 34.9억 원으로 성장했다. 휴식이 이 결과를 야기했다는 인과적 주장을 하는 것이 아니다. 휴식이 그것을 막지 않았다는 관찰을 하는 것이다. 그리고 내 경험상, 6일의 업무 동안 내려진 결정의 질이 7일 모두 일했던 해보다 의미 있게 높았다.`),
      k(`가장 깊은 형태에서 안식일 전통은 생산성이나 내가 설명한 것으로서의 휴식에 관한 것이 아니다. 당신이 그것을 관리하는 데 7번째 날을 보내든 보내지 않든 문제와 거래는 자신만의 형태를 취할 것이라는 — 세상이 당신의 관리에 의존하지 않는다는 주간의 인정이다. 이 인정은 창업자에게 진정으로 급진적이다. 또한, 내가 발견했듯이, 진정으로 사실이다.`),
    ],
  },
]

async function run() {
  for (const post of posts) {
    try {
      await client.patch(post.id).set({ body_en: post.body_en, body_ko: post.body_ko }).commit()
      console.log(`✓ Updated: ${post.id}`)
    } catch (err) {
      console.error(`✗ ${post.id}: ${err.message}`)
    }
  }
  console.log('Batch 1 done.')
}

run().catch(console.error)
