import stemp from '../src/stemp';

describe('Simplified Template Engine', () => {
  describe('compile', () => {
    it('should produce a function', () => {
      const template = 'Hello world, my name is <%=name%>!';

      const templater = new stemp();
      const compiled = templater.compile(template);

      expect(typeof compiled).toEqual('function');
    });
  });

  describe('render', () => {
    describe('variables', () => {
      it('should interpolate a template with data', () => {
        const data = { name: 'David' };
        const template = 'Hello world, my name is <%=name%>!';
        const expected = `Hello world, my name is ${data.name}!`;

        const templater = new stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });

      it('should interpolate a template with multiple data variables', () => {
        const data = {
          name: 'David',
          status: 'I am hungry',
        };
        const template = 'Hello world, my name is <%=name%> and <%=status%>!';
        const expected = `Hello world, my name is ${data.name} and ${data.status}!`;

        const templater = new stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });

      it('should interpolate a template with nested data', () => {
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

        const templater = new stemp();
        const rendered = templater.render(template, data);

        expect(rendered).toEqual(expected);
      });
    });
  });
});
