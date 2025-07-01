// DeepSeek API 配置
const DeepSeekConfig = {
  // API基础URL
  baseURL: 'https://api.deepseek.com/v1/chat/completions',
  
  // API Key - 请替换为您的实际API Key
  apiKey: 'sk-0e22f782f0de4a0d98cd6baae7afc536',
  
  // 模型配置
  model: 'deepseek-chat',
  
  // 默认参数
  defaultParams: {
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0
  },
  
  // 系统提示词
  systemPrompt: '你是一个友善、专业的AI助手。请用简洁明了、有帮助的方式回答用户的问题。如果用户询问购物相关问题，可以结合电商场景给出建议。',
  
  // 请求超时时间（毫秒）
  timeout: 30000,
  
  // 错误消息配置
  errorMessages: {
    network: '网络连接失败，请检查网络后重试',
    timeout: '请求超时，请稍后再试',
    apiKey: 'API密钥配置错误，请联系管理员',
    quota: 'API调用次数已达上限，请稍后再试',
    server: '服务器暂时不可用，请稍后再试',
    unknown: '发生未知错误，请稍后再试'
  }
};

module.exports = DeepSeekConfig;