import {buildDrescription, stringifyArguments, getMovieChoices} from '../src/commands/info/movie_poll';


describe ('stringifyArguments', () => {
  const testCases = [
    {
      name: '',
      input: [
        '⚽',
        "=ball,",
        '👽=',
        'Independence',
        'day',
      ],
      assertOutput: "⚽ =ball, 👽= Independence day",
    }
  ]

  testCases.forEach( (testCase) => {
    test(testCase.name, () => {
      const input        =  testCase.input;
      const assertOutput =  testCase.assertOutput;

      const testResult =  stringifyArguments(input);
      expect(testResult).toEqual(assertOutput)
    })
  })
})


// describe ('getMovieChoices', () => {
//   const testCases = [
//     // handle :emoji:=choice
//     // handle :emoji: =choice
//     // handle :emoji: = choice
//     // handle :emoji:= choice
//     {
//       name: '',

//       assertOutput: [
//         [ '⚽', "she's the man" ],
//         [ '👽', 'Independence day' ],
//         [ '⭐', 'star wars: a new hope' ],
//         [ '⚔', 'Something else' ]
//       ]
//     }
//   ];

//   testCases.forEach( (testCase) => {
//     test(testCase.name, () => {
//       const input = testCase.input;
//       const assertOutput = testCase.assertOutput;

//       const testResult = getMovieChoices(input);
//       expect(testResult).toEqual(assertOutput)

//     })
//   })

// });


/*
senpai https://www.youtube.com/watch?v=dQw4w9WgXcQ
:soccer: =she's the man,
  :alien:= Independence day,
   :star:=star wars: a new hope


=====================

var args = [
  '⚽',     "=she's",
  'the',   'man,',
  '👽=',   'Independence',
  'day,',  '⭐=star',
  'wars:', 'a',
  'new',   'hope"'
]
choice:  [ '⚽', "she's the man" ]
choice:  [ '👽', 'Independence day' ]
choice:  [ '⭐', 'star wars: a new hope' ]

result
foo:  [
  [ '⚽', "she's the man" ],
  [ '👽', 'Independence day' ],
  [ '⭐', 'star wars: a new hope' ],
  [ '⚔', 'Something else' ]
]
*/
