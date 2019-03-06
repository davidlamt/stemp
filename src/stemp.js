class stemp {
  compile(template = '') {
    /* eslint-disable */
    const compiled = new Function(
      'data',
      'let output;' + 
      'with (data) {' +
        'output = ' + JSON.stringify(template)
          .replace(/<%=(.+?)%>/g, '";\noutput += $1 + "') + ';' +
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
