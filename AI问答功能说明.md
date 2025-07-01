# AI问答功能说明

## 功能概述

本项目已成功集成了DeepSeek AI问答功能，用户可以通过页面右下角的浮动按钮进入AI问答界面，与AI助手进行智能对话。

## 功能特点

### 1. 用户界面
- **浮动入口**：在首页右下角添加了醒目的AI问答浮动按钮
- **聊天界面**：仿微信聊天界面设计，用户体验友好
- **消息气泡**：区分用户消息和AI回复，支持长文本显示
- **加载动画**：AI思考时显示动态加载效果
- **自动滚动**：新消息自动滚动到底部

### 2. 交互功能
- **实时对话**：支持连续对话，AI能理解上下文
- **快速发送**：支持回车键快速发送消息
- **清空聊天**：一键清空聊天记录
- **错误处理**：网络异常时显示友好的错误提示

### 3. 技术特性
- **DeepSeek集成**：使用DeepSeek最新的chat模型
- **上下文记忆**：保持最近10轮对话的上下文
- **智能配置**：可配置的API参数和错误处理
- **安全设计**：API密钥独立配置，避免硬编码

## 配置说明

### 1. 获取DeepSeek API Key

1. 访问 [DeepSeek官网](https://www.deepseek.com/)
2. 注册账号并登录
3. 进入API管理页面
4. 创建新的API Key
5. 复制生成的API Key

### 2. 配置API Key

打开 `config/deepseek.js` 文件，将 `YOUR_DEEPSEEK_API_KEY` 替换为您的实际API Key：

```javascript
const DeepSeekConfig = {
  // API Key - 请替换为您的实际API Key
  apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  // ... 其他配置
};
```

### 3. 自定义配置（可选）

您可以根据需要调整以下配置：

```javascript
// 模型参数
defaultParams: {
  max_tokens: 1000,      // 最大回复长度
  temperature: 0.7,      // 创造性程度 (0-1)
  top_p: 0.9,           // 核采样参数
  frequency_penalty: 0,  // 频率惩罚
  presence_penalty: 0    // 存在惩罚
},

// 系统提示词
systemPrompt: '你是一个友善、专业的AI助手...'
```

## 文件结构

```
pages/aiChat/
├── aiChat.js          # 页面逻辑
├── aiChat.wxml        # 页面结构
├── aiChat.wxss        # 页面样式
└── aiChat.json        # 页面配置

config/
└── deepseek.js        # DeepSeek API配置

static/images/
├── ai-avatar.svg      # AI头像
└── user-avatar.svg    # 用户头像
```

## 使用方法

### 1. 进入AI问答
- 在首页右下角点击"AI问答"浮动按钮
- 或直接导航到 `/pages/aiChat/aiChat` 页面

### 2. 开始对话
- 在输入框中输入您的问题
- 点击"发送"按钮或按回车键发送
- 等待AI回复（会显示加载动画）

### 3. 管理对话
- 点击右上角"清空"按钮可清空所有聊天记录
- 支持连续对话，AI会记住前面的对话内容

## 注意事项

### 1. API使用限制
- DeepSeek API有调用频率和配额限制
- 建议合理使用，避免频繁调用
- 超出限制时会显示相应错误提示

### 2. 网络要求
- 需要稳定的网络连接
- API调用超时时间设置为30秒
- 网络异常时会显示友好的错误提示

### 3. 隐私安全
- 对话内容会发送到DeepSeek服务器
- 请避免发送敏感个人信息
- API Key请妥善保管，不要泄露

## 故障排除

### 1. API Key错误
- 检查 `config/deepseek.js` 中的API Key是否正确
- 确认API Key是否有效且未过期

### 2. 网络连接问题
- 检查设备网络连接
- 确认能正常访问外网
- 尝试重新发送消息

### 3. 服务器错误
- DeepSeek服务器可能暂时不可用
- 稍后重试或联系DeepSeek技术支持

## 扩展功能

### 1. 可能的增强
- 添加语音输入功能
- 支持图片识别和分析
- 添加对话历史保存
- 支持多轮对话导出

### 2. 自定义开发
- 可以根据业务需求调整系统提示词
- 可以添加特定领域的知识库
- 可以集成其他AI服务提供商

## 技术支持

如果您在使用过程中遇到问题，可以：

1. 查看浏览器控制台的错误信息
2. 检查网络连接和API配置
3. 参考DeepSeek官方文档
4. 联系技术支持团队

---

**注意**：使用AI问答功能前，请确保已正确配置DeepSeek API Key，否则功能将无法正常使用。