import { createClient } from '@sanity/client'
import { createWriteStream, readFileSync, unlinkSync } from 'fs'
import { get as httpsGet } from 'https'
import { join } from 'path'
import { tmpdir } from 'os'

const client = createClient({
  projectId: 'vbckoho0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
})

// ─── Step 1: Create Company category ────────────────────────────────────────
async function createCategory() {
  const existing = await client.fetch(`*[_type == "category" && slug.current == "company"][0]{_id}`)
  if (existing) {
    console.log(`Category already exists: ${existing._id}`)
    return existing._id
  }
  const cat = await client.create({
    _type: 'category',
    name_en: 'Company',
    name_ko: '회사',
    slug: { _type: 'slug', current: 'company' },
  })
  console.log(`✓ Created category: ${cat._id}`)
  return cat._id
}

function block(text) {
  return {
    _type: 'block', _key: Math.random().toString(36).slice(2),
    style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), marks: [], text }],
  }
}
function h2(text) { return { ...block(text), style: 'h2' } }
function blocks(...args) { return args.map(a => typeof a === 'string' ? block(a) : a) }

// ─── Step 2: Posts ──────────────────────────────────────────────────────────
function getPosts(catRef) {
  return [
    {
      title_en: 'Why We Built a Group Instead of a Startup',
      title_ko: '스타트업 대신 그룹사를 만든 이유',
      slug: 'why-we-built-a-group-instead-of-a-startup',
      published_at: '2026-07-02T09:00:00Z',
      author_note: 'The structure of 한아원 was not obvious from the beginning. It became clear over time.',
      body_en: blocks(
        '한아원 Group is not a startup. It is not a conglomerate in the old sense either. It is something we built by necessity and kept building because the structure kept working.',
        'The group has four legal entities — HOI in the United States, 한아원코리아, 한아원리테일, and 도팜인 — operating across six distinct business lines. Pharmaceutical distribution, retail pharmacy, GLP-1 market intelligence, business automation software, wholesale, and a wellness brand called YUNÉ. On paper this looks like an unfocused mess. In practice it is a deliberately asymmetric bet.',
        h2('Why a group structure and not focused startups'),
        'The conventional startup wisdom says to pick one problem and go deep. I spent years believing this. Then I watched businesses that should have won lose because they had no adjacent position to fall back on, no cash flow from a stable business to fund the experimental one, no relationships in adjacent markets that could become strategic.',
        'Korean business culture, at its best, understands something Western startup culture often does not: that a group of related businesses can create advantages none of them could create alone. The distributor relationship opens the retailer. The retailer generates data the software learns from. The software makes the distributor more efficient. Each business makes the others more defensible.',
        h2('The question I ask about every new business'),
        'Before we start anything new, I ask: does this make the existing businesses better, or does it just add complexity? If the answer is the former, we proceed. If it is the latter, we do not, no matter how large the market.',
        'This sounds disciplined. It is also how we have ended up, after twelve years, with a group generating 3.49 billion won monthly — not from one big bet that paid off, but from many small positions that reinforced each other over time.'
      ),
      body_ko: blocks(
        '한아원 그룹은 스타트업이 아니다. 구시대적 의미의 대기업도 아니다. 필요에 의해 만들어지고, 구조가 계속 작동하기 때문에 계속 구축해온 무언가다.',
        '그룹은 네 개의 법인을 가지고 있다 — 미국의 HOI, 한아원코리아, 한아원리테일, 도팜인 — 여섯 개의 뚜렷한 사업 라인에서 운영된다. 의약품 도매, 리테일 약국, GLP-1 시장 인텔리전스, 비즈니스 자동화 소프트웨어, 도매, 그리고 YUNÉ라는 웰니스 브랜드. 서류상으로는 초점 없는 혼란처럼 보인다. 실제로는 의도적으로 비대칭적인 베팅이다.',
        h2('왜 집중된 스타트업이 아닌 그룹 구조인가'),
        '관습적인 스타트업 지혜는 하나의 문제를 골라 깊이 파고들라고 한다. 나는 수년간 이것을 믿었다. 그리고 나서 이겨야 할 사업들이 인접한 포지션이 없어서, 실험적인 것을 지원할 안정적인 사업의 현금 흐름이 없어서, 전략적으로 될 수 있는 인접 시장의 관계가 없어서 지는 것을 봤다.',
        '최선의 한국 기업 문화는 서양 스타트업 문화가 종종 이해하지 못하는 것을 이해한다: 관련 사업의 그룹이 어느 하나도 단독으로 만들 수 없는 이점을 만들 수 있다는 것. 유통업체 관계가 소매업체를 열어준다. 소매업체는 소프트웨어가 학습하는 데이터를 생성한다. 소프트웨어는 유통업체를 더 효율적으로 만든다.',
        h2('새 사업마다 하는 질문'),
        '새로운 것을 시작하기 전에 묻는다: 이것이 기존 사업을 더 좋게 만드는가, 아니면 복잡성만 추가하는가? 전자라면 진행한다. 후자라면 시장이 아무리 커도 하지 않는다.',
        '12년 후, 한 번의 큰 베팅이 아니라 서로를 강화한 많은 작은 포지션들로부터 월 34.9억 원을 생성하는 그룹이 됐다.'
      ),
    },
    {
      title_en: 'Building AX Hub: Why We Started Writing Our Own Software',
      title_ko: 'AX Hub를 만든 이유: 우리만의 소프트웨어를 만들기 시작한 이유',
      slug: 'building-ax-hub-why-we-started-writing-our-own-software',
      published_at: '2026-07-06T09:00:00Z',
      author_note: 'AX Hub started as an internal tool. It is becoming a product. This is still the early chapter.',
      body_en: blocks(
        'We started building AX Hub because nothing that existed did what we needed. This is the founding story every software company tells, and most of the time it is a rationalization. In our case it was true in a specific way: we were not trying to build software. We were trying to run a pharmaceutical distribution and retail pharmacy business, and the software we needed to do it well did not exist.',
        'The pharmaceutical market in Korea has particular characteristics — pricing structures, regulatory requirements, relationship dynamics between distributors and pharmacies — that generic ERP and CRM software does not account for. We were spending enormous amounts of time building workarounds inside tools not designed for our domain. The workarounds were themselves becoming the product.',
        h2('The accidental internal tool'),
        'The first version of what became AX Hub was a spreadsheet system our operations team built to track distributor relationships and pharmacy orders. It was embarrassing by any technical standard. It was also used every day by everyone in the company, which is a higher bar than most software passes.',
        'We hired a developer to turn it into a web application. Then another to add the reporting layer. Then a team to build the AI-assisted workflows. Three years in, we had something that was no longer embarrassing and that companies in adjacent industries were asking to use.',
        h2('The question of whether to productize'),
        'The decision to build AX Hub as a product — not just an internal tool — was difficult. Software companies and pharmaceutical distributors are very different businesses. The skills that make you good at one do not map cleanly onto the other.',
        'What decided it was that the automation layer we had built — the AI workflows that handle routine operational decisions without human review — was genuinely novel. Not clever-implementation-of-existing-idea novel. Novel in the sense that it was solving problems we had not seen solved well elsewhere. If that is true, the right thing to do is make it available to others. So we are.'
      ),
      body_ko: blocks(
        '우리가 AX Hub를 만들기 시작한 것은 우리에게 필요한 것을 하는 게 존재하지 않았기 때문이다. 이것은 모든 소프트웨어 회사가 말하는 창업 스토리이고, 대부분의 경우 합리화다. 우리의 경우 특정한 방식으로 사실이었다: 우리는 소프트웨어를 만들려는 게 아니었다. 의약품 유통과 리테일 약국 사업을 운영하려 했고, 그것을 잘하기 위해 필요한 소프트웨어가 존재하지 않았다.',
        '한국 의약품 시장은 특수한 특성을 가진다 — 가격 구조, 규제 요구사항, 유통업체와 약국 사이의 관계 역학 — 일반 ERP와 CRM 소프트웨어가 고려하지 않는 것들. 우리 도메인을 위해 설계되지 않은 도구들 안에서 해결책을 구축하는 데 엄청난 시간을 쓰고 있었다.',
        h2('우연한 내부 도구'),
        'AX Hub의 첫 번째 버전은 운영팀이 유통업체 관계와 약국 주문을 추적하기 위해 만든 스프레드시트 시스템이었다. 기술적 기준으로는 민망했다. 하지만 회사의 모든 사람이 매일 사용했고, 이것은 대부분의 소프트웨어가 통과하지 못하는 더 높은 기준이다.',
        h2('제품화 여부의 질문'),
        '결정을 내린 것은 우리가 구축한 자동화 레이어 — 인간 검토 없이 일상적 운영 결정을 처리하는 AI 워크플로우 — 가 진정으로 새로웠기 때문이다. 다른 곳에서 잘 해결된 것을 보지 못한 문제들을 해결하고 있었다. 그렇다면 다른 사람들도 사용할 수 있게 하는 것이 맞다. 그래서 우리는 그렇게 하고 있다.'
      ),
    },
    {
      title_en: 'What Pharmaceutical Distribution Taught Me About Business',
      title_ko: '의약품 유통이 사업에 대해 가르쳐준 것',
      slug: 'what-pharmaceutical-distribution-taught-me-about-business',
      published_at: '2026-07-09T09:00:00Z',
      author_note: 'This industry is not glamorous. That is exactly why it works.',
      body_en: blocks(
        'When people ask what 한아원 does, pharmaceutical distribution is rarely the part they find interesting. They want to talk about the AI software, the GLP-1 market intelligence, the American expansion. The distribution business gets nodded past.',
        'This is a mistake. The distribution business is where everything else comes from. It is the foundation on which the more interesting-sounding businesses rest, and understanding it has taught me more about business fundamentals than anything I have built since.',
        h2('Why boring businesses are often the best businesses'),
        'Pharmaceutical distribution in Korea operates on thin margins, high volume, tight regulatory oversight, and extraordinarily complex relationship networks. Pharmacies depend on reliable delivery. Manufacturers depend on reliable channel access. The distributor in between serves both, and the value of doing this well compounds quietly over years.',
        'There is no narrative glamour in this. There is enormous operational complexity that acts as a moat — not because it is technologically sophisticated, but because doing it well requires years of relationship capital and operational knowledge that cannot be acquired quickly.',
        h2('The relationships that become the business'),
        'Pharmaceutical distribution is, at its core, a relationship business wearing an operations costume. The pharmacist who has been receiving your delivery reliably for eight years will take your call when you need to introduce a new product. The manufacturer who trusts your network will give you preferential access to new drugs. The regulatory contact who knows your compliance record will process your applications without friction.',
        'These relationships accumulate invisibly. They do not appear on a balance sheet. They are, in practice, the most valuable asset the business has.',
        h2('What it taught me about starting new businesses'),
        'Every new business we have started has been seeded by a relationship, a data insight, or a distribution channel that came from the pharmaceutical business. AX Hub came from operational problems we were solving internally. YUNÉ came from understanding the pharmacy customer deeply. The GLP-1 intelligence platform came from seeing prescription data patterns before the market understood what they meant.',
        'The boring business is often the seed. Give it the respect it deserves.'
      ),
      body_ko: blocks(
        '사람들이 한아원이 무엇을 하는지 물을 때, 의약품 유통은 흥미롭게 여기는 부분이 아니다. AI 소프트웨어, GLP-1 시장 인텔리전스, 미국 확장에 대해 이야기하고 싶어한다. 유통 사업은 고개를 끄덕이고 지나친다.',
        '이것은 실수다. 유통 사업은 다른 모든 것이 나오는 곳이다. 더 흥미롭게 들리는 사업들이 기대는 기반이고, 그것을 이해하는 것은 그 이후에 내가 만든 어떤 것보다 사업 기본에 대해 더 많이 가르쳐줬다.',
        h2('지루한 사업이 종종 최고의 사업인 이유'),
        '한국의 의약품 유통은 박리다매, 엄격한 규제 감독, 극도로 복잡한 관계망에서 운영된다. 약국은 안정적인 배송에 의존한다. 제조업체는 안정적인 채널 접근에 의존한다. 중간의 유통업체는 두 곳 모두를 서비스하고, 이것을 잘 하는 가치는 수년에 걸쳐 조용히 복리로 쌓인다.',
        h2('사업이 되는 관계들'),
        '의약품 유통은 핵심적으로 운영이라는 의상을 입은 관계 사업이다. 8년 동안 안정적으로 배송받은 약사는 새 제품을 소개해야 할 때 당신의 전화를 받을 것이다. 당신의 네트워크를 신뢰하는 제조업체는 새 의약품에 우선적 접근을 줄 것이다.',
        h2('새 사업 시작에 대해 가르쳐준 것'),
        '우리가 시작한 모든 새 사업은 의약품 사업에서 온 관계, 데이터 인사이트, 또는 유통 채널에서 시작됐다. AX Hub는 내부적으로 해결하던 운영 문제에서 왔다. YUNÉ는 약국 고객을 깊이 이해하는 것에서 왔다. GLP-1 인텔리전스 플랫폼은 시장이 그 의미를 이해하기 전에 처방 데이터 패턴을 보는 것에서 왔다.'
      ),
    },
    {
      title_en: 'The Retail Pharmacy as a Platform',
      title_ko: '플랫폼으로서의 리테일 약국',
      slug: 'the-retail-pharmacy-as-a-platform',
      published_at: '2026-07-11T09:00:00Z',
      author_note: 'The mart pharmacy model is more interesting than it looks from outside.',
      body_en: blocks(
        'The Korean mart pharmacy — 마트약국 — sits inside a large retail store and serves a captive foot-traffic customer base. From the outside it looks like a small business with fixed economics: walk-in customers, prescription fills, a little OTC retail. Simple, local, not particularly scalable.',
        'We have been operating 마트약국 for several years as part of 한아원 Group, and I want to make the case that the mart pharmacy is actually a data platform wearing the costume of a simple business — one with economic characteristics that become more interesting the more carefully you look.',
        h2('What a pharmacy actually knows'),
        'A pharmacy that serves the same community reliably over years accumulates an extraordinary amount of health data. Not in a surveillance sense — in the sense that patterns emerge from prescription fills, seasonal illness cycles, and the relationship between demographics and chronic condition management.',
        'This data, aggregated and analyzed properly, tells you things about a community\'s health trajectory before those things are visible anywhere else. It is, in effect, an early-warning system for health trends — which is exactly why we built the GLP-1 market intelligence platform on the foundation of our pharmacy network\'s data.',
        h2('The wellness bundle opportunity'),
        'The pharmacy customer is not coming in for a transaction. They are coming in because they have a health need. This is a different relationship from the grocery shopper or the clothing buyer. The trust level is higher, and so is the receptiveness to adjacent wellness offerings.',
        'YUNÉ, our wellness brand, was not designed to be distributed through pharmacies by accident. It was designed to be exactly what a pharmacy customer who trusts the pharmacist\'s recommendation would buy.',
        h2('Why we think the mart pharmacy is undervalued'),
        'The pharmacy at the center of a large retail store sees 300 to 500 customers per day in a trusted health context. Most businesses would pay significantly for that kind of access. The question is how to build the infrastructure that converts foot traffic into data insight and data insight into product development intelligence. That is the platform question, and it is the one we have been building answers to for the last three years.'
      ),
      body_ko: blocks(
        '한국 마트약국은 대형 소매점 안에 위치하고 고정된 유동인구 고객 기반을 서비스한다. 외부에서 보면 고정된 경제성을 가진 작은 사업처럼 보인다: 방문 고객, 처방전 조제, 약간의 일반의약품 소매. 단순하고, 지역적이고, 특별히 확장 가능하지 않은.',
        '한아원 그룹의 일부로 마트약국을 수년간 운영해왔고, 마트약국이 실제로 단순한 사업의 의상을 입은 데이터 플랫폼이라는 주장을 하고 싶다.',
        h2('약국이 실제로 아는 것'),
        '수년간 같은 커뮤니티를 안정적으로 서비스하는 약국은 엄청난 양의 건강 데이터를 축적한다. 감시적 의미에서가 아니라 — 처방전 조제, 계절적 질병 주기, 인구 통계와 만성 질환 관리 사이의 관계에서 패턴이 나타난다는 의미에서.',
        '이 데이터는 적절히 집계되고 분석되면 다른 어느 곳에서도 보이기 전에 커뮤니티의 건강 궤적에 대한 것을 알려준다. 이것이 우리가 GLP-1 시장 인텔리전스 플랫폼을 약국 네트워크 데이터의 기반 위에 구축한 이유다.',
        h2('왜 마트약국이 저평가됐다고 생각하는가'),
        '대형 소매점 중앙에 있는 약국은 신뢰받는 건강 맥락에서 하루 300~500명의 고객을 만난다. 대부분의 사업이 그런 접근에 상당한 비용을 지불할 것이다. 질문은 유동인구를 데이터 인사이트로, 데이터 인사이트를 제품 개발 인텔리전스로 전환하는 인프라를 어떻게 구축하느냐이다. 그것이 플랫폼 질문이고, 지난 3년간 우리가 답을 구축해온 것이다.'
      ),
    },
    {
      title_en: 'Running a Korean Business Group from America',
      title_ko: '미국에서 한국 사업 그룹을 경영하기',
      slug: 'running-a-korean-business-group-from-america',
      published_at: '2026-07-13T09:00:00Z',
      author_note: 'Written during a week split between LA and Seoul. As most weeks are.',
      body_en: blocks(
        'HOI — 한아원의 미국 모회사 — exists in Los Angeles. Its subsidiaries operate in Korea. I spend roughly a third of my year in each country, and the rest in transit or in the strange liminal state of a 13-hour time zone difference that means someone is always awake when you would prefer them to be sleeping.',
        'Running a business group across this distance is a operational challenge that does not have obvious solutions. The playbook for Korean conglomerates assumes Korean leadership on the ground in Korea. The playbook for American holding companies assumes the subsidiaries are also American. We are operating in the space between those two playbooks, building the processes as we go.',
        h2('What the time zone actually costs'),
        'The 13-hour difference means there is almost no overlap between Los Angeles business hours and Seoul business hours. A decision that would take thirty minutes of in-person conversation in the same office takes three days of asynchronous message chains when separated by that distance. This tax is invisible on any spreadsheet but it is real, and it compounds.',
        'We have adapted by being extremely deliberate about which decisions require real-time conversation and which can be made asynchronously. The framework has made our overall decision-making culture more deliberate, which has turned out to be a secondary benefit of a primary constraint.',
        h2('What Korean business culture and American business culture each get right'),
        'Korean business culture is better at long-term relationship investment. The willingness to have a relationship that does not produce immediate return, to invest in trust over years before it pays off, is something American business culture often lacks the patience for.',
        'American business culture is better at explicit communication. The direct articulation of disagreement, the willingness to say what is not working without the elaborate face-saving structures Korean business sometimes requires — this produces faster course corrections.',
        'The synthesis we have built — long-term relationship investment with direct communication norms — is, I think, genuinely better than either culture alone. Building it required operating in both simultaneously, which may be the unexpected benefit of the structural awkwardness we live with every day.'
      ),
      body_ko: blocks(
        'HOI — 한아원의 미국 지주회사 — 는 LA에 있다. 그 자회사들은 한국에서 운영된다. 나는 1년의 약 3분의 1을 각 나라에서 보내고, 나머지는 이동 중이거나 13시간의 시차의 이상한 경계 상태에 있다.',
        '이 거리에서 사업 그룹을 경영하는 것은 명확한 해결책이 없는 운영상의 도전이다. 한국 대기업의 플레이북은 한국에 한국인 리더십이 있다고 가정한다. 미국 지주회사의 플레이북은 자회사도 미국이라고 가정한다. 우리는 그 두 플레이북 사이의 공간에서, 진행하면서 프로세스를 구축하고 있다.',
        h2('시차가 실제로 비용에 미치는 영향'),
        '13시간 차이는 LA 업무 시간과 서울 업무 시간이 거의 겹치지 않는다는 것을 의미한다. 같은 사무실에서 30분의 대면 대화로 이루어질 결정이 그 거리로 분리됐을 때 3일의 비동기 메시지 체인이 걸린다. 이 세금은 어떤 스프레드시트에도 보이지 않지만 현실이고, 복리로 쌓인다.',
        h2('한국 비즈니스 문화와 미국 비즈니스 문화가 각각 옳게 보는 것'),
        '한국 비즈니스 문화는 장기 관계 투자에 더 낫다. 즉각적인 수익을 내지 않는 관계, 수년에 걸쳐 신뢰에 투자하는 의지는 미국 비즈니스 문화가 종종 인내심이 부족한 것이다.',
        '미국 비즈니스 문화는 명시적 커뮤니케이션에 더 낫다. 직접적인 불일치 표현, 한국 비즈니스가 때로 요구하는 복잡한 체면 유지 구조 없이 작동하지 않는 것을 말하는 의지 — 이것은 더 빠른 방향 수정을 만든다.',
        '우리가 구축한 종합 — 직접 커뮤니케이션 규범을 가진 장기 관계 투자 — 은 어느 문화만보다 진정으로 낫다고 생각한다.'
      ),
    },
    {
      title_en: 'The Asymmetric Bet: How We Think About Starting New Businesses',
      title_ko: '비대칭 베팅: 새 사업을 시작하는 방법에 대해 생각하는 방식',
      slug: 'the-asymmetric-bet',
      published_at: '2026-07-15T09:00:00Z',
      author_note: 'The framework that has served us better than any other single idea.',
      body_en: blocks(
        'We use the phrase "asymmetric bet" internally at 한아원 to describe businesses where the downside is contained but the upside is not. Every business we have started in the last five years has had to pass an asymmetric bet test before we committed resources.',
        'The concept is simple and well-known in investing circles. In practice it is remarkably hard to apply because most business opportunities feel symmetric when you are in the middle of evaluating them. The discipline of asking "what does a bad outcome actually look like, and can we survive it?" before "what does a good outcome look like?" changes the quality of decisions significantly.',
        h2('What made GLP-1 market intelligence an asymmetric bet'),
        'When we started building the GLP-1 intelligence platform, the worst-case scenario was that we would have spent six months building something that only we used — which would still have improved our internal decision-making and cost us relatively little, since we were building on infrastructure we already had.',
        'The best-case scenario, which we are now tracking toward, is a market intelligence product in a category that is growing extremely fast globally, with data advantages that competitors cannot easily replicate because they do not have our distribution network.',
        'The asymmetry: bounded downside, unbounded upside. That is the shape we look for.',
        h2('How YUNÉ passed the test'),
        'YUNÉ, our wellness brand, started with a question: we have deep relationships with pharmacists who trust us and customers who trust the pharmacist. Can we put a product in that channel that fits that trust relationship?',
        'The downside was a small product development investment that would either work or become a lesson. The upside was a brand with a distribution moat that would be very hard for a competitor to enter — because they would need to build the pharmacy network trust from scratch, which takes years.',
        h2('The bets we did not take'),
        'The asymmetric bet framework is as useful for what it eliminates as for what it approves. We have passed on several opportunities that looked large because the downside scenarios required us to bet the underlying businesses that generate our stable cash flow. No market opportunity is large enough to justify betting the foundation.',
        'This sounds obvious. It is not, in practice, when a market is moving fast and the pressure to move with it is real. The framework provides the discipline that the moment cannot.'
      ),
      body_ko: blocks(
        '우리는 한아원 내부에서 "비대칭 베팅"이라는 표현을 하방이 제한되지만 상방이 그렇지 않은 사업을 설명하는 데 사용한다. 지난 5년간 시작한 모든 사업은 자원을 투입하기 전에 비대칭 베팅 테스트를 통과해야 했다.',
        '개념은 단순하고 투자계에서 잘 알려져 있다. 실제로 적용하기는 놀랍도록 어렵다. 대부분의 사업 기회가 평가하는 중에는 대칭적으로 느껴지기 때문이다. "좋은 결과는 어떤 모습인가?" 전에 "나쁜 결과는 실제로 어떤 모습이고 우리가 살아남을 수 있는가?"를 묻는 규율이 결정의 질을 상당히 바꾼다.',
        h2('GLP-1 시장 인텔리전스가 비대칭 베팅인 이유'),
        'GLP-1 인텔리전스 플랫폼을 구축하기 시작했을 때, 최악의 시나리오는 우리만 사용하는 것을 구축하는 데 6개월을 보내는 것이었다 — 그래도 내부 의사결정을 개선하고 이미 가진 인프라에 구축하기 때문에 비용이 상대적으로 적었을 것이다.',
        '최선의 시나리오는 전 세계적으로 매우 빠르게 성장하는 카테고리에서 시장 인텔리전스 제품을 갖는 것이다. 비대칭성: 제한된 하방, 무한한 상방.',
        h2('YUNÉ가 테스트를 통과한 방법'),
        'YUNÉ, 우리의 웰니스 브랜드는 질문으로 시작됐다: 우리를 신뢰하는 약사와 약사를 신뢰하는 고객과 깊은 관계가 있다. 그 신뢰 관계에 맞는 제품을 그 채널에 넣을 수 있는가?',
        '하방은 작은 제품 개발 투자였다. 상방은 경쟁자가 들어가기 매우 어려운 유통 해자를 가진 브랜드였다. 비대칭 베팅 프레임워크는 그것이 승인하는 것만큼이나 그것이 제거하는 것에도 유용하다.'
      ),
    },
  ].map(p => ({
    ...p,
    category: { _type: 'reference', _ref: catRef },
  }))
}

// ─── Step 3: Cover images per post ──────────────────────────────────────────
const coverImages = {
  'why-we-built-a-group-instead-of-a-startup':     'photo-1486406146926-c627a92ad1ab', // modern city building, group/structure
  'building-ax-hub-why-we-started-writing-our-own-software': 'photo-1461749280684-dccba630e2f6', // code on screen, software
  'what-pharmaceutical-distribution-taught-me-about-business': 'photo-1584308666744-24d5c474f2ae', // pharmacy, medical
  'the-retail-pharmacy-as-a-platform':             'photo-1576671081837-49000212a370', // pharmacy interior, health
  'running-a-korean-business-group-from-america':  'photo-1601597111158-2fceff292cdc', // seoul city skyline
  'the-asymmetric-bet':                            'photo-1611974789855-9c2a0a7236a3', // chess or strategic thinking
}

async function downloadImage(photoId, dest) {
  const url = `https://images.unsplash.com/${photoId}?w=1200&h=630&fit=crop&q=85`
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    function fetchUrl(u) {
      httpsGet(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close(); fetchUrl(res.headers.location)
        } else {
          res.pipe(file)
          file.on('finish', () => { file.close(); resolve() })
        }
      }).on('error', (e) => { try { unlinkSync(dest) } catch {} reject(e) })
    }
    fetchUrl(url)
  })
}

async function run() {
  // 1. Create category
  const catId = await createCategory()
  const catRef = catId

  // 2. Upload posts
  const posts = getPosts(catRef)
  console.log(`\nUploading ${posts.length} Company posts...`)
  const uploadedIds = {}

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
      uploadedIds[post.slug] = created._id
      console.log(`✓ "${post.title_en}"`)
    } catch (err) {
      console.error(`✗ "${post.title_en}": ${err.message}`)
    }
  }

  // 3. Upload cover images
  console.log('\nUploading cover images...')
  for (const [slug, photoId] of Object.entries(coverImages)) {
    const postId = uploadedIds[slug]
    if (!postId) { console.log(`⚠ No post ID for ${slug}`); continue }

    const tmpFile = join(tmpdir(), `company-${slug}.jpg`)
    process.stdout.write(`⬇  ${slug}...`)
    try {
      await downloadImage(photoId, tmpFile)
      const asset = await client.assets.upload('image', readFileSync(tmpFile), {
        filename: `${slug}.jpg`, contentType: 'image/jpeg',
      })
      await client.patch(postId).set({
        cover_image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          hotspot: { x: 0.5, y: 0.5, height: 1, width: 1 },
        },
      }).commit()
      console.log(` ✓`)
      try { unlinkSync(tmpFile) } catch {}
    } catch (err) {
      console.error(` ✗ ${err.message}`)
    }
  }

  console.log('\nAll done.')
}

run().catch(console.error)
