import Checkbox from './_components/Checkbox.svelte';
import Radio from './_components/Radio.svelte';
import Slider from './_components/Slider.svelte';
import Textarea from './_components/Textarea.svelte';

export const myForm = [
    {
        type: Checkbox,
        props: {
            prompt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere placeat
ipsum eos, iusto eius accusantium neque a nihil, expedita itaque suscipit
veritatis nobis similique odit nisi, delectus tenetur dolorum consectetur!`,
            options: [
              'Option 1',
              'Option 2',
              'Option 3',
            ],
        },
    },
    {
        type: Textarea,
        props: {
            prompt: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
        },
    },
    {
        type: Radio,
        props: {
            prompt: `Facere placeat ipsum eos, iusto eius accusantium neque a nihil, expedita
itaque suscipit veritatis nobis similique odit nisi, delectus tenetur
dolorum consectetur!`,
            options: [
              'Option 1',
              'Option 2',
              'Option 3',
            ],
            other: true,
        },
    },
    {
        type: Slider,
        props: {
            prompt: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere placeat
ipsum eos, iusto eius accusantium neque a nihil, expedita itaque suscipit
veritatis nobis similique odit nisi, delectus tenetur dolorum consectetur!`,
        },
    },
];