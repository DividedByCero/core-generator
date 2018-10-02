import { expect } from 'chai';
import BaseGeneratorFactory from './factories/baseGeneratorFactory';
import { BaseGeneratorArgument } from './types/baseGeneratorArgument';

describe('Tests', () =>{
    it('does return a BaseGeneratorArgument', () =>{
        const check : BaseGeneratorArgument = {
            directoryPath : './',
            name : 'some.cs',
            objectType : 'class',
            isHelp : false
        };

        const args : Array<String> = [
            './',
            'class',
            'some.cs',
        ];

        let obj = BaseGeneratorFactory(args);

        expect(obj).to.deep.equal(check);

    });
});