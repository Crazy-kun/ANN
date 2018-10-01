import { Neuron } from "./Neuron";

export class Synapse {
    constructor(inputNeuron: Neuron, outputNeuron: Neuron, weight?: number) {
        this.inNeuron = inputNeuron;
        this.outNeuron = outputNeuron;
        this.weight = weight || Math.random();
        this.gradient = 0;
        this.lastUpdate = 0;
        this.E = 0.7;
        this.A = 0.3;
    }

    public inNeuron: Neuron;
    public outNeuron: Neuron;
    public weight: number;
    protected gradient: number;
    protected lastUpdate: number;

    protected E: number;
    protected A: number;

    public setInput = (neuron: Neuron) => {
        this.inNeuron = neuron;
    };

    public setOutput = (neuron: Neuron) => {
        this.outNeuron = neuron;
    };

    public evalGradient = (value: number, delta: number) => {
        this.gradient = value * delta;
    };

    public evalUpdate = () => {
        this.lastUpdate = this.E * this.gradient + this.lastUpdate * this.A;
    };

    public updateWeight = () => {
        this.weight = this.weight + this.lastUpdate;
    };
}
