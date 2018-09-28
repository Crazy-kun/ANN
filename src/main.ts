import sigmoid from "./sigmoid";

class Synapse {
    constructor(inputNeuron: Neuron, outputNeuron: Neuron) {
        this.inNeuron = inputNeuron;
        this.outNeuron = outputNeuron;
        this.weight = Math.random();
        this.gradient = 0;
    }

    public inNeuron: Neuron;
    public outNeuron: Neuron;
    public weight: number;
    protected gradient: number;

    public setInput = (neuron: Neuron) => {
        this.inNeuron = neuron;
    };

    public setOutput = (neuron: Neuron) => {
        this.outNeuron = neuron;
    };

    public evalGradient = (value: number, delta: number) => {
        this.gradient = value * delta;
    };
}

class Neuron {
    constructor() {
        this.inputValue = 0;
        this.outputValue = 0;
        this.inputSynapses = [];
        this.outputSynapses = [];
        this.delta = 0;
        this.weight_delta_sum = 0;
    }

    protected inputValue: number;
    protected outputValue: number;
    protected inputSynapses: Synapse[];
    protected outputSynapses: Synapse[];
    protected delta: number;
    protected weight_delta_sum: number;

    setInput = (value: number) => {
        this.inputValue += value;
    };

    public addInput = (synapse: Synapse) => {
        this.inputSynapses.push(synapse);
    };

    private addOutput = (synapse: Synapse) => {
        this.outputSynapses.push(synapse);
    };

    addLink = (neuron: Neuron) => {
        let synapse = new Synapse(this, neuron);
        this.addOutput(synapse);
        neuron.addInput(synapse);
    };

    forwardPass = () => {
        this.outputSynapses.map((synapse: Synapse) => {
            if (synapse) {
                synapse.outNeuron.setInput(synapse.weight * this.outputValue);
            }
        });
    };

    backwardPass = () => {
        this.inputSynapses.map((synapse: Synapse) => {
            synapse.inNeuron.evalDelta(synapse.weight, this.delta);
            synapse.evalGradient(synapse.inNeuron.outputValue, this.delta);
        });
    };

    evalDelta = (weight: number, delta: number) => {};
}

class InputNeuron extends Neuron {
    activation = () => {
        this.outputValue = this.inputValue;
    };
}

class OutputNeuron extends Neuron {
    constructor() {
        super();
        this.error = 0;
        this.ideal = 0;
        this._setCount = 0;
    }

    protected error: number;
    protected ideal: number;
    protected _setCount: number;

    evalError = () => {
        this.error =
            Math.pow(this.ideal - this.outputValue, 2) / this._setCount;
    };

    evalDelta = () => {
        this.delta =
            (this.ideal - this.outputValue) *
            ((1 - this.outputValue) * this.outputValue);
    };

    setIdeal = (value: number) => {
        this.ideal = value;
    };

    setCount = (count: number) => {
        this._setCount = count;
    };

    activation = () => {
        this.outputValue = sigmoid(this.inputValue);
    };

    result = () => {
        console.log("RESULT: ", this.outputValue);
        console.log("ERROR: ", this.error);
    };
}

class HiddenNeuron extends Neuron {
    activation = () => {
        this.outputValue = sigmoid(this.inputValue);
    };

    evalDelta = (weight: number, delta: number) => {
        this.weight_delta_sum += weight * delta;
        this.delta =
            (1 - this.outputValue) * this.outputValue * this.weight_delta_sum;
    };
}

//Creating neurons
let I1 = new InputNeuron();
let I2 = new InputNeuron();
let H1 = new HiddenNeuron();
let H2 = new HiddenNeuron();
let O1 = new OutputNeuron();

let neurons: Neuron[] = [I1, I2, H1, H2, O1];

//Initializing neurons
I1.setInput(1.2);
I1.addLink(H1);
I1.addLink(H2);
I1.activation();
I1.forwardPass();

I2.setInput(0.7);
I2.addLink(H1);
I2.addLink(H2);
I2.activation();
I2.forwardPass();

H1.addLink(O1);
H2.addLink(O1);

H1.activation();
H1.forwardPass();
H2.activation();
H2.forwardPass();

O1.setIdeal(1);
O1.setCount(1);
O1.activation();
O1.evalError();

neurons.map(neuron => {
    console.log(neuron);
    console.log("===================");
});

O1.result();
