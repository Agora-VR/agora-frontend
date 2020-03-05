export const myForm = {
  title: 'Sample Form',
  scores: {
    'total_test': [0, 1],
  },
  questions: [
    {
      type: 'likert-radio',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
      props: {
        type: 'integer',
        defaultLabel: 'neutral',
      }
    },
    {
      type: 'likert',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    },
    {
      type: 'likert',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
      props: {
        type: 'string',
        labels: [
          'STRONGLY disagree',
          'disagree',
          'neutral',
          'agree',
          'STRONGLY agree',
        ],
      }
    },
    {
      type: 'checkbox',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
      props: {
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
        ],
      },
    },
    {
      type: 'long-text',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    },
    {
      type: 'radio',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
      props: {
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
        ],
      },
    },
    {
      type: 'radio',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
      props: {
        options: [
          'Option 1',
          'Option 2',
          'Option 3',
        ],
        other: true,
      },
    },
    {
      type: 'slider',
      prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
    },
  ],
};