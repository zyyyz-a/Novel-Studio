# 数据模型与 StoryLine Markdown 兼容手册

此文档描述 v0.1.0 原型，格式可能变化；目前 JSON **可以导出但不能在页面内恢复**。

## 内部草稿模型

~~~json
{
  "title": "示例小说",
  "characters": [
    {
      "name": "沈砚", "role": "太子",
      "personality": "谨慎",
      "internalMotivation": "调查父皇死因",
      "relations": [
        { "target": "沈珩", "category": "conflict", "type": "rival" }
      ]
    }
  ],
  "locations": [
    { "name": "京城", "locationType": "city", "notes": "国都" }
  ],
  "scenes": [
    {
      "id": "s1", "title": "皇帝遇刺",
      "act": 1, "chapter": 1, "sequence": 1,
      "pov": "沈砚", "storyDate": "初元十七年三月",
      "status": "draft", "characters": ["沈砚"],
      "location": "京城", "tags": ["宫廷线"],
      "conflict": "谁是幕后凶手？", "body": "",
      "setup_scenes": [], "payoff_scenes": []
    }
  ],
  "causes": [
    { "from": "s1", "to": "s2", "reason": "刺杀造成权力真空" }
  ]
}
~~~

causes 的 from/to 引用 scenes[].id；需要确保 id 唯一且关系两端存在。sequence 是阅读叙事顺序；chronologicalOrder（可选）用于世界事件发生顺序。两个场景前后发生不代表存在真正因果。

## 浏览器持久化

localStorage 键为 storyline-studio-lite-v1。浏览器清理数据、换浏览器或隐私窗口可能丢失草稿，不可只依赖本地浏览器存储。

## 备份 JSON

导出时增加 format = storyline-studio-prototype、version = 1、exportedAt（ISO 时间），其余字段保留。现阶段未开发 JSON 导入 UI，不得将备份导出宣传为完整可恢复流程。

## StoryLine Markdown 读取

示例（实际保存在 Scenes 文件夹的 .md 文件）：

~~~markdown
---
type: scene
title: "太子调查"
act: 1
chapter: 2
sequence: 2
pov: "[[沈砚]]"
characters:
  - "[[沈砚]]"
location: "[[京城]]"
status: outlined
---
调查开始。
~~~

可识别基础 type：storyline-project、scene、character、location / world。通过文件所在的 Scenes、Characters 等目录也能识别部分类型。

有限导入字段包括标题、幕章、顺序、视角、角色、地点、日期、状态、标签、冲突、场景正文、关系等。原型的简单 YAML 解析器不支持完整 YAML、任意嵌套结构、复杂 Codex 和媒体；遇到特殊项目必须保留源文件并手动校验。

## 后续兼容验收

- 使用标准 YAML 解析器和数据 schema；
- 保留未识别字段及原文件副本；
- 提供导入预览、冲突报告、回滚；
- 完整映射人物别名、场景引用和伏笔；
- 任何写回原文件的功能都必须在用户确认后执行。
