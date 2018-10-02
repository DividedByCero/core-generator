import { ObjectTypes } from '../constants';
import { BaseGeneratorArgument } from '../types/baseGeneratorArgument';

export default function BaseGeneratorFactory(args : Array<String>) {
    let obj : BaseGeneratorArgument = {
        objectType : args[1],
        name : args[2],
        isHelp : false,
        directoryPath : args[0]
    }

    if(obj.objectType == null) obj.isHelp = true; 

    return obj;

}