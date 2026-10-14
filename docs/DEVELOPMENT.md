# Novel Studio 开发手册

版本：2026-10-14，适用于 v0.1.0 原型。本手册明确区分已实现功能与未来计划。

## 1. 目标与边界

Novel Studio 是中文小说创作辅助工作台。作者亲自写正文，软件用于管理世界观、人物关系、剧情时间线、事件因果和伏笔，并在将来由 DeepSeek 帮助审查逻辑。

产品原则：
- 作者决定正式设定；AI 提出的任何结论都是建议，不得无确认地改写正文。
- 因果连线需要明确理由，不能用事件先后代替因果关系。
- 本地优先，支持导出备份，尽可能隐藏技术细节，不要求用户掌握 Obsidian。
- 不自动上传作品、不公开用户的私人稿件。
- 导入其他工具的数据之前先预览，避免丢失无法识别的字段。

## 2. 现有技术架构

当前原型是一个独立的 index.html，内含 HTML、CSS、原生 JavaScript，无第三方依赖，无实际后端。

~~~text
index.html
  ├─ 导航：总览 / 人物关系 / 剧情因果 / 时间线 / 章节管理 / 世界观 / AI 顾问
  ├─ 状态：data { title, characters, locations, scenes, causes }
  ├─ 渲染：home() / relationships() / causality() / timeline() / chapters() / world() / ai()
  ├─ 编辑：addScene() / addCharacter() / addCause() / saveScene() 等
  ├─ 存储：浏览器 localStorage，键 storyline-studio-lite-v1
  ├─ 导入：选择目录 → File.text → parseMd → parseFiles
  ├─ 备份：JSON Blob 下载
  └─ AI：promptText() 产生审查提示词，需用户手工复制到 DeepSeek
~~~

浏览器渲染使用字符串模板与 innerHTML。修改任何用户输入的输出点时，必须做 HTML 转义，避免 XSS。后续建议迁移到 React + TypeScript 的组件结构和严格的模型校验。

## 3. 环境和启动

直接双击根目录 index.html，建议使用 Chrome 或 Edge。可选使用本地 HTTP 服务：

~~~sh
python -m http.server 4173
~~~

随后打开 http://localhost:4173 。该服务只是静态文件服务，不是软件后端。

开发校验需要 Node.js 18+：

~~~sh
npm run check
~~~

该脚本检查 HTML 入口、JavaScript 语法和必要功能标记；它不等同于浏览器端到端测试。

## 4. 数据流和文件兼容

首次启动使用演示项目；若浏览器存储中有草稿则优先读取。修改数据后调用 persist() 保存，render() 刷新界面。

选择 StoryLine 文件夹时，仅读取 Markdown 源文件。识别基本的项目、场景、人物和地点 YAML frontmatter。用户确认后会替换当前浏览器草稿，**不会修改原始 Markdown 文件**。导入器仅是简化 YAML 解析器：不支持全部 YAML 特性，复杂 Codex、媒体、深层关系历史和 Plotgrid 可能丢失，应提示用户核对。

导出备份生成带 format/version/exportedAt 的 JSON。目前 UI 只有 JSON 导出，**尚未实现 JSON 恢复入口**；不得向用户宣称可以一键恢复。

详细字段见 docs/DATA_FORMAT.md。

## 5. UI 模块与职责

| 模块 | 当前实现 | 下一步 |
|---|---|---|
| 总览 | 项目计数和快捷入口 | 多作品管理、搜索 |
| 人物关系 | 档案编辑与 SVG 图 | 拖动布局、关系历史 |
| 剧情因果 | 场景与有向因果边 | 图编辑、边分类、影响追踪 |
| 时间线 | 基于顺序字段排序 | 故事时间与叙事时间分离 |
| 章节管理 | 场景与正文编辑 | 长文性能、撤销与版本 |
| 世界观 | 地点清单 | 国家、势力、规则、分层地图 |
| DeepSeek 顾问 | 复制提示词 | 授权检索、证据审查、待批准建议 |

## 6. 核心数据设计

草稿主模型包含：
- characters：姓名、角色定位、内在动机、关系数组。
- locations：地点名称、类型与描述。
- scenes：稳定 id、标题、章幕、sequence、chronologicalOrder、人物、地点、正文等。
- causes：from、to、reason，引用 scenes 的 id。

人物关系图与事件因果图彼此独立；未来增加场景对人物状态的变化记录时，应提供有效时间与证据来源。场景标题可以重命名，但内部稳定 id 不能跟着任意变化。

## 7. 下一代独立桌面架构（规划中）

建议 Tauri 2 + React + TypeScript + SQLite。此建议尚未实施。可将代码划分为：

~~~text
desktop/
  src/features/characters/
  src/features/world/
  src/features/scenes/
  src/features/causality/
  src/features/timeline/
  src/features/ai-review/
  src/features/import-export/
  src/shared/
  src-tauri/
~~~

桌面端负责原子文件写入、版本迁移、可恢复备份和安全存储；UI 只呈现必要的小说创作概念，不向普通用户暴露 Markdown 结构或技术术语。

因果边建议进一步分为 causes、enables、blocks、motivates、reveals、foreshadows、pays_off，附带理由、来源、状态（建议/已确认）和作者批准记录。任何模型推断都不能直接变成正式设定。

## 8. DeepSeek 接入标准（规划中）

API Key 不得写进静态前端代码；未来由桌面后端保存在系统安全存储中。用户必须自行选择允许模型读取的场景或设定。AI 的输出应包含问题、证据、受影响位置和修复方向；默认只读，经差异预览与作者明确批准才允许修改数据。

必须处理请求超时、取消、上下文长度、费用提示、日志脱敏及恶意文本注入。禁用 AI 时全部本地规划功能仍应可用。

## 9. 本地测试与发布

最低检查：
1. 执行 npm run check 成功。
2. Chrome/Edge 打开 index.html，七个导航及 Alt+1~7 可用。
3. 创建人物、建立关系、编辑场景、建立因果边并刷新。
4. 导出 JSON 确认含有 scenes、characters、causes。
5. 测试只读导入，原 Markdown 文件内容保持不变。
6. 打开 AI 顾问，确认不会未经操作自动调用网络 API。

发布前应增加端到端测试、数据迁移测试、跨操作系统测试，不能只依赖语法检查。

## 10. 安全和许可

不要向公开仓库提交 API Key、真实小说稿、浏览器数据或私密备份。StoryLine 原插件为 PixeroJan/obsidian-storyline（MIT），但本仓库的 HTML 是独立实现，未复制该插件代码，也不是其官方桌面版本。若未来引入第三方代码，需要逐项记录来源并保留版权声明。
