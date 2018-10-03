import * as fs from "fs-extra";
import process from "process";
import { BaseGeneratorArgument } from './types/baseGeneratorArgument';
import BaseGeneratorFactory from './factories/baseGeneratorFactory';
import { ObjectTypes } from './constants';

var appArguments : BaseGeneratorArgument = BaseGeneratorFactory(process.argv);

