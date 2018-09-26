import sigmoid from "./sigmoid";

interface ISynapse {
  neuron: Neuron;
  weight: number;
  lastDelta: number;
}

class Neuron {
  constructor() {
    this.inputValue = 0;
    this.outputValue = 0;
    this.synapses = [];
  }

  protected inputValue: number;
  protected outputValue: number;
  protected synapses: ISynapse[];

  setInput = (value: number) => {
    this.inputValue += value;
  };

  addSynapse = (synapse: ISynapse) => {
    this.synapses.push(synapse);
  };

  next = () => {
    this.synapses.map((synapse: ISynapse) => {
      synapse.neuron.setInput(synapse.weight * this.outputValue);
    });
  };
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
  }

  protected error: number;
  protected ideal: number;

  evalError = () => {
    this.error = ((1 - this.outputValue) ^ 2) / 1;
  };

  setIdeal = (value: number) => {
    this.ideal = value;
  };

  activation = () => {
    this.outputValue = sigmoid(this.inputValue);
  };
}

class HiddenNeuron extends Neuron {
  activation = () => {
    this.outputValue = sigmoid(this.inputValue);
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
I1.addSynapse({ neuron: H1, weight: 0.3, lastDelta: 0 });
I1.addSynapse({ neuron: H2, weight: 0.4, lastDelta: 0 });
I1.activation();
I1.next();

I2.setInput(0.7);
I2.addSynapse({ neuron: H1, weight: 0.5, lastDelta: 0 });
I2.addSynapse({ neuron: H2, weight: 0.6, lastDelta: 0 });
I2.activation();
I2.next();

H1.addSynapse({ neuron: O1, weight: 0.1, lastDelta: 0 });
H2.addSynapse({ neuron: O1, weight: 0.2, lastDelta: 0 });

H1.activation();
H2.activation();

O1.setIdeal(1);
O1.activation();
O1.evalError();

neurons.map(neuron => {
  console.log(neuron);
  console.log("===================");
});
