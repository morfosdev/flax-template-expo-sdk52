
// ---------- import Packs
import React from 'react';
import JSON5 from 'json5';
import { TextInput } from 'react-native';

// ---------- import Local Tools
import { getVarValue, getStlValues, pathSel } from '../project';
import { useData } from '../../..';

type Tprops = {
  pass: {
    propsArray: any;
    stylesArray: any;
    funcsArray: any;
    path: any;
    args: any;
  };
};

// IptTxtEdit - Entrada de Texto com prop value
export const IptTxtEdit = (props: Tprops) => {

  return <TextInput />;
};
