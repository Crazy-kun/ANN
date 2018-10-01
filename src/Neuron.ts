import { Synapse } from "./Synapse";

export class Neuron {
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

    addLink = (neuron: Neuron, weight?: number) => {
        let synapse = new Synapse(this, neuron, weight);
        this.addOutput(synapse);
        neuron.addInput(synapse);
    };

    forwardPass = () => {
        this.weight_delta_sum = 0;
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
            synapse.evalUpdate();
            synapse.updateWeight();
        });
    };

    evalDelta = (weight: number, delta: number) => {};
}
