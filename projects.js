// 作品の追加・削除は、この配列の1ブロックを増減するだけです。
const projects = [
  {
    id: 'star-collect',
    category: 'game',
    featured: true,
    label: 'GAME · UNITY · C#',
    title: 'Star Collect',
    period: '2026.04 — Current',
    production: 'team',
    team: 'チーム制作(エンジニア3人、デザイナー2人、3Dモデラー1人)',
    role: 'PM / 企画 / 実装 / 表現設計',
    teamContribution: 'PMとしての進行・仕様調整、ゲームの企画、星の収集システムの実装、表現実装を担当しています。',
    tools: 'Unity / C# / Shader',
    status: 'IN PROGRESS',
    summary: '星を集めて能力や衣装を強化し、失われた星座と星空を取り戻すゲーム。世界観に合う表現と操作感を目指し、チームで仕様について話し合いを重ねながら制作を進めています。',
    focus: {
      commitment: {
        text: [
          'オブジェクトの大きさや移動速度に応じて波紋の大きさを変わる表現を、Render Textureと専用カメラを使用して実装した',
          '水の浮力の表現について厳密な計算を再現すると工数に用途が見合わないので、物体の形や接触面積を厳密に計算せず、物体サイズと速度によって近似した挙動を実現した'
        ]
      },
      challenge: {
        text: [
          '水面をまたぐ物体の輪郭まで歪むことや、透明物と水面の描画順が干渉する課題に対して、URP描画パイプラインやShader Graphについてキャッチアップしながら解決した',
        ]
      }
    },
    future: {
      text: [
        '世界観を表現するための演出や表現をさらに考案・追加する',
        'デザイナーが考案したデザインを、世界観にあう形で意図通り実装する',
        'リリースして他の人にプレイをしてもらい世界観・体験を届ける'
      ]
    },
    video: 'https://youtu.be/--7eZy8b9sw'
  },
  {
    id: 'ghost-chase',
    category: 'game',
    label: 'GAME · UNITY · C# · NETWORK',
    title: 'Ghost Chase',
    period: '2025.12 — 2026.01',
    production: 'individual',
    team: '個人制作 / 研究会',
    role: '企画 / 実装全般(クライアント・通信・UI) / デザイン',
    tools: 'Unity / System.Net.Sockets / Firebase',
    summary: 'UDP通信とTCP通信を切り替えながら遊べる、3Dオンライン鬼ごっこゲーム。プレイヤーが通信方式を切り替え、ゲーム内で生じる操作感の違いを体験できるように実装しました。',
    focus: {
      commitment: {
        text: [
          '既存のライブラリを使用せずSystem.Net.Socketsを使ってUDP通信とTCP通信を実装',
          'Firebase Realtime Databaseを使い、ルーム番号でリアルタイムにルームへ参加する機能を実装',
          '送受信、通信制御、UI、移動制御をイベント駆動で連携する設計に整理'
        ]
      },
      challenge: {
        text: [
          '通信・UI・移動制御を一つのスクリプトに書いたことで、原因調査や修正の影響範囲の把握が難しくなった。そこでUI・通信・移動などのコードの役割を見直してスクリプトを分割し、イベント駆動で連携する構成へリファクタリングしたことで、各機能を個別に修正・確認しやすくした。',
        ]
      }
    },
    future: {
      text: [
        '設計原則や責務分割を学び、次の開発から初期設計に反映する',
        '鬼ごっこゲームとしての面白さを高めるため、移動速度やゲームルールを調整する',
        'ポート開放不要でゲームをプレイできるようにする',
      ]
    },
    video: 'https://youtu.be/7WH7MQGE5Eg'
  },
  {
    id: 'mizu-tamarium',
    category: 'game',
    featured: true,
    label: 'GAME · UNITY · C#',
    title: '水たまりうむ',
    period: '2025.05 — 2025.06',
    production: 'individual',
    team: '個人制作',
    role: '企画 / 実装全般(クライアント・UI) / デザイン',
    tools: 'Unity / C# / Shader',
    summary: '水たまりの中と現実世界を行き来し、上下反転と浮力を使って仕掛けを解くパズルアクションゲーム。水中に入った感覚が伝わる表現と、世界観に合う操作体験を追求しました。',
    focus: {
      commitment: {
        text: [
          '水の揺らぎ・上下反転・泡のエフェクト・効果音を組み合わせ、水たまりの中に入った感覚を表現',
          '浮力と重力を使い、箱を動かして解くパズルギミックを実装'
        ]
      },
      challenge: {
        text: [
          '水の揺らぎを加えるフィルターを使用したかったものの、短期間かつShader未経験でした。そこで自作にこだわりすぎず、既存アセットを解析し、色や歪み、インタラクションを調整しました。',
        ]
      }
    },
    future: {
      text: [
        '引き操作の当たり判定や操作感を改善',
        '激しく動くと泡が出るなど、水中の表現をさらに向上させる'
      ]
    },
    video: 'https://youtu.be/7bQe_qCWa3A'
  },
  {
    id: 'capirit',
    category: 'game',
    label: 'GAME · UNITY · TEAM DEVELOPMENT',
    title: 'Capirit',
    period: '2025.12 — Current',
    production: 'team',
    team: '14人チーム(デザイナー4人、プランナー4人、エンジニア8人(兼任あり))',
    role: 'キャラクターデザイン / UI設計・実装 / エフェクト',
    teamContribution: 'キャラクター・ステージアイテムデザインと、エネミー挙動、ステージ選択画面のUI設計・実装、壁を通過した際・破壊した際のエフェクトを担当しています。',
    tools: 'Unity / C# / AI Navigation / DOTween',
    status: 'IN PROGRESS',
    summary: '「乗っ取り」をテーマにしたスマートフォン向けゲーム。デザインと実装の橋渡しを意識し、ステージ選択画面、状態変化の見た目、壁エフェクトなどを担当しています。',
    focus: {
      commitment: {
        text: [
          '達成感を出すため、新たにステージを解放する際、道が伸びて対象ステージにつながる演出を追加した',
          '通過エフェクトをプレイヤー側で保持し、再生処理を切り替えることで負荷を軽減した'
        ]
      },
      challenge: {
        text: [
          '実際のステージデータが未確定で、ステージ数が増えたときにUIの表示や動きが崩れる懸念があった。そこでモックの開放状況を用意した上でステージUIの配置・開放演出・選択時の表示と挙動を分離した。想定する上限数まで対応できる構成にすることで、後からステージが増えても対応しやすくした。',
          '通り抜けられる壁を通過時にエフェクトが見えない問題があった。他のメンバーとの対話を重ねながら、エフェクトのサイズ・再生速度・発生位置を調整し最も良い形を模索した。'
        ]
      }
    },
    future: {
      text: [
        '手元でのプレイテストを重ね、UIやエフェクトの見え方を改善する',
        '世界観がより伝わるように表現を実装しながら、ゲームとして完成を目指す',
      ]
    },
    video: 'https://youtu.be/Wj0-vsLCUQc'
  },
  {
    id: 'areshiro-koreshiro',
    category: 'game',
    featured: true,
    label: 'GAME · UNITY · C#',
    title: 'あれしろこれ白？',
    period: '2026.07 — 2026.08',
    production: 'team',
    team: '3人チーム(デザイナー2人、エンジニア1人) / Unity 1週間ゲームジャム',
    role: 'プロジェクト進行 / 実装全般 / UI・演出調整',
    teamContribution: 'PMとしてプロジェクト進行や仕様調整、企画を行い、ゲームシステムや表現などの実装全般を担当しました。',
    tools: 'Unity / C#',
    summary: '彼女が求める「白」を見極める、会話と選択を軸にした色当てゲーム。短期間のチーム開発の中で、ゲーム内容からUI・演出まで統一感のある体験をつくりました。',
    focus: {
      commitment: {
        text: [
          '選択したアイテムの正解数に応じて、3種類のエンディングへ分岐するゲーム進行を実装',
          'ゲーム内容、UI、トランジションの方向性を揃え、統一感のある体験に仕上げた'
        ]
      },
      challenge: {
        text: [
          '1週間という短期間で完成させるため、Prefab化やシーン構成の統一により可能な限り工数を抑えた。',

        ]
      }
    },
    future: {
      text: [
        'ダイアログの「次へ・前へ」を大きくし、左右領域のクリックでも送れるようにする',
        '開発の早い段階からプレイテストを行い、操作性を検証する'
      ]
    },
    video: 'https://youtu.be/QN-9gB9LVgw'
  },
  {
    id: 'candy-catcher',
    category: 'game',
    label: 'GAME · UNITY · GAMECANVAS',
    title: 'Candy Catcher',
    period: '2024.12 — 2025.01',
    production: 'individual',
    team: '授業制作',
    role: '企画 / 実装 / イラスト・UI制作',
    tools: 'Unity / GameCanvas / C#',
    summary: 'クレーンゲームをモチーフに、障害物を避けながらキャンディを集めるアクションゲーム。初めてのUnity制作で、遊びの設計から実装、ビジュアル制作まで取り組みました。',
    focus: {
      commitment: {
        text: [
          'キャラクターのアニメーションやクレーンの動きなどを違和感なく実装した',
          'クレーンの追尾と落下、掴む動作のタイミングやサウンドのタイミングを調整した'
        ]
      },
      challenge: {
        text: [
          '初めてのUnity作品として、授業用ライブラリのみを使用してアニメーションや押し引きなどを実装した',
        ]
      }
    },
    future: null,
    video: 'https://youtu.be/Y0UVoijAzCc'
  },
  {
    id: 'tartaglia-rush',
    category: 'game',
    label: 'GAME · PYTHON · PIXEL',
    title: 'Tartaglia Rush!',
    period: '2024.10 — 2025.01',
    production: 'individual',
    team: '授業制作',
    role: '企画 / 実装 / ドット絵制作',
    tools: 'Python / Pixel',
    summary: '弓・剣・必殺スキルを使い分け、迫る敵を倒していくインベーダーゲーム。キャラクターの特徴が操作にも表れるよう、企画から実装、ドット絵まで一貫して制作しました。',
    focus: {
      commitment: {
        text: [
          'アイテムを拾うことで、弓・剣の二つの攻撃モードを切り替える複数の攻撃手段を実装した',
          '原作を可能な限り再現するため、当たり判定の大きい鯨が前進する必殺技を実装した',
          '攻撃、移動、エネミー、障害物、背景などの複数の要素を制御した'
        ]
      }
    },
    future: null,
    video: '',
    thumbnails: [
      'assets/images/tartaglia_rush.png'
    ]
  },
  {
    id: 'miku-talk',
    category: 'game',
    label: 'APP · AI · VOICE INTERACTION',
    title: 'Miku_Talk',
    period: '2026.02 — Current',
    production: 'individual',
    team: '個人制作',
    role: '企画 / フロントエンド / バックエンド',
    tools: 'Unity / OpenAI API / 音声合成',
    status: 'IN PROGRESS',
    summary: '初音ミクと音声で会話できるデスクトップマスコットを目指したアプリ。AIによる応答生成と音声読み上げ、3Dキャラクターの動きを組み合わせ、キャラクターとの自然な対話体験を試作しています。',
    focus: {
      commitment: {
        text: [
          'AIの返答を音声で読み上げるだけだと会話している感覚にならないため、uLipSyncを用いて発話に合わせた口の動きや揺れを追加した',
          'テキスト入力と音声入力を切り替えられるように実装した'
        ]
      },
      challenge: {
        text: [
          '3Dキャラクターモデルが表示されない箇所や思ったようなアニメ調にならない問題があったが、VRChat改変の知識を応用してlilToonシェーダーを使用し、見え方を調整した',
          'キャラクターの動きを入れたい一方で、等身キャラクターのアニメーションを一から作成するには工数がかかるため、MMDモデルやアニメーションを用いて実現した',
          '現在使用している音声合成のAPIは応答時間が長いため、軽量なAPIやローカル実行などを試しながら理想の音声と速度を両立できる手段を模索中'
        ]
      }
    },
    future: {
      text: [
        '理想の音声と速度を両立できる方法を選択する',
        '発話に同期するアニメーションや表情を追加する',
        'なでなでなどのインタラクションを実装し、デスクトップマスコットとして発展させる'
      ]
    },
    video: 'https://youtu.be/dAg09KIpB3k'
  },
  {
    id: 'gamers-hub',
    category: 'web',
    label: 'WEB · RUBY ON RAILS',
    title: 'Gamer’s Hub',
    period: '2025.12 — 2026.01',
    production: 'individual',
    team: '授業制作',
    role: '企画 / フロントエンド / バックエンド',
    tools: 'Ruby on Rails',
    summary: 'ゲーム好きのための、対戦相手・フレンド募集SNS。募集内容をテンプレート化し、投稿時の入力負荷を減らすことで、必要な相手をすばやく探せる体験を設計しました。',
    focus: {
      commitment: {
        text: [
          '募集投稿の入力負荷が高いと利用されにくいと考え、必要情報を可能な限り選択式に整理した',
        ]
      },
    },
    future: null,
    thumbnails: [
      'assets/images/gamers_hub.png',
      'assets/images/gamers_hub_post.png',
      'assets/images/gamers_hub_profile.png',
      'assets/images/gamers_hub_search.png'
    ],
    video: ''
  },
  {
    id: 'hello-mate',
    category: 'web',
    label: 'WEB · AI · HACKATHON',
    title: 'Hello Mate',
    period: '2026.03',
    production: 'team',
    team: '4人チーム(エンジニア4人) / GDGoC Japan Hackathon',
    role: 'プロジェクト進行・調整 / AIを使用した機能実装',
    teamContribution: 'AIを使用したチャット・レコメンド機能のバックエンド・フロントエンド実装と、全体のタスク管理や不具合対応・調整を担当しました。',
    tools: 'Gemini API / TypeScript',
    summary: 'AIがプロフィールを整理し、共通点のある友達探しを支援するプラットフォーム。会話の話題・返信候補・返信文の生成で、初対面の人と話し始めるハードルを下げました。開催地AI賞を受賞。',
    focus: {
      commitment: {
        text: [
          '手軽さを出すためプロフィール・友達情報の入力、話題提案・返信候補・返信文生成をGemini APIを用いて実装',
          'より親しみやすさを出すため3Dキャラクターを表示する案を出し、チームで協力してキャッチアップしながら組み込んだ'
        ]
      },
      challenge: {
        text: [
          'チャットの質問と返答をすべてAPI経由で行うと待ち時間が長い問題があったので、どの内容をAPI経由で動的に変化させるべきかを考え、必要に応じて固定文にした上で「考え中」などの表示を行うことで解決した',
          '初めてのチームでのWeb制作でアーキテクチャの統一などをせずに、機能ごとの役割分担をしたので機能を合わせる時に問題が生じた。設計統一の重要性を実感して、再度全員で統一した設計で作り直した',
          'AI支援を用いたマージ後にAPI構造が壊れ、動作しなくなった。プロジェクト構造と変更内容を確認し、API構成を復旧することで解決した'
        ]
      }
    },
    future: null,
    video: 'https://youtu.be/yV1of-Gn3vY'
  },
  {
    id: 'tanabata-festival-site',
    category: 'web',
    label: 'WEB · WIX · TEAM DEVELOPMENT',
    title: '学園祭第36回公式HP',
    period: '2024.10 — 2025.07',
    production: 'team',
    team: 'チーム制作 / 七夕祭実行委員会',
    role: 'HP作成タスクリーダー / デザイン',
    teamContribution: 'HP制作チームの進行管理、掲載内容連携、Wix実装、デザイン調整を担当しました。',
    tools: 'Wix',
    summary: '慶應義塾大学SFC・第36回七夕祭の公式サイト。タスクリーダーとして進行と実装、デザインや他チームとの連携を行いながら、事前から当日の情報を発信するサイトを制作しました。',
    focus: {
      challenge: {
        text: [
          'Wixの仕様上画面サイズによってデザイン案と実際のWix上の見え方に差が出るため、デザインチームと連携して変更・調整しながら実装した',
          'チームメンバーは技術力やコミットできる時間が様々でHTML・CSSでの実装は難しかったため、全員が使用できるWixを使用して作業手順などをドキュメント化してタスクへの取り組みを容易にした'
        ]
      }
    },
    future: null,
    video: '',
    thumbnails: [
      'assets/images/tanabata_top.png',
    ]
  }
];
