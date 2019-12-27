class stemp {
  compile(template = '') {
    /* eslint-disable */
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
          ) + ';' +
      '}' + 
      'return output;'
    );
    /* eslint-enable */

    return compiled;
  }

  render(template = '', data = {}) {
    const compiled = this.compile(template);

    return compiled(data);
  }
}

export default stemp;
