# Novel Studio · 中文小说创作工作台

> 当前版本：**0.1.0 原型**。一个可直接在浏览器中打开的、无需 Obsidian 的中文小说规划工作台。**尚不是完整的 StoryLine 移植版，也不是可安装的桌面程序。**

## 项目定位

面向自己写小说、需要**世界观可视化、人物关系、事件因果和一致性审查**的作者。AI 应当帮助检查逻辑、提出建议，而不是默认自动代写正文。

本项目由早期 StoryLine Studio 中文独立原型整理而来。与 [PixeroJan/obsidian-storyline](https://github.com/PixeroJan/obsidian-storyline) 无官方隶属关系；本仓库**没有复制其插件源码**。后续可根据 MIT 许可证及署名要求，研究与 StoryLine 数据的兼容。

## 立即体验

1. 下载本仓库（**Code → Download ZIP**），解压。
2. 用最新版 Chrome 或 Edge 打开根目录的 `index.html`。
3. 默认载入虚构示例项目「北境纪元」，可编辑人物、场景与因果关系。
4. 点击“**导入 StoryLine 文件夹**”可只读导入部分 Markdown 人物／地点／场景数据。
5. 使用“**导出备份**”保存 JSON。当前草稿仅存于浏览器 `localStorage`，**浏览器缓存不是可靠的唯一备份**。

快捷键：`Alt + 1～7` 切换总览、人物关系、剧情因果、时间线、章节管理、世界观及 DeepSeek 顾问模块。

## 目前提供

- 简体中文界面；无需安装 Obsidian。
- 人物档案与关系网络图。
- 场景/事件因果图（人工建立“原因 → 结果”与理由）。
- 时间线、章节草稿编辑、地点记录。
- StoryLine Markdown 文件夹的**有限只读导入**。
- 生成可复制到 DeepSeek 网页的逻辑审查提示词；**没有实际调用 AI API**。
- 浏览器本地草稿和 JSON 导出备份。

## 当前限制（请先阅读）

- 无本地安装包、无多用户、多设备同步、云端存储或自动更新。
- 无完整的 StoryLine Codex、复杂 YAML、媒体、关系历史及 Plotgrid 兼容性。
- 不支持写回 StoryLine 文件夹；导入过程中不改动源文件。
- 不会自动向 DeepSeek 发送正文；需要用户自行复制粘贴。
- 因果关系由作者明确添加，不是模型自动验证过的逻辑事实。
- 清理浏览器站点数据、换浏览器/设备可能丢失草稿；请定期导出 JSON。

## 开发与文档

| 文件 | 内容 |
| --- | --- |
| [开发手册](docs/DEVELOPMENT.md) | 开发环境、现有架构、数据流、扩展方式、测试、安全要求 |
| [数据兼容说明](docs/DATA_FORMAT.md) | 草稿 JSON、StoryLine Markdown 导入字段和约束 |
| [路线图](docs/ROADMAP.md) | 从 HTML 原型迭代到独立桌面版的阶段计划 |
| [使用手册](docs/USER_GUIDE.md) | 非技术用户的操作步骤、快捷键、备份与导入 |
| [参与开发](CONTRIBUTING.md) | 提交规范、质量要求和功能边界 |

### 开发者快速检查

需要 Node.js 18 或更高版本，仅用于静态语法及结构检查：

```bash
npm run check
```

应用本身是**单个 HTML 文件**，无打包依赖；可直接双击 `index.html` 使用。为获得更稳定的浏览器行为，可在项目根目录执行 `python -m http.server 4173`，打开 http://localhost:4173 。

## 数据与隐私

原型未设置服务器，也没有自动请求 AI 服务。小说草稿默认只存在当前浏览器的本地存储中；点击打开 DeepSeek 网页后，**只有你自行粘贴的内容**才会提交给 DeepSeek。不要将 API Key 或私人小说草稿直接提交到公开仓库。

## 许可证与上游说明

本仓库代码按 [MIT License](LICENSE) 发布。原始 [StoryLine 插件](https://github.com/PixeroJan/obsidian-storyline) 也采用 MIT 许可证，但**这是两个不同的项目**，本原型不是官方发行版。

欢迎以 Issues / Pull Requests 讨论“世界观、人物与事件因果”的非代笔式创作辅助工具。
