import Stemp from '../src/stemp';

describe('Simplified Template Engine', () => {
  describe('compile', () => {
    it('should not blow up if no template is provided', () => {
      const templater = new Stemp();
      const compiled = templater.compile();

      expect(typeof compiled).toEqual('function');
    });

    it('should return a function', () => {
      const template = 'Hello world, my name is <%=name%>!';

      const templater = new Stemp();
      const compiled = templater.compile(template);

      expect(typeof compiled).toEqual('function');
    });
  });

  describe('render', () => {
    it('should not blow up if no template is provided', () => {
      const templater = new Stemp();
      const rendered = templater.render();

      expect(rendered).toEqual('');
    });

    it('should still work if no data is provided for variables', () => {
      const template = 'Hello world, my name is <%=firstName%>!';
      const expected = 'Hello world, my name is !';

      const templater = new Stemp();
      const rendered = templater.render(template);

      expect(rendered).toEqual(expected);
    });

    it('should return a string', () => {
      const template = 'Hello!';

      const templater = new Stemp();
      const rendered = templater.render(template);

      expect(typeof rendered).toEqual('string');
      expect(rendered).toEqual(template);
    });

    describe('variables', () => {
      it('should interpolate a single variable', () => {
        const data = { name: 'David' };
        const template = 'Hello world, my name is <%=name%>!';
        const expected = `Hello world, my name is ${data.name}!`;

        const templater = new Stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });

      it('should interpolate multiple variables', () => {
        const data = {
          name: 'David',
          status: 'I am hungry',
        };
        const template = 'Hello world, my name is <%=name%> and <%=status%>!';
        const expected = `Hello world, my name is ${data.name} and ${data.status}!`;

        const templater = new Stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });

      it('should interpolate a nested object variable', () => {
        const data = {
          name: 'David',
          profile: {
            occupation: 'Human Being',
          },
        };
        const template = 'Hello world, my name is <%=name%> and I am a <%=profile.occupation%>!';
        const expected = `Hello world, my name is ${data.name} and I am a ${
          data.profile.occupation
        }!`;

        const templater = new Stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });
    });

    describe('expressions', () => {
      it('should evaluate a JavaScript arithmetic expression and interpolate the result', () => {
        const template = '5 + 5 = <%= 5 + 5 %>';
        const expected = '5 + 5 = 10';

        const templater = new Stemp();
        const rendered = templater.render(template);

        expect(rendered).toEqual(expected);
      });

      it('should evaluate a JavaScript ternary expression and interpolate the result', () => {
        const template = '5 + 5 = <%= 5 + 5 === 10 ? 10 : -1 %>';
        const expected = '5 + 5 = 10';

        const templater = new Stemp();
        const rendered = templater.render(template);

        expect(rendered).toEqual(expected);
      });

      it('should evaluate a JavaScript bitwise expression and interpolate the result', () => {
        const template = '0b01 | 0b10 = <%= 1 | 2 %>';
        const expected = '0b01 | 0b10 = 3';

        const templater = new Stemp();
        const rendered = templater.render(template);

        expect(rendered).toEqual(expected);
      });
    });

    describe('statements', () => {
      it('should evaluate a JavaScript if statement and interpolate the result', () => {
        // eslint-disable-next-line
        const template = 'Hello world, I am ' +
          '<% if (true) { %>' + 
            'AWESOME' +
          '<% } %>!';
        const expected = 'Hello world, I am AWESOME!';

        const templater = new Stemp();
        const rendered = templater.render(template);

        expect(rendered).toEqual(expected);
      });

      it('should evaluate a JavaScript for statement and interpolate the result', () => {
        // eslint-disable-next-line
        const template = 'I am hungry' +
          '<% for (let idx = 0; idx < 5; idx++) { %>' + 
            '!' +
          '<% } %>';
        const expected = 'I am hungry!!!!!';

        const templater = new Stemp();
        const rendered = templater.render(template);

        expect(rendered).toEqual(expected);
      });

      it('should evaluate a JavaScript for of statement and interpolate the result', () => {
        const data = {
          skills: ['eating', 'living', 'sleeping'],
        };

        /* eslint-disable */
        const template = 'My skills:\n' +
          '<% for (const skill of skills) { %>' + 
            '- <%= skill %>\n' +
          '<% } %>';
        const expected = 'My skills:\n' + 
          '- eating\n' + 
          '- living\n' + 
          '- sleeping\n';
        /* eslint-enable */

        const templater = new Stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });
    });
  });
});
