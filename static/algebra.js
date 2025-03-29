(function(exports) {
  "use strict";

  // 一个简单的代数表达式解析器和处理器
  function Expression(expressionString) {
    this.expressionString = expressionString;
    this.terms = [];
    
    // 简单的解析逻辑
    const parts = expressionString.split(/(\+|-)/);
    let sign = '+';
    
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '+' || parts[i] === '-') {
        sign = parts[i];
      } else if (parts[i].trim()) {
        this.terms.push({
          coefficient: sign === '+' ? 1 : -1,
          term: parts[i].trim()
        });
      }
    }
  }
  
  // 将表达式转换为LaTeX
  Expression.prototype.toTex = function() {
    if (this.terms.length === 0) {
      return "0";
    }
    
    return this.expressionString
      .replace(/\*/g, '\\cdot ')
      .replace(/\//g, '\\frac{')
      .replace(/\)\(/g, '}{')
      .replace(/\(/g, '{')
      .replace(/\)/g, '}');
  };
  
  // 解析表达式
  exports.parse = function(expressionString) {
    return new Expression(expressionString);
  };
  
  // 暴露代数对象
  exports.algebra = {
    parse: exports.parse
  };
  
})(typeof exports === 'undefined' ? this.algebra = {} : exports); 