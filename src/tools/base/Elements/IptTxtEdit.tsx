
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
    path: string[];
    args: any;
  };
};

export const IptTxtEdit = (props: Tprops) => {
  // ------- set IptTxt Inputs
  const { propsArray, stylesArray, funcsArray, path, args } = props.pass;

  return <TextInput  />;
};
