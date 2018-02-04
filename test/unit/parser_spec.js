const Parser = require('../../source/index');

describe('Parser', () => {
  it('should return an array', async () => {
    const stream = {
      PassThrough: td.function(),
      end: td.function()
    }; 

    const readline = {
      createInterface: td.function(),
      on: td.function()
    };

    td.when(stream.PassThrough()).thenReturn(stream);
    td.when(readline.createInterface({ input: stream })).thenReturn(readline);

    td.when(stream.end({})).thenReturn({});

    td.when(readline.on('line', td.callback('1,1,2,3'))).thenReturn(readline);
    td.when(readline.on('close', td.callback())).thenResolve([[1,2,3,4]]);

    const parser = new Parser(stream, readline);

    const fakeBuffer = {};
    const resolved = await parser.exec(fakeBuffer);

    expect(resolved).to.be.an('array');
  });

  it('should set parseAlgorithm', async () => {
    const stream = {
      PassThrough: td.function(),
      end: td.function()
    }; 

    const readline = {
      createInterface: td.function(),
      on: td.function()
    };

    const parser = new Parser(stream, readline);
    parser.setParseAlgorithm(() => {});

    expect(parser.parseAlgorithm).to.not.be.null;
  });

  it('should call by parseAlgorithm', async () => {
    const stream = {
      PassThrough: td.function(),
      end: td.function()
    }; 

    const readline = {
      createInterface: td.function(),
      on: td.function()
    };

    td.when(stream.PassThrough()).thenReturn(stream);
    td.when(readline.createInterface({ input: stream })).thenReturn(readline);

    td.when(stream.end({})).thenReturn({});

    td.when(readline.on('line', td.callback('1,1,2,3'))).thenReturn(readline);
    td.when(readline.on('close', td.callback())).thenResolve([[1,1,2,3]]);

    const parser = new Parser(stream, readline);

    const parseAlgorithm = td.function();
    parser.setParseAlgorithm(parseAlgorithm);

    const fakeBuffer = {};
    const resolved = await parser.exec(fakeBuffer);

    td.verify(parseAlgorithm(['1','1','2','3']));
  });
});
