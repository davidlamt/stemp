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
      it('should evaluate a JavaScript expression and interpolate the result', () => {
        const template = '5 + 5 = <% 5 + 5 %>';
        const expected = '5 + 5 = 10';

        const templater = new Stemp();
        const rendered = templater.render(template);

        expect(rendered).toEqual(expected);
      });

      xit('should evaluate a more complex JavaScript expression and interpolate the result', () => {
        const data = {
          isCool: true,
        };

        const template = 'Hello world, I am <%= if (isCool) { return "AWESOME" }%>!';
        const expected = 'Hello world, I am AWESOME!';

        const templater = new Stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });
    });
  });
});
