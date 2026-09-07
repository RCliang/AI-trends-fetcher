const articles = [
  { topic: '模型', source: 'OPENAI', type: '官方发布', time: '2 小时前', title: 'OpenAI 发布新一代推理模型：把复杂任务交给更长的思考', desc: '推理能力、工具调用与成本控制的最新进展，以及它会如何改变开发者的工作流。', color: 'orange', badge: '深度解读' },
  { topic: 'Agent', source: 'ANTHROPIC', type: '官方发布', time: '4 小时前', title: '让模型真正「用好电脑」：Computer Use 的下一步', desc: '从视觉理解到可靠执行，Agent 距离可托付的数字同事还有多远？', color: 'purple', badge: '产品' },
  { topic: '开源', source: 'GITHUB', type: 'TRENDING', time: '5 小时前', title: '这周最火的 10 个 AI Agent 开源项目', desc: '从多智能体协作到浏览器自动化，开发者正在构建什么？', color: 'black', badge: '开源雷达' },
  { topic: '研究', source: '机器之心', type: '技术解读', time: '6 小时前', title: '一文看懂大模型的「记忆」难题，研究者找到了新解法', desc: '长期记忆不只是塞进更长上下文：新架构如何让模型学会遗忘与检索。', color: 'red', badge: '研究' },
  { topic: '产业', source: 'THE VERGE', type: 'AI NEWS', time: '8 小时前', title: 'AI 产品开始走出聊天框，下一站是每一个工作流', desc: '生成式 AI 的界面正在被重写，用户习惯也将随之改变。', color: 'blue', badge: '行业' },
  { topic: '产业', source: '量子位', type: '行业新闻', time: '10 小时前', title: '大模型应用进入深水区，企业到底在为什么付费？', desc: '从试点到规模化部署，国内市场呈现出新的需求信号。', color: 'green', badge: '产业' }
];
const radar = [['Agent 框架', '1,842', '+28%'], ['推理模型', '1,376', '+19%'], ['本地部署', '984', '+15%'], ['多模态', '762', '+12%'], ['MCP', '649', '+31%']];
const articleList = document.querySelector('#article-list');
const radarList = document.querySelector('#radar');

function renderArticles(topic = 'all') {
  articleList.innerHTML = articles.filter(a => topic === 'all' || a.topic === topic).map((a, index) => `<article class="story ${index === 0 ? 'fresh' : ''}"><div class="source-dot ${a.color}">${a.source.slice(0, 1)}</div><div class="story-main"><div class="meta"><b>${a.source}</b><span>${a.type}</span><time>${a.time}</time></div><h3>${a.title}</h3><p>${a.desc}</p><div class="story-foot"><span class="pill">${a.badge}</span><button class="save" aria-label="收藏 ${a.title}">＋ 收藏</button></div></div><a href="#sources" class="story-arrow" aria-label="查看来源">↗</a></article>`).join('');
}
function renderRadar() { radarList.innerHTML = radar.map(([name, count, growth], i) => `<li><span class="rank">0${i + 1}</span><div><b>${name}</b><small>${count} 条讨论</small></div><em>${growth}</em></li>`).join(''); }
renderArticles(); renderRadar();
document.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => { document.querySelector('.topic-tabs .selected').classList.remove('selected'); button.classList.add('selected'); renderArticles(button.dataset.topic); }));
articleList.addEventListener('click', event => { if (event.target.matches('.save')) { event.target.classList.toggle('saved'); event.target.textContent = event.target.classList.contains('saved') ? '✓ 已收藏' : '＋ 收藏'; } });
document.querySelector('#mark-read').addEventListener('click', () => { document.querySelectorAll('.story').forEach(x => x.classList.remove('fresh')); });
const dialog = document.querySelector('#subscribe-dialog');
document.querySelector('#subscribe-button').onclick = () => dialog.showModal();
document.querySelector('.close').onclick = () => dialog.close();
document.querySelector('#subscribe-form').addEventListener('submit', e => { e.preventDefault(); document.querySelector('#form-message').textContent = '订阅成功，下一封信很快到达。'; e.target.reset(); });
document.querySelector('#theme-toggle').onclick = () => document.body.classList.toggle('light');
