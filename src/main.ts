import { Neuron } from "./Neuron";
import { InputNeuron } from "./InputNeuron";
import { OutputNeuron } from "./OutputNeuron";
import { HiddenNeuron } from "./HiddenNeuron";

//Creating neurons
let I1 = new InputNeuron();
let I2 = new InputNeuron();
let H1 = new HiddenNeuron();
let H2 = new HiddenNeuron();
let O1 = new OutputNeuron();

let neurons: Neuron[] = [I1, I2, H1, H2, O1];

//Initializing neurons

I1.addLink(H1, 0.45);
I1.addLink(H2, 0.78);

I2.addLink(H1, -0.12);
I2.addLink(H2, 0.13);

H1.addLink(O1, 1.5);
H2.addLink(O1, -2.3);

//Evaluating
// O1.setCount(1);
// I1.setInput(1);
// I2.setInput(0);
// O1.setIdeal(1);

// I1.activation();
// I1.forwardPass();

// I2.activation();
// I2.forwardPass();

// H1.activation();
// H1.forwardPass();

// H2.activation();
// H2.forwardPass();

// O1.activation();
// O1.evalError();
// O1.evalDelta();

// O1.result();

// neurons.map(neuron => {
//     console.log(neuron);
//     console.log("===================");
// });

let sets = [
    {
        in1: 0,
        in2: 0,
        res: 0
    },
    {
        in1: 0,
        in2: 1,
        res: 1
    },
    {
        in1: 1,
        in2: 0,
        res: 1
    },
    {
        in1: 1,
        in2: 1,
        res: 0
    }
];

// O1.setCount(1);
// I1.setInput(sets[3].in1);
// I2.setInput(sets[3].in2);
// O1.setIdeal(sets[3].res);

// for (let i = 0; i < 1000; i++) {
//     I1.activation();
//     I1.forwardPass();

//     I2.activation();
//     I2.forwardPass();

//     H1.activation();
//     H1.forwardPass();

//     H2.activation();
//     H2.forwardPass();

//     O1.activation();
//     O1.evalError();
//     O1.evalDelta();

//     O1.result();

//     O1.backwardPass();
//     H1.backwardPass();
//     H2.backwardPass();
// }

sets.map(set => {
    O1.setCount(sets.length);
    I1.setInput(set.in1);
    I2.setInput(set.in2);
    O1.setIdeal(set.res);

    console.log(
        "\n============================================================================"
    );
    console.log(
        `TRAINING SET. INPUT1: ${set.in1}, INPUT2: ${set.in2}, IDEAL: ${
            set.res
        }`
    );
    console.log(
        "============================================================================\n"
    );

    for (let i = 0; i < 100000; i++) {
        I1.activation();
        I1.forwardPass();

        I2.activation();
        I2.forwardPass();

        H1.activation();
        H1.forwardPass();

        H2.activation();
        H2.forwardPass();

        O1.activation();
        O1.evalError();
        O1.evalDelta();

        O1.backwardPass();
        H1.backwardPass();
        H2.backwardPass();
    }
    O1.result();
});
