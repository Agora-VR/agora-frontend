export const myForm = [
    {
        type: 'checkbox',
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
            options: [
              'Option 1',
              'Option 2',
              'Option 3',
            ],
        },
    },
    {
        type: 'long-text',
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
        },
    },
    {
        type: 'radio',
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
            options: [
              'Option 1',
              'Option 2',
              'Option 3',
            ],
        },
    },
    {
        type: 'radio',
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
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
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
        },
    },
    {
        type: 'likert',
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
        }
    }
];