
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

// IptTxtEdit - Entrada de Texto com prop value
export const IptTxtEdit = (props: Tprops) => {
  // ------- set IptTxt Inputs
  const { propsArray, stylesArray, funcsArray, path, args } = props.pass;

  const fxFunction = () => {
    if (editData) {
    }
    if (!editData) splitedPathArr.splice(idxToAdd, 0, 'iptsChanges');
  };

  // --------------------------
  // ----------- set COND VALUE
  // --------------------------
  console.log({ path });
  const joinedPath = path.join('');
  console.log({ joinedPath });
  const splitedPathArr = joinedPath.split('.');
  console.log({ splitedPathArr });
  const idxToAdd = splitedPathArr.length - 2;
  const editPath = splitedPathArr.splice(idxToAdd, 0, 'editData').join('.');
  const newPath = splitedPathArr.splice(idxToAdd, 0, 'iptsChanges').join('.');

  // ------- set Data to Watch
  const [sttText, setText] = React.useState('');
  const newData = useData(ct => pathSel(ct, splitedPathArr));
  const editData = useData(ct => pathSel(ct, splitedPathArr));
  React.useEffect(fxFunction, [editData]);

  // ---------- Functions
  const getTxt = async (val: string) => {
    for (const currFunc of funcsArray) await currFunc(val, args);
  };

  // ---------- Styles
  const stlsUser = getStlValues(stylesArray);

  // ------- set User Element Properties (If Exists)
  const userElProps: any = {};
  for (let strObj of propsArray) {
    if (!strObj) continue;
    if (!props) continue;
    if (typeof strObj !== 'string') continue;

    const parsedObject = JSON5.parse(strObj);

    for (const keyProp in parsedObject) {
      const valueProp = parsedObject[keyProp];

      const [hasVar, varValue] = getVarValue(valueProp);

      if (hasVar) userElProps[keyProp] = varValue;
      if (!hasVar) userElProps[keyProp] = valueProp;
    }
  }

  const allProps = {
    style: stlsUser,
    onChangeText: getTxt,
    value: sttText,
    placeholderTextColor: '#ccc',
    placeholder: 'Escreva...',

    ...userElProps,
  };

  return <TextInput {...allProps} />;
};
