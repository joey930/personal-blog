import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'vbckoho0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

const CAT = {
  faith:    { _type: 'reference', _ref: 'e428677e-e1fe-4029-9f45-a9344e20adfc' },
  wellness: { _type: 'reference', _ref: '843e85b5-0a5a-4b7a-ade9-e03b52f3387e' },
  misc:     { _type: 'reference', _ref: '92379045-41c9-467b-8eac-3a9ccd01be14' },
}

function block(text) {
  return {
    _type: 'block', _key: Math.random().toString(36).slice(2),
    style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text }],
  }
}
function h2(text) {
  return { ...block(text), style: 'h2' }
}
function blocks(...texts) {
  return texts.map(t => typeof t === 'string' ? block(t) : t)
}

const posts = [
  // ── FAITH ──────────────────────────────────────────────────────────────────
  {
    title_en: 'Why I Pray Before Every Meeting',
    title_ko: '나는 왜 모든 회의 전에 기도하는가',
    slug: 'why-i-pray-before-every-meeting',
    category: CAT.faith,
    published_at: '2026-07-01T09:00:00Z',
    author_note: 'Written after a particularly difficult board meeting that turned unexpectedly well.',
    body_en: blocks(
      'There is a moment, just before the calendar reminder fires, when I close my laptop screen and bow my head. Thirty seconds. Sometimes less. My team probably thinks I am collecting my thoughts. I am — just not in the way they imagine.',
      'I started this practice four years ago, not out of piety but out of desperation. We were three months from running out of runway, and I had a meeting with an investor who had already passed on us twice. I did not know what to say. I prayed not because I believed it would change the outcome, but because I had run out of alternatives.',
      h2('What prayer does to a meeting'),
      'Prayer does not change the room. It changes me before I walk into it. When I take thirty seconds to acknowledge that I do not control the outcome — that the person across the table has their own story, their own pressures, their own fears — I enter differently. Less defended. More curious.',
      'Business is tribal. We walk in loaded with our prepared narratives, our pitch decks rehearsed, our objections pre-answered. Prayer is the practice of setting that armor down, even briefly, and remembering that the other person is also a human being trying to find their way.',
      h2('The investor who said no, then yes'),
      'That meeting four years ago did not end the way I hoped. The investor passed again. But three weeks later he called back. He said something had stayed with him — not our numbers, which had not changed — but the way I had listened. He ended up leading our next round.',
      'I am not saying prayer caused that outcome. I am saying it made me the kind of person who could have that conversation honestly. That is enough for me.',
      'The long walk of business is rarely about the single meeting. It is about who you become across thousands of them. Prayer, for me, is how I try to stay oriented on that walk — not toward success, but toward something that will outlast any particular outcome.'
    ),
    body_ko: blocks(
      '캘린더 알림이 울리기 직전, 나는 노트북 화면을 닫고 고개를 숙인다. 30초. 때로는 그보다 짧다. 팀원들은 아마 내가 생각을 정리한다고 여길 것이다. 맞다 — 다만 그들이 상상하는 방식과는 다를 뿐이다.',
      '이 습관을 시작한 건 4년 전이다. 경건함 때문이 아니라 절박함 때문이었다. 런웨이가 3개월 남은 상황에서 이미 두 번이나 거절한 투자자를 만나야 했다. 무슨 말을 해야 할지 몰랐다. 결과를 바꿀 수 있다고 믿어서가 아니라, 다른 선택지가 없었기에 기도했다.',
      h2('기도가 회의에 미치는 영향'),
      '기도는 방을 바꾸지 않는다. 그 방에 들어가기 전의 나를 바꾼다. 결과를 내가 통제하지 못한다는 것을, 테이블 맞은편에 앉은 사람도 그들만의 이야기와 압박과 두려움을 갖고 있다는 것을 30초 동안 인정할 때, 나는 다른 사람이 되어 그 방에 들어선다.',
      '비즈니스는 본질적으로 부족적이다. 우리는 준비된 서사, 연습된 피치덱, 미리 마련한 반론을 들고 회의실에 들어선다. 기도는 그 갑옷을 잠시 내려놓고, 상대방 역시 자신의 길을 찾아가는 인간임을 기억하는 연습이다.',
      h2('거절했다가 수락한 투자자'),
      '4년 전 그 미팅은 내가 원하는 방식으로 끝나지 않았다. 투자자는 또 거절했다. 하지만 3주 후 그가 전화를 걸어왔다. 변하지 않은 숫자가 아니라, 내가 경청하는 방식이 마음에 남았다고 했다. 결국 그는 다음 라운드를 리드했다.',
      '기도가 그 결과를 만들었다고 주장하는 게 아니다. 기도가 나를 그 대화를 진실되게 나눌 수 있는 사람으로 만들었다고 말하는 것이다. 나에게는 그것으로 충분하다.'
    ),
  },
  {
    title_en: 'What the Sabbath Taught Me About Productivity',
    title_ko: '안식일이 생산성에 대해 가르쳐준 것',
    slug: 'what-the-sabbath-taught-me-about-productivity',
    category: CAT.faith,
    published_at: '2026-07-05T09:00:00Z',
    author_note: 'Still imperfect at this. Writing it down is part of the practice.',
    body_en: blocks(
      'I did not grow up keeping the Sabbath seriously. My family was nominally Christian in the way many Korean immigrant families are — Christmas, Easter, Sunday morning when convenient. Rest was not a spiritual practice. Rest was what happened when you were too exhausted to do anything else.',
      'When I started my first company at twenty-seven, I worked every day. I told myself this was what it took. I watched my American peers do the same and felt reassured. Then I burned out so completely that I could not make a decision for three weeks.',
      h2('The counterintuitive economics of rest'),
      'I started keeping Sabbath the following year — not for religious reasons but for practical ones. One day per week, no email, no meetings, no strategy. It felt like waste. It turned out to be the highest-leverage thing I did that year.',
      'The reason is not mysterious. Decisions made from depletion are poor decisions. The clarity that comes from genuine rest — not Netflix, not scrolling, but actual stillness — is a different cognitive state. Problems that seemed intractable on Friday often look different on Sunday evening after a real day off.',
      h2('What counts as rest'),
      'This took me years to figure out. Leisure is not rest. Checking one fewer email is not rest. Rest, in the Sabbath sense, means releasing control — acknowledging that the world will continue without your management of it for one day, and that this is not a catastrophe.',
      'For me this means: no phone before noon. A long walk with no destination. Reading something unrelated to work. Cooking a meal slowly. These are not productivity hacks. They are the opposite of productivity hacks. They work precisely because they are not trying to work.'
    ),
    body_ko: blocks(
      '나는 안식일을 엄격하게 지키며 자라지 않았다. 많은 한국 이민자 가정이 그렇듯, 우리 가족은 명목상 기독교인이었다 — 크리스마스, 부활절, 편할 때 일요일 예배. 쉬는 것은 영적 실천이 아니었다. 너무 지쳐서 더 이상 아무것도 할 수 없을 때 일어나는 일이었다.',
      '스물일곱에 첫 회사를 시작했을 때, 나는 매일 일했다. 이것이 필요한 것이라고 스스로에게 말했다. 번아웃이 찾아왔고, 3주 동안 아무런 결정도 내리지 못했다.',
      h2('휴식의 반직관적 경제학'),
      '이듬해 안식일을 지키기 시작했다 — 종교적 이유가 아니라 실용적인 이유에서. 일주일에 하루, 이메일 없이, 회의 없이, 전략 없이. 낭비처럼 느껴졌다. 알고 보니 그해 가장 레버리지가 높은 행동이었다.',
      '이유는 신비롭지 않다. 고갈된 상태에서 내린 결정은 나쁜 결정이다. 진정한 휴식에서 오는 명료함은 다른 인지 상태다. 금요일에 해결 불가능해 보이던 문제가 진정한 하루를 쉰 일요일 저녁에는 다르게 보이는 경우가 많다.',
      h2('무엇이 진정한 쉬는 것인가'),
      '이것을 파악하는 데 수년이 걸렸다. 여가는 쉬는 게 아니다. 이메일 한 통을 덜 확인하는 것도 쉬는 게 아니다. 안식일의 의미에서 쉬는 것은 통제를 내려놓는 것을 의미한다 — 하루 동안 내가 관리하지 않아도 세상이 계속 돌아간다는 것을 인정하는 것.'
    ),
  },
  {
    title_en: 'On Staying Faithful When Business is Hard',
    title_ko: '사업이 힘들 때 신앙을 지키는 것에 대하여',
    slug: 'on-staying-faithful-when-business-is-hard',
    category: CAT.faith,
    published_at: '2026-07-10T09:00:00Z',
    author_note: 'The hardest post to write. Sitting with it for a week before publishing.',
    body_en: blocks(
      'There is a theology of success that runs quietly through Korean-American Christianity. If you do right — work hard, tithe, serve — God will bless you materially. I absorbed this without knowing it. Which made my first failed company feel like a spiritual catastrophe, not just a business one.',
      'We had done everything right. The market was wrong. The timing was off. We ran out of money eight months before the category took off with a competitor. I laid off eleven people, most of them friends, in a single afternoon.',
      h2('The wilderness is not punishment'),
      'I spent the following year reading about failure — not the cheerful startup kind but the older kind, the kind in Psalms and Lamentations and Job. What struck me was that the writers did not explain their circumstances away. They complained. They questioned. They stayed in the difficulty without resolution.',
      'This was different from the faith I had been practicing, which was largely a faith of outcomes. Pray this way and get this result. But the older tradition I was reading suggested something else: that fidelity in the hard season is itself the practice, regardless of what follows.',
      h2('What I found on the other side'),
      'My second company was harder to start. I had a failure on my record. I moved more slowly, asked more questions, trusted differently. The company is still running six years later. I do not know if the failure caused the success. I know the failure changed me in ways success could not have.',
      'Faith, for me now, is not a technology for producing good outcomes. It is a practice of remaining present and honest during the long walk — including the parts of the walk that go through difficult terrain.'
    ),
    body_ko: blocks(
      '한국계 미국인 기독교를 관통하는 성공의 신학이 있다. 올바르게 행하면 — 열심히 일하고, 십일조를 내고, 섬기면 — 하나님이 물질적으로 복을 주신다는 것. 나는 그것을 자신도 모르게 흡수했다. 그래서 첫 번째 회사의 실패는 사업적 재앙이 아니라 영적 재앙처럼 느껴졌다.',
      '우리는 모든 것을 올바르게 했다. 시장이 틀렸다. 타이밍이 맞지 않았다. 경쟁사가 그 카테고리를 장악하기 8개월 전에 돈이 떨어졌다. 하루 오후에 열한 명을 해고했다. 대부분 친구들이었다.',
      h2('광야는 벌이 아니다'),
      '이듬해를 실패에 대한 글을 읽으며 보냈다 — 활기찬 스타트업 식의 실패가 아니라, 시편과 예레미야애가와 욥기에 있는 더 오래된 종류의 실패. 인상적이었던 것은 글쓴이들이 자신의 상황을 설명하거나 합리화하지 않았다는 점이다. 그들은 불평했다. 의문을 품었다. 해결 없이 어려움 속에 머물렀다.',
      '이것은 내가 실천해온 신앙과 달랐다. 대체로 결과의 신앙이었다. 이렇게 기도하면 저런 결과를 얻는다는 식의. 하지만 내가 읽은 오래된 전통은 다른 것을 시사했다: 어려운 계절의 신실함 자체가 실천이라는 것, 그 뒤에 무엇이 따라오든 상관없이.',
      h2('반대편에서 발견한 것'),
      '두 번째 회사는 시작하기가 더 힘들었다. 이력에 실패가 있었다. 더 천천히 움직이고, 더 많이 질문하고, 다르게 신뢰했다. 그 회사는 6년째 운영 중이다. 실패가 성공을 만들었는지 모른다. 다만 실패가 성공으로는 불가능한 방식으로 나를 바꿨다는 것은 안다.'
    ),
  },

  // ── WELLNESS ───────────────────────────────────────────────────────────────
  {
    title_en: 'Morning Routines That Actually Stick',
    title_ko: '실제로 유지되는 아침 루틴',
    slug: 'morning-routines-that-actually-stick',
    category: CAT.wellness,
    published_at: '2026-07-03T09:00:00Z',
    author_note: 'Revised this routine three times. The current version has lasted eight months.',
    body_en: blocks(
      'I have tried every morning routine in the productivity canon. The 5 AM wake-up. The cold shower. The journaling. The ten-minute meditation before the gratitude list before the visualization before the workout. I kept them for about three weeks each, then drifted back to reaching for my phone before I was fully awake.',
      'The problem was not discipline. The problem was that I was borrowing other people\'s routines without understanding what they were solving for. A founder in Palo Alto with a personal chef and no commute has a different morning than a founder in Seoul running a pharmaceutical distribution business with early warehouse calls.',
      h2('Design for your actual life'),
      'The routine that stuck for me is embarrassingly simple: no phone for the first hour. Coffee made slowly with a pour-over, not a machine. Fifteen minutes of reading — physical book, nothing work-related. That is it.',
      'No workout at dawn (I run in the evenings). No meditation app (I pray). No journaling (I think better while walking). The key insight was subtracting, not adding.',
      h2('The science is simpler than the industry suggests'),
      'Cortisol peaks naturally in the first hour after waking. This is your sharpest cognitive window. Most of us immediately hand that window to social media or email — other people\'s priorities — and wonder why we feel reactive all day.',
      'Protecting the first hour is not a luxury. It is one of the highest-return investments a knowledge worker can make. The specific content matters less than the principle: use this window on your own terms, not someone else\'s.',
      'Eight months in, I do not think about this anymore. That is how you know a routine has actually stuck — when it stops feeling like a routine and starts feeling like just what you do.'
    ),
    body_ko: blocks(
      '생산성 정전에 있는 모든 아침 루틴을 시도해봤다. 오전 5시 기상, 냉수 샤워, 저널링, 감사 목록 전 10분 명상, 그 전에 시각화, 그 전에 운동. 각각 3주 정도 지속하다가 완전히 깨기 전에 핸드폰을 집어 드는 습관으로 돌아갔다.',
      '문제는 규율이 아니었다. 다른 사람의 루틴을 그것이 무엇을 위한 것인지 이해하지 못한 채 빌려온 것이 문제였다. 개인 셰프가 있고 출퇴근이 없는 팔로알토의 창업자는 이른 창고 전화가 있는 제약 유통 사업을 운영하는 서울 창업자와 아침이 다르다.',
      h2('실제 삶에 맞게 설계하라'),
      '나에게 유지된 루틴은 민망할 만큼 단순하다: 첫 한 시간은 핸드폰 없이. 머신이 아닌 핸드드립으로 천천히 내린 커피. 15분 독서 — 종이책, 업무와 무관한 것. 그게 전부다.',
      '새벽 운동 없음(저녁에 달린다). 명상 앱 없음(기도한다). 저널링 없음(걸으면서 더 잘 생각한다). 핵심은 더하는 것이 아니라 빼는 것이었다.',
      h2('과학은 산업이 제시하는 것보다 단순하다'),
      '코르티솔은 기상 후 첫 한 시간 동안 자연적으로 최고조에 달한다. 이것이 가장 날카로운 인지 창이다. 대부분의 사람들은 그 창을 즉시 소셜 미디어나 이메일 — 다른 사람의 우선순위 — 에 넘기고, 하루 종일 반응적으로 느끼는 이유를 의아해한다.',
      '첫 한 시간을 보호하는 것은 사치가 아니다. 지식 노동자가 할 수 있는 가장 높은 수익의 투자 중 하나다.'
    ),
  },
  {
    title_en: 'The Case for Walking More Than You Think You Should',
    title_ko: '당신이 생각하는 것보다 더 많이 걸어야 하는 이유',
    slug: 'the-case-for-walking',
    category: CAT.wellness,
    published_at: '2026-07-08T09:00:00Z',
    author_note: 'This one came out of a 90-minute walk where I solved a problem that had been stuck for two weeks.',
    body_en: blocks(
      'Somewhere in the past decade, walking got demoted. It is what you do when you cannot afford a gym membership, or when the weather is good enough and you have nowhere to be. We replaced it with HIIT and cycling apps and fitness trackers that measure everything except the thing walking actually does well.',
      'Walking is a thinking technology. Always has been. Aristotle\'s school was called Peripatetic — from the Greek for walking around. Nietzsche walked four hours a day and attributed most of his best ideas to it. Darwin built a thinking path at his home and wore a groove in it over forty years.',
      h2('What the research actually says'),
      'A Stanford study found that walking increases creative output by 81% compared to sitting. Not while walking — the effect persists after you sit back down. The mechanism appears to be related to increased bilateral coordination, reduced prefrontal cortex suppression, and something about the rhythm of steps that facilitates associative thinking.',
      'For problems that require connection between distant ideas — which is most of the interesting problems in business — walking seems to access a mode of thinking that sitting does not.',
      h2('How to actually use this'),
      'I take one meeting per week as a walk — usually with someone I trust enough to be slightly distracted with. The quality of thinking in these conversations is consistently better than in a conference room.',
      'When a problem is stuck, I walk without my phone. Specifically without my phone. The urge to check it is the opposite signal — the brain looking for an easier dopamine hit instead of doing the slow associative work the walk is for.',
      'Thirty minutes minimum. The first fifteen are just clearing the buffer. The second fifteen is where the thinking happens.'
    ),
    body_ko: blocks(
      '지난 10년 사이 어딘가에서 걷기는 격이 낮아졌다. 헬스장 회원권을 살 여유가 없거나, 날씨가 좋고 딱히 갈 곳이 없을 때 하는 것이 되어버렸다. 우리는 HIIT, 사이클링 앱, 걷기가 실제로 잘하는 것을 제외한 모든 것을 측정하는 피트니스 트래커로 대체했다.',
      '걷기는 사고의 기술이다. 항상 그래왔다. 아리스토텔레스의 학파는 페리파토스라 불렸다 — 그리스어로 걸어다닌다는 뜻이다. 니체는 하루 4시간을 걸었고 자신의 최고 아이디어 대부분을 그것 덕분이라고 했다. 다윈은 집에 사유의 길을 만들었고 40년에 걸쳐 홈을 팠다.',
      h2('연구가 실제로 말하는 것'),
      '스탠퍼드 연구에 따르면 걷기는 앉아있는 것에 비해 창의적 아웃풋을 81% 높인다. 걷는 동안만이 아니다 — 다시 앉은 후에도 효과가 지속된다. 메커니즘은 양측 협응 증가, 전전두피질 억제 감소, 연상적 사고를 촉진하는 걸음의 리듬과 관련된 것으로 보인다.',
      h2('실제로 활용하는 방법'),
      '나는 일주일에 한 번 회의를 걷기로 한다 — 보통 약간 산만해도 괜찮을 만큼 신뢰하는 사람과 함께. 이 대화에서의 사고 품질은 회의실에서보다 일관되게 높다.',
      '문제가 막히면 핸드폰 없이 걷는다. 특별히 핸드폰 없이. 그것을 확인하고 싶은 충동은 반대 신호다 — 걷기가 위한 느린 연상 작업 대신 뇌가 더 쉬운 도파민 자극을 찾는 것이다.',
      '최소 30분. 처음 15분은 버퍼를 지우는 것이다. 다음 15분에서 사고가 일어난다.'
    ),
  },
  {
    title_en: 'What Korean Health Culture Gets Right That the West Is Still Learning',
    title_ko: '한국 건강 문화가 서양이 아직 배우고 있는 것을 옳게 보는 이유',
    slug: 'korean-health-culture-what-west-is-learning',
    category: CAT.wellness,
    published_at: '2026-07-12T09:00:00Z',
    author_note: 'From both sides of the Pacific on this one.',
    body_en: blocks(
      'My grandmother ate fermented vegetables with every meal, walked thirty minutes every morning regardless of weather, and slept eight hours without negotiation. She lived to ninety-three and worked in her garden until eighty-nine. She did not think of any of this as wellness. It was just life.',
      'There is a version of health culture in Korea that predates the wellness industrial complex by generations. It is not glamorous. It does not have a brand. But it contains insights that Western medicine and the wellness industry are slowly and expensively rediscovering.',
      h2('Fermentation as functional food'),
      'Kimchi, doenjang, ganjang, makgeolli — Korean cuisine is built on fermentation. Before anyone knew what a microbiome was, Korean food culture had developed a rich ecosystem of live-culture foods eaten at every meal. The research on gut health and its relationship to immunity, mood, and cognitive function is validating what Korean grandmothers have always known.',
      h2('Communal eating as health practice'),
      'Korean meals are not individual. They are shared from common dishes. This is practical — it is also profoundly social in a way that affects health. Loneliness is now understood to be as damaging as smoking fifteen cigarettes a day. The banchan tradition means eating is always, by default, a social act.',
      h2('The saunas they have been building since the Joseon dynasty'),
      'Jjimjilbang — the Korean public sauna — is not a luxury. It is a utility. Families go together. Elderly men play go in the cooling room. Children sleep on the heated floor. Sauna use at this frequency and in this social context has health benefits that solo sauna sessions may not fully replicate.',
      'The wellness industry sells us back, piece by piece, at premium prices, what cultures like Korea have maintained for generations as ordinary life. The lesson is not to buy more products. It is to look at what your grandparents\' generation did daily, and take it more seriously.'
    ),
    body_ko: blocks(
      '우리 할머니는 매 끼니 발효 채소를 드셨고, 날씨와 상관없이 매일 아침 30분을 걸으셨으며, 협상 없이 8시간을 주무셨다. 93세에 돌아가셨고 89세까지 텃밭에서 일하셨다. 이 중 어느 것도 웰니스라고 생각하지 않으셨다. 그냥 삶이었다.',
      '한국에는 웰니스 산업 복합체보다 세대를 앞선 건강 문화가 있다. 화려하지 않다. 브랜드도 없다. 하지만 서양 의학과 웰니스 산업이 느리고 비싸게 재발견하고 있는 통찰을 담고 있다.',
      h2('기능성 식품으로서의 발효'),
      '김치, 된장, 간장, 막걸리 — 한국 음식은 발효를 기반으로 한다. 마이크로바이옴이 무엇인지 알기 전에, 한국 식문화는 매 끼니 먹는 살아있는 배양 음식의 풍부한 생태계를 발전시켰다. 장 건강과 면역, 기분, 인지 기능의 관계에 대한 연구는 한국 할머니들이 항상 알고 있던 것을 검증하고 있다.',
      h2('건강 실천으로서의 공동 식사'),
      '한국 식사는 개인적이지 않다. 공동 반찬에서 나눠 먹는다. 이것은 실용적이다 — 또한 건강에 영향을 미치는 방식으로 깊이 사회적이다. 외로움은 이제 하루 담배 15개비만큼 해롭다고 이해된다. 반찬 전통은 식사가 항상 기본적으로 사회적 행위임을 의미한다.',
      h2('조선 시대부터 지어온 사우나'),
      '찜질방은 사치품이 아니다. 공공재다. 가족이 함께 간다. 노인들이 냉방실에서 바둑을 둔다. 아이들이 뜨거운 바닥에서 잠을 잔다. 이 빈도와 사회적 맥락에서의 사우나 사용은 개인 사우나 세션이 완전히 복제하지 못할 수 있는 건강 이점을 가진다.'
    ),
  },

  // ── MISC ───────────────────────────────────────────────────────────────────
  {
    title_en: 'On Starting Over: Notes from a Founder',
    title_ko: '다시 시작하는 것에 대하여: 창업자의 노트',
    slug: 'on-starting-over-notes-from-a-founder',
    category: CAT.misc,
    published_at: '2026-07-04T09:00:00Z',
    author_note: 'For anyone at the beginning of the beginning.',
    body_en: blocks(
      'The second time you start a company is harder than the first time. This surprises people. The first time you are naive in a way that protects you — you do not know what can go wrong, so the fear is abstract. The second time you know exactly what can go wrong, in vivid detail, because you have lived it.',
      'You also know something the first-time founder does not: that most of it was not in your control. The market moved. The technology shifted. A better-funded competitor entered. You worked as hard as you could and it was not enough. Now you must somehow convince yourself to do it again.',
      h2('What makes starting over possible'),
      'Every founder I know who has done it more than once has had to develop a different relationship with the outcome. Not indifference — you still need to care enough to work through the hard parts. But a detachment from the question of whether this particular venture validates your worth as a person.',
      'This is harder to develop than any business skill. It requires asking: who am I if this doesn\'t work? And being able to answer that question honestly, without the answer depending on the company\'s success.',
      h2('The things that actually transfer'),
      'What transfers from failed company to new company is not the product knowledge or the market knowledge — those are often wrong anyway. What transfers is judgment about people. How to read someone who is telling you what you want to hear. When to trust your instinct and when to override it. How to have a hard conversation without breaking the relationship.',
      'These things cannot be learned from books or courses. They can only be learned from doing, and doing again, and doing wrong, and trying to understand why.'
    ),
    body_ko: blocks(
      '두 번째 창업은 첫 번째보다 힘들다. 이것은 사람들을 놀라게 한다. 첫 번째는 당신을 보호하는 방식으로 순진하다 — 무엇이 잘못될 수 있는지 모르기 때문에 두려움이 추상적이다. 두 번째는 무엇이 잘못될 수 있는지 정확히, 생생한 세부 사항으로 안다. 왜냐하면 직접 살아봤기 때문이다.',
      '또한 초보 창업자가 모르는 것도 안다: 대부분이 당신의 통제 밖에 있었다는 것. 시장이 움직였다. 기술이 바뀌었다. 더 많은 자금을 가진 경쟁자가 진입했다. 할 수 있는 만큼 열심히 했지만 충분하지 않았다. 이제 어떻게든 다시 하도록 자신을 설득해야 한다.',
      h2('다시 시작을 가능하게 하는 것'),
      '두 번 이상 한 내가 아는 모든 창업자는 결과와 다른 관계를 발전시켜야 했다. 무관심이 아니다 — 여전히 힘든 부분을 헤쳐 나갈 만큼 충분히 신경 써야 한다. 하지만 이 특정 벤처가 사람으로서 당신의 가치를 검증하는지의 문제에서 분리되는 것.',
      '이것은 어떤 비즈니스 기술보다 개발하기 어렵다. 이것이 작동하지 않는다면 나는 누구인가를 묻고, 그 대답이 회사의 성공에 달려 있지 않게 솔직하게 답할 수 있어야 한다.',
      h2('실제로 이전되는 것'),
      '실패한 회사에서 새 회사로 이전되는 것은 제품 지식이나 시장 지식이 아니다 — 어차피 그것들은 종종 틀렸다. 이전되는 것은 사람에 대한 판단이다. 당신이 듣고 싶은 것을 말하는 사람을 읽는 방법. 직감을 신뢰할 때와 무시할 때. 관계를 깨지 않고 힘든 대화를 나누는 방법.'
    ),
  },
  {
    title_en: 'The Diaspora Advantage',
    title_ko: '디아스포라의 이점',
    slug: 'the-diaspora-advantage',
    category: CAT.misc,
    published_at: '2026-07-07T09:00:00Z',
    author_note: 'Still working out what it means to be from here and from there at the same time.',
    body_en: blocks(
      'Growing up Korean-American, the hyphen felt like a deficit. You were not quite Korean enough for Korea and not quite American enough for America. You translated yourself constantly — code-switching between languages, between expectations, between versions of yourself that fit different rooms.',
      'It took me until my thirties to understand that this was not a deficit. It was a capability. The ability to move between worlds — to read what is unsaid in a Korean boardroom and what is unsaid in an American one — is not common. It is something people pay for.',
      h2('Pattern recognition across cultures'),
      'The diaspora experience trains a particular kind of attention. You learn early that the same behavior means different things in different contexts. That silence in a Korean meeting is not the same as silence in an American one. That the hierarchy expressed through food — who pours for whom — contains information about the deal before anyone says a word about the deal.',
      'This is cultural pattern recognition, and it compounds. The more contexts you have been genuinely embedded in — not as a tourist but as a participant with something at stake — the richer your map of human behavior becomes.',
      h2('What to do with it'),
      'I spent years trying to minimize my Korean-ness in professional contexts, code-switching fully into American professional norms. The irony is that the most distinctive value I offered was precisely the thing I was trying to hide.',
      'The diaspora advantage is not automatic. It requires choosing to be from both places, rather than feeling homeless in both. That is a harder choice than it sounds, and it takes most of us longer to make than it should.'
    ),
    body_ko: blocks(
      '한국계 미국인으로 자라면서, 하이픈은 결핍처럼 느껴졌다. 한국에서는 충분히 한국적이지 않고, 미국에서는 충분히 미국적이지 않았다. 언어 사이, 기대 사이, 다른 공간에 맞는 자신의 버전들 사이에서 끊임없이 자신을 번역했다.',
      '30대가 되어서야 이것이 결핍이 아님을 이해했다. 그것은 능력이었다. 세계 사이를 이동하는 능력 — 한국 이사회에서 말해지지 않은 것과 미국 이사회에서 말해지지 않은 것을 읽는 것 — 은 흔하지 않다. 사람들이 돈을 내는 것이다.',
      h2('문화를 가로지르는 패턴 인식'),
      '디아스포라 경험은 특별한 종류의 주의를 훈련시킨다. 동일한 행동이 다른 맥락에서 다른 의미를 가진다는 것을 일찍 배운다. 한국 회의에서의 침묵이 미국 회의에서의 침묵과 같지 않다는 것. 음식을 통해 표현된 위계 — 누가 누구에게 따르는지 — 가 딜에 대한 아무 말도 나오기 전에 딜에 대한 정보를 담고 있다는 것.',
      h2('그것으로 무엇을 할 것인가'),
      '나는 전문적 맥락에서 한국적인 것을 최소화하려고 노력하는 데 수년을 보냈다. 아이러니하게도 내가 제공한 가장 독특한 가치는 정확히 내가 숨기려 했던 것이었다.',
      '디아스포라의 이점은 자동적이지 않다. 두 곳 모두에서 집이 없다고 느끼는 대신, 두 곳 모두에서 왔음을 선택하는 것이 필요하다. 그것은 들리는 것보다 더 어려운 선택이고, 우리 대부분이 해야 하는 것보다 더 오래 걸린다.'
    ),
  },
  {
    title_en: 'How to Have Conversations That Actually Go Somewhere',
    title_ko: '실제로 어딘가로 가는 대화를 하는 방법',
    slug: 'conversations-that-go-somewhere',
    category: CAT.misc,
    published_at: '2026-07-14T09:00:00Z',
    author_note: 'Inspired by a dinner where no one looked at their phone for three hours.',
    body_en: blocks(
      'Most business conversations are information exchanges wearing the costume of dialogue. Someone says a thing. The other person waits for a pause to say their thing. Occasional nodding to signal reception. No one is particularly changed at the end.',
      'The conversations that actually matter — the ones you remember years later, the ones that change how you see a problem — have a different quality. They involve genuine not-knowing on at least one side. They go somewhere neither person planned to go.',
      h2('The practice of genuine questions'),
      'A genuine question is one you do not know the answer to. Most of the questions we ask in professional settings are not genuine — they are requests for confirmation of what we already believe, or setups for our own next point.',
      'Try this: before your next important conversation, identify one thing about the other person\'s view that genuinely puzzles you. Not a disagreement — a genuine curiosity. Ask about that. Then let go of your next point and actually listen to the answer.',
      h2('What silence is for'),
      'Americans are uncomfortable with silence in conversation. Koreans, in my experience, less so — particularly older Koreans, who have learned to let space open before responding. This is a skill, and a form of respect.',
      'When someone says something interesting, the best response is often not an immediate reply but a moment of sitting with it. This signals that you actually heard them. It also gives you time to respond to what they actually said rather than what you expected them to say.',
      'The conversations worth having are not efficient. They wander. They take time. This is not a flaw — this is what makes them go somewhere real.'
    ),
    body_ko: blocks(
      '대부분의 비즈니스 대화는 대화의 옷을 입은 정보 교환이다. 누군가가 말을 한다. 상대방은 자신의 말을 할 틈을 기다린다. 간간이 고개를 끄덕여 수신을 표시한다. 끝에 아무도 특별히 변하지 않는다.',
      '실제로 중요한 대화들 — 수년 후에도 기억하는 것들, 문제를 보는 방식을 바꾸는 것들 — 은 다른 질을 가진다. 적어도 한쪽에서 진정한 모름이 관여한다. 아무도 계획하지 않은 곳으로 간다.',
      h2('진정한 질문의 실천'),
      '진정한 질문은 답을 모르는 것이다. 전문적 환경에서 우리가 하는 대부분의 질문은 진정하지 않다 — 이미 믿는 것의 확인 요청이거나, 우리 자신의 다음 요점을 위한 설정이다.',
      '이것을 시도해보라: 다음 중요한 대화 전에, 상대방의 견해에서 진정으로 당신을 당혹스럽게 하는 한 가지를 파악하라. 불일치가 아니라 — 진정한 호기심. 그것에 대해 물어라. 그런 다음 당신의 다음 요점을 놓아버리고 실제로 답을 들어라.',
      h2('침묵이 무엇을 위한 것인지'),
      '미국인들은 대화에서 침묵에 불편함을 느낀다. 내 경험상 한국인들, 특히 응답하기 전에 공간이 열리도록 배운 나이 든 한국인들은 덜 그렇다. 이것은 기술이고 존중의 형태다.',
      '누군가 흥미로운 것을 말할 때, 최선의 반응은 종종 즉각적인 답이 아니라 그것과 함께 잠시 앉아 있는 것이다. 이것은 실제로 들었음을 신호한다.'
    ),
  },
  {
    title_en: 'Small Habits That Compound Over a Decade',
    title_ko: '10년에 걸쳐 복리로 쌓이는 작은 습관들',
    slug: 'small-habits-that-compound',
    category: CAT.misc,
    published_at: '2026-07-16T09:00:00Z',
    author_note: 'A list I keep returning to. Updated from the version I wrote five years ago.',
    body_en: blocks(
      'We overestimate what we can do in a year and underestimate what we can do in a decade. The habits that matter most are almost never the dramatic ones — the complete dietary overhaul, the language learned in three months, the reading of fifty books. They are the unsexy ones that keep happening.',
      h2('The list'),
      'Read something before you reach for your phone every morning. Ten minutes. Physical book preferred. Over a decade this is roughly 600 hours of reading — the equivalent of a graduate education, without the credential.',
      'Write something every week. Not for publication. For thinking. Writing is the technology that catches thoughts that would otherwise dissolve in the stream of daily noise. A decade of weekly writing is a record of how your mind changed.',
      'Call someone you respect once a month and ask what they are working on. Not to network. Because you are genuinely curious and human connection is valuable and it does not happen by accident.',
      'Walk somewhere without your phone at least twice a week. The point is the absence of input, not the presence of exercise. Your brain needs time without information.',
      h2('Why small is the right size'),
      'The reason most habits fail is not lack of willpower — it is that we design for peak motivation rather than minimum friction. A habit you can do on your worst day is worth ten habits you can only do on your best.',
      'The compound interest principle in habits is real, but it requires consistency far more than intensity. A small thing done every week for ten years produces effects that are genuinely difficult to comprehend from the beginning. This is both the problem and the promise.'
    ),
    body_ko: blocks(
      '우리는 1년에 할 수 있는 것을 과대평가하고 10년에 할 수 있는 것을 과소평가한다. 가장 중요한 습관은 거의 드라마틱한 것이 아니다 — 완전한 식단 개편, 3개월에 배운 언어, 50권의 독서. 그것들은 계속 일어나는 섹시하지 않은 것들이다.',
      h2('목록'),
      '매일 아침 핸드폰을 집기 전에 무언가를 읽어라. 10분. 종이책이 선호된다. 10년에 걸쳐 이것은 약 600시간의 독서다 — 자격증 없는 대학원 교육에 해당한다.',
      '매주 무언가를 써라. 출판을 위한 것이 아니라 사고를 위해. 쓰기는 일상적 소음의 흐름 속에서 녹아버릴 생각들을 잡는 기술이다. 10년의 주간 글쓰기는 당신의 생각이 어떻게 변했는지의 기록이다.',
      '한 달에 한 번 존경하는 누군가에게 전화해 무엇을 하고 있는지 물어보라. 네트워킹을 위해서가 아니라. 진정으로 궁금하고 인간 연결이 가치 있기 때문에.',
      '일주일에 최소 두 번 핸드폰 없이 어딘가를 걸어라. 요점은 운동의 존재가 아니라 입력의 부재다. 당신의 뇌는 정보 없는 시간이 필요하다.',
      h2('작은 것이 왜 올바른 크기인가'),
      '대부분의 습관이 실패하는 이유는 의지력 부족이 아니다 — 최고 동기 부여를 위해 설계하고 최소 마찰을 위해 설계하지 않기 때문이다. 최악의 날에도 할 수 있는 습관은 최선의 날에만 할 수 있는 열 가지 습관만큼의 가치가 있다.'
    ),
  },
]

async function uploadPosts() {
  console.log(`Uploading ${posts.length} posts...`)
  for (const post of posts) {
    const doc = {
      _type: 'post',
      title_en: post.title_en,
      title_ko: post.title_ko,
      slug: { _type: 'slug', current: post.slug },
      category: post.category,
      body_en: post.body_en,
      body_ko: post.body_ko,
      author_note: post.author_note || '',
      published_at: post.published_at,
    }
    try {
      const created = await client.create(doc)
      console.log(`✓ Created: "${post.title_en}" (${created._id})`)
    } catch (err) {
      console.error(`✗ Failed: "${post.title_en}"`, err.message)
    }
  }
  console.log('Done.')
}

uploadPosts()
