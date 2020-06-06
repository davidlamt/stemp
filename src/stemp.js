class stemp {
  /* eslint-disable */
  compile(template = '') {
    const compiled = new Function(
      'data',
      'let output;' + 
      'with (data) {' +
        'output = ' + JSON.stringify(template)
          .replace(/<%=(.+?)%>/g, '";\n' + 
            'if (typeof ($1) !== "undefined") {' +
              'output += $1;' +
            '}' +
            'output += "'
          )
          .replace(/<%(.+?)%>/g, '" + ($1) + "') +
      '}' + 
      'return output;'
    );

    return compiled;
  }
  /* eslint-enable */

  render(template = '', data = {}) {
    const compiled = this.compile(template);

    return compiled(data);
  }
}

export default stemp;
