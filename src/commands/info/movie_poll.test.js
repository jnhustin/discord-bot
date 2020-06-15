import {
  stringifyArguments,
  createChoiceList,
  formatChoice,
  buildDescription,
} from './movie_poll';


describe ('stringifyArguments', () => {
  const testCases = [
    {
      name         :  'handle :emoji:=choice',
      input        :  [ '⚽=ball,', '👽=', 'Independence', 'day', ],
      assertOutput :  '⚽=ball, 👽= Independence day',
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  [ '⚽', '=ball,', '👽=', 'Independence', 'day', ],
      assertOutput :  '⚽ =ball, 👽= Independence day',
    },
    {
      name         :  'handle :emoji: = choice',
      input        :  [ '⚽', '=', 'ball,', '👽=', 'Independence', 'day', ],
      assertOutput :  '⚽ = ball, 👽= Independence day',
    },
    {
      name         :  'handle :emoji:= choice',
      input        :  [ '⚽=', 'ball,', '👽=', 'Independence', 'day', ],
      assertOutput :  '⚽= ball, 👽= Independence day',
    },
  ]

  testCases.forEach( (testCase) => {
    test(testCase.name, () => {
      const input        =  testCase.input;
      const assertOutput =  testCase.assertOutput;

      const testResult = stringifyArguments(input);
      expect(testResult).toEqual(assertOutput)
    })
  })
})


describe ('createChoiceList', () => {
  const testCases = [
    {
      name         :  'handle :emoji:=choice',
      input        :  '⚽=ball, 👽= Independence day',
      assertOutput :  [ [ '⚽', 'ball' ], [ '👽', 'Independence day' ], ]
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  '⚽ =ball, 👽= Independence day',
      assertOutput :  [ [ '⚽', 'ball' ], [ '👽', 'Independence day' ], ]
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  '⚽ = ball, 👽= Independence day',
      assertOutput :  [ [ '⚽', 'ball' ], [ '👽', 'Independence day' ], ]
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  '⚽= ball, 👽= Independence day',
      assertOutput :  [ [ '⚽', 'ball' ], [ '👽', 'Independence day' ], ]
    },
  ];

  testCases.forEach( (testCase) => {
    test(testCase.name, () => {
      const input = testCase.input;
      const assertOutput = testCase.assertOutput;

      const testResult = createChoiceList(input);
      expect(testResult).toEqual(assertOutput)
    })
  })
});


describe ('formatChoice', () => {
  const testCases = [
    {
      name         :  'handle :emoji:=choice',
      input        :  '👽= Independence day',
      assertOutput :  [ '👽', 'Independence day' ],
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  '👽= Independence day',
      assertOutput :  [ '👽', 'Independence day' ],
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  '👽= Independence day',
      assertOutput :  [ '👽', 'Independence day' ],
    },
    {
      name         :  'handle :emoji: =choice',
      input        :  '👽= Independence day',
      assertOutput :  [ '👽', 'Independence day' ],
    },
  ];

  testCases.forEach( (testCase) => {
    test(testCase.name, () => {
      const input = testCase.input;
      const assertOutput = testCase.assertOutput;

      const testResult = formatChoice(input);
      expect(testResult).toEqual(assertOutput)
    })
  })

});


describe ('buildDescription', () => {
  const testCases = [
    {
      name         :  'handles a link',
      trailers     :  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      choices      :  [ ['👽', 'Independence day'], ['🍍', 'Pineapple Express'] ],
      assertOutput :  'Trailers: [Youtube Link](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n👽 - Independence day\n🍍 - Pineapple Express\n',
    },
  ];

  testCases.forEach( (testCase) => {
    test(testCase.name, () => {
      const trailers     =  testCase.trailers;
      const choices      =  testCase.choices;
      const assertOutput =  testCase.assertOutput;

      const testResult = buildDescription(trailers, choices);
      expect(testResult).toEqual(assertOutput)
    })
  })

});


