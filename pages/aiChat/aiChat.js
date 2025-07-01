const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const deepseekConfig = require('../../config/deepseek.js');

Page({
  data: {
    messages: [],
    inputValue: '',
    isLoading: false,
    scrollTop: 0
  },

  onLoad: function (options) {
    // 添加欢迎消息
    this.setData({
      messages: [{
        id: Date.now(),
        type: 'ai',
        content: '您好！我是AI助手，有什么可以帮助您的吗？',
        timestamp: new Date().toLocaleTimeString()
      }]
    });
  },

  // 输入框内容变化
  onInputChange: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  // 发送消息
  sendMessage: function() {
    const content = this.data.inputValue.trim();
    if (!content) {
      wx.showToast({
        title: '请输入消息',
        icon: 'none'
      });
      return;
    }

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content,
      timestamp: new Date().toLocaleTimeString()
    };

    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: '',
      isLoading: true
    });

    // 滚动到底部
    this.scrollToBottom();

    // 调用DeepSeek API
    this.callDeepSeekAPI(content);
  },

  // 调用DeepSeek API
  callDeepSeekAPI: function(message) {
    const that = this;
    
    // 检查API Key配置
    if (!deepseekConfig.apiKey || deepseekConfig.apiKey === 'YOUR_DEEPSEEK_API_KEY') {
      that.handleAPIError(deepseekConfig.errorMessages.apiKey);
      return;
    }
    
    // 构建消息历史（取最近5轮对话）
    const recentMessages = this.data.messages.slice(-10).filter(msg => msg.type !== 'system');
    const conversationHistory = recentMessages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));
    
    // 添加系统提示和当前消息
    const messages = [
      {
        role: 'system',
        content: deepseekConfig.systemPrompt
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];
    
    wx.request({
      url: deepseekConfig.baseURL,
      method: 'POST',
      timeout: deepseekConfig.timeout,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekConfig.apiKey}`
      },
      data: {
        model: deepseekConfig.model,
        messages: messages,
        ...deepseekConfig.defaultParams
      },
      success: function(res) {
        console.log('DeepSeek API Response:', res);
        
        if (res.statusCode === 200 && res.data.choices && res.data.choices.length > 0) {
          const aiResponse = {
            id: Date.now(),
            type: 'ai',
            content: res.data.choices[0].message.content.trim(),
            timestamp: new Date().toLocaleTimeString()
          };
          
          that.setData({
            messages: [...that.data.messages, aiResponse],
            isLoading: false
          });
          
          that.scrollToBottom();
        } else {
          that.handleAPIError(deepseekConfig.errorMessages.server);
        }
      },
      fail: function(error) {
        console.error('DeepSeek API Error:', error);
        
        let errorMsg = deepseekConfig.errorMessages.unknown;
        if (error.errMsg && error.errMsg.includes('timeout')) {
          errorMsg = deepseekConfig.errorMessages.timeout;
        } else if (error.errMsg && error.errMsg.includes('network')) {
          errorMsg = deepseekConfig.errorMessages.network;
        }
        
        that.handleAPIError(errorMsg);
      }
    });
  },

  // 处理API错误
  handleAPIError: function(errorMsg) {
    const errorResponse = {
      id: Date.now(),
      type: 'ai',
      content: `抱歉，${errorMsg}。请稍后再试。`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    this.setData({
      messages: [...this.data.messages, errorResponse],
      isLoading: false
    });
    
    this.scrollToBottom();
  },

  // 滚动到底部
  scrollToBottom: function() {
    const that = this;
    setTimeout(() => {
      const query = wx.createSelectorQuery();
      query.select('.chat-container').boundingClientRect();
      query.exec(function(res) {
        if (res[0]) {
          that.setData({
            scrollTop: res[0].height
          });
        }
      });
    }, 100);
  },

  // 清空聊天记录
  clearChat: function() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有聊天记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            messages: [{
              id: Date.now(),
              type: 'ai',
              content: '您好！我是AI助手，有什么可以帮助您的吗？',
              timestamp: new Date().toLocaleTimeString()
            }]
          });
        }
      }
    });
  }
});