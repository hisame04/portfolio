// モバイル用ナビゲーションの開閉
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});

// フッターの年を自動表示
document.querySelector('#year').textContent = new Date().getFullYear();

// HTML上のセクション順を、ページ表示用に整える
const main = document.querySelector('main');
['.strengths', '.career-section', '.research-section'].forEach((selector) => {
  const section = document.querySelector(selector);
  if (main && section) main.append(section);
});

// projects.js のデータから、作品カード一覧を生成する
const projectList = document.querySelector('.all-works .project-list:not(.extra-project)');
const projectById = new Map(projects.map((project) => [project.id, project]));

// YouTubeの各種URLから動画IDを取り出し、埋め込みURLへ変換する
function getYouTubeId(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.replace('www.', '');
    const id = host === 'youtu.be'
      ? url.pathname.slice(1)
      : host.endsWith('youtube.com')
        ? url.pathname.startsWith('/embed/')
          ? url.pathname.split('/')[2]
          : url.searchParams.get('v')
        : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function toYouTubeEmbedUrl(value) {
  const id = getYouTubeId(value);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
}

const getProjectThumbnails = (project) => Array.isArray(project.thumbnails)
  ? project.thumbnails.filter(Boolean)
  : project.thumbnail ? [project.thumbnail] : [];

const projectPreviewMarkup = (project) => {
  const youtubeId = getYouTubeId(project.video);
  const thumbnails = getProjectThumbnails(project);
  const [thumbnail] = thumbnails;
  if (youtubeId) return `<img class="project-thumbnail" src="https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg" alt="${project.title} の動画サムネイル" loading="lazy"><span class="video-play">▶ PLAY VIDEO</span>`;
  if (thumbnail) {
    const label = project.video
      ? '<span class="video-play">▶ PLAY VIDEO</span>'
      : '<span class="media-view">▣ VIEW MEDIA</span>';
    return `<img class="project-thumbnail" src="${thumbnail}" alt="${project.title} のサムネイル" loading="lazy">${label}`;
  }
  return project.video ? '<span>▶ PLAY VIDEO</span>' : '<span>IMAGE</span><p>ここにサムネイルを配置</p>';
};

const productionLabel = (project) => project.production === 'team' ? 'チーム制作' : '個人制作';
const productionBadgeMarkup = (project) => `<span class="project-production project-production--${project.production}">${productionLabel(project)}</span>`;
const listSummary = (project) => {
  const firstSentenceEnd = project.summary.indexOf('。');
  return firstSentenceEnd === -1 ? project.summary : project.summary.slice(0, firstSentenceEnd + 1);
};

// 作品データ1件を、一覧用カードのHTMLに変換する
const projectMarkup = (project) => `
  <article class="project-card${project.featured ? ' is-featured' : ''}" data-project-id="${project.id}" data-category="${project.category}">
    <div class="project-video ${project.visual || 'visual-system'}">
      ${project.status ? `<span class="project-status">${project.status}</span>` : ''}
      ${projectPreviewMarkup(project)}
    </div>
    <div class="project-detail">
      <div class="project-labels">${productionBadgeMarkup(project)}<p class="tag">${project.label}</p></div><h2>${project.title}</h2>
      <dl class="project-meta"><div><dt>期間</dt><dd>${project.period}</dd></div><div><dt>体制</dt><dd>${project.team}</dd></div><div><dt>担当</dt><dd>${project.role}</dd></div><div><dt>使用技術</dt><dd>${project.tools}</dd></div></dl>
      <p>${listSummary(project)}</p>
    </div>
  </article>`;

if (projectList) {
  projectList.innerHTML = projects.map(projectMarkup).join('');
  projectList.classList.add('is-all-view');
  projectList.dataset.activeFilter = 'all';
}

// 作品詳細・動画再生に使うポップアップを作成する
const detailModal = document.createElement('dialog');
detailModal.className = 'project-modal';
detailModal.tabIndex = -1;
detailModal.innerHTML = '<button class="modal-switch" type="button">メディア ↗</button><button class="modal-close" type="button" aria-label="閉じる">×</button><div class="modal-content"></div>';
document.body.append(detailModal);

const videoModal = document.createElement('dialog');
videoModal.className = 'video-modal';
videoModal.tabIndex = -1;
videoModal.innerHTML = '<button class="modal-switch" type="button">詳細 ↗</button><button class="modal-close" type="button" aria-label="閉じる">×</button><div class="video-modal-content"></div><div class="media-controls" hidden><button class="media-control" type="button" data-direction="previous" aria-label="前のメディア">←</button><span class="media-count"></span><button class="media-control" type="button" data-direction="next" aria-label="次のメディア">→</button></div>';
document.body.append(videoModal);

// 開いている作品の情報と、詳細ポップアップの表示内容
let activeProject = null;
let activeMedia = [];
let activeMediaIndex = 0;
const detailContent = detailModal.querySelector('.modal-content');
const metaMarkup = (project) => `<dl class="project-meta"><div><dt>期間</dt><dd>${project.period}</dd></div><div><dt>制作形式</dt><dd>${productionLabel(project)}</dd></div><div><dt>体制</dt><dd>${project.team}</dd></div><div><dt>ROLE</dt><dd>${project.role}</dd></div><div><dt>使用技術</dt><dd>${project.tools}</dd></div></dl>`;
const teamContributionMarkup = (project) => project.production === 'team' && project.teamContribution
  ? `<section class="team-contribution"><h3>チームでの担当</h3><p>${project.teamContribution}</p></section>`
  : '';
const detailSectionMarkup = (project, key, title) => {
  const content = project[key];
  const text = Array.isArray(content?.text) ? content.text : content?.text ? [content.text] : [];
  if (!content || (!text.length && !content.image)) return '';
  const image = content.image ? `<img src="${content.image}" alt="${content.imageAlt || `${project.title}：${title}`}">` : '';
  const body = text.length ? `<div class="detail-section-copy"><h3>${title}</h3><ul>${text.map((item) => `<li>${item}</li>`).join('')}</ul></div>` : `<div class="detail-section-copy"><h3>${title}</h3></div>`;
  return `<section class="project-detail-section${image ? ' has-image' : ''}">${image}${body}</section>`;
};

const focusSectionMarkup = (project) => {
  const groups = [
    ['commitment', 'こだわり'],
    ['challenge', '課題・解決']
  ].map(([key, title]) => {
    const content = project.focus?.[key];
    const text = Array.isArray(content?.text) ? content.text : content?.text ? [content.text] : [];
    if (!content || (!text.length && !content.image)) return '';
    const image = content.image ? `<img src="${content.image}" alt="${content.imageAlt || `${project.title}：${title}`}">` : '';
    const body = text.length ? `<ul>${text.map((item) => `<li>${item}</li>`).join('')}</ul>` : '';
    return `<div class="project-focus-group"><h4>${title}</h4>${image}${body}</div>`;
  }).join('');
  return groups ? `<section class="project-detail-section project-focus-section"><h3>こだわり・課題解決</h3>${groups}</section>` : '';
};

const openDetailModal = (project) => {
  activeProject = project;
  detailContent.innerHTML = `<p class="tag">${project.label}</p><h2><span class="modal-title">${project.title}</span>${project.status ? `<span class="modal-status">${project.status}</span>` : ''}</h2>${metaMarkup(project)}<section class="modal-summary"><h3>概要</h3><p>${project.summary}</p></section>${teamContributionMarkup(project)}${focusSectionMarkup(project)}${detailSectionMarkup(project, 'future', '今後の取り組み')}`;
  detailModal.showModal();
};

const getProjectMedia = (project) => [
  ...(project.video ? [{ type: 'video', src: project.video }] : []),
  ...getProjectThumbnails(project).map((src) => ({ type: 'image', src }))
];

const renderMedia = () => {
  const content = videoModal.querySelector('.video-modal-content');
  const media = activeMedia[activeMediaIndex];
  const youtubeUrl = media?.type === 'video' ? toYouTubeEmbedUrl(media.src) : null;
  content.innerHTML = media?.type === 'image'
    ? `<img class="media-image" src="${media.src}" alt="${activeProject.title} のスクリーンショット ${activeMediaIndex + 1}">`
    : youtubeUrl
      ? `<iframe src="${youtubeUrl}" title="${activeProject.title} のプレイ動画" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p>${activeProject.title}</p>`
      : media?.type === 'video'
        ? `<video controls autoplay playsinline><source src="${media.src}"></video><p>${activeProject.title}</p>`
        : `<div class="video-placeholder"><span>NO MEDIA</span><p>動画または画像を追加してください。</p></div><p>${activeProject.title}</p>`;

  const controls = videoModal.querySelector('.media-controls');
  controls.hidden = activeMedia.length <= 1;
  controls.querySelector('.media-count').textContent = `${activeMediaIndex + 1} / ${activeMedia.length}`;
};

const openVideoModal = (project) => {
  activeProject = project;
  activeMedia = getProjectMedia(project);
  activeMediaIndex = 0;
  renderMedia();
  videoModal.showModal();
};

// 一覧カードに、動画再生・詳細表示・キーボード操作を設定する
const bindProjectCard = (card) => {
  const project = projectById.get(card.dataset.projectId);
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${project.title}の詳細を表示`);
  const detailButton = document.createElement('button');
  detailButton.className = 'detail-button';
  detailButton.type = 'button';
  detailButton.textContent = '詳細 ↗';
  detailButton.addEventListener('click', (event) => { event.stopPropagation(); openDetailModal(project); });
  card.querySelector('.project-video').append(detailButton);
  card.addEventListener('click', () => openDetailModal(project));
  card.addEventListener('keydown', (event) => {
    if (event.target !== card) return;
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetailModal(project); }
  });
  card.querySelector('.project-video').addEventListener('click', (event) => {
    if (event.target.closest('.detail-button')) return;
    event.stopPropagation();
    if (project.video || getProjectThumbnails(project).length) openVideoModal(project);
    else openDetailModal(project);
  });
};
document.querySelectorAll('.project-card[data-project-id]').forEach(bindProjectCard);

// カテゴリボタンによる作品の絞り込み
document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    const isAll = button.dataset.filter === 'all';
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    projectList?.classList.toggle('is-all-view', isAll);
    if (projectList) projectList.dataset.activeFilter = button.dataset.filter;
    document.querySelectorAll('.project-card[data-project-id]').forEach((card) => {
      card.hidden = !isAll && card.dataset.category !== button.dataset.filter;
    });
  });
});

// ポップアップの閉じる操作と、動画／詳細の相互切替
[detailModal, videoModal].forEach((modal) => {
  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
});
videoModal.querySelector('.modal-switch').addEventListener('click', () => { videoModal.close(); openDetailModal(activeProject); });
detailModal.querySelector('.modal-switch').addEventListener('click', () => { detailModal.close(); openVideoModal(activeProject); });
videoModal.querySelectorAll('.media-control').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.dataset.direction === 'next' ? 1 : -1;
    activeMediaIndex = (activeMediaIndex + direction + activeMedia.length) % activeMedia.length;
    renderMedia();
  });
});

// 操作対象以外をタップした場所から、ローディングと同じ星を散らす
const sparkleLayer = document.createElement('div');
sparkleLayer.className = 'tap-sparkles';
sparkleLayer.setAttribute('aria-hidden', 'true');
document.body.append(sparkleLayer);

const interactiveSelector = 'a, button, input, select, textarea, summary, [role="button"], [contenteditable="true"]';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || prefersReducedMotion.matches || event.target.closest(interactiveSelector)) return;

  const fragment = document.createDocumentFragment();
  const sparkleCount = 6;
  for (let index = 0; index < sparkleCount; index += 1) {
    const sparkle = document.createElement('span');
    const angle = (Math.PI * 2 * index / sparkleCount) + (Math.random() - 0.5) * 0.45;
    const distance = 18 + Math.random() * 38;
    sparkle.className = 'tap-sparkle';
    sparkle.textContent = index % 3 === 0 ? '✧' : '✦';
    sparkle.style.setProperty('--x', `${event.clientX}px`);
    sparkle.style.setProperty('--y', `${event.clientY}px`);
    sparkle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    sparkle.style.setProperty('--dy', `${Math.sin(angle) * distance - 8}px`);
    sparkle.style.setProperty('--delay', `${Math.random() * 55}ms`);
    sparkle.style.setProperty('--size', `${8 + Math.random() * 10}px`);
    fragment.append(sparkle);
  }
  sparkleLayer.append(fragment);
});

sparkleLayer.addEventListener('animationend', (event) => event.target.remove());

// ページ読み込み後、ローディング画面を短く表示してから閉じる
const loader = document.querySelector('.page-loader');
window.addEventListener('load', () => {
  window.setTimeout(() => {
    loader?.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
    loader?.addEventListener('transitionend', () => loader.remove(), { once:true });
  }, 700);
});
