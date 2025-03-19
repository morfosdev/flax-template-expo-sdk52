
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

  // --------------------------
  // ----------- set COND VALUE
  // --------------------------
  const joinedPath = path.join('.'); // Corrigido para usar ponto como delimitador
  const splitedPathArr = joinedPath.split('.');
  const idxToAdd = splitedPathArr.length - 2;

  // Cria cópias separadas para evitar conflitos com splice
  const splitedPathArrEdit = [...splitedPathArr];
  splitedPathArrEdit.splice(idxToAdd, 0, 'editData');
  const editPath = splitedPathArrEdit.join('.');

  const splitedPathArrNew = [...splitedPathArr];
  splitedPathArrNew.splice(idxToAdd, 0, 'iptsChanges');
  const newPath = splitedPathArrNew.join('.');

  // ------- set Data to Watch
  const [sttText, setText] = React.useState('');

  // Observar os dados nas paths separadas
  const editData = useData(ct => pathSel(ct, splitedPathArrEdit));
  const newData = useData(ct => pathSel(ct, splitedPathArrNew));

  // Efeito colateral ao alterar editData
  React.useEffect(() => {
    if (!editData) {
      // Se editData não existe, poderia processar algo com newPath
      // Exemplo: console.log('editData vazio, usar newPath:', newPath);
    }
  }, [editData]);

  // ---------- Functions
  const getTxt = async (val: string) => {
    for (const currFunc of funcsArray) {
      await currFunc(val, args);
    }
  };

  // ---------- Styles
  const stlsUser = getStlValues(stylesArray);

  // ------- set User Element Properties (If Exists)
  const userElProps: any = {};
  for (let strObj of propsArray) {
    if (!strObj || typeof strObj !== 'string') continue;

    const parsedObject = JSON5.parse(strObj);

    for (const keyProp in parsedObject) {
      const valueProp = parsedObject[keyProp];
      const [hasVar, varValue] = getVarValue(valueProp);
      userElProps[keyProp] = hasVar ? varValue : valueProp;
    }
  }

  // Combina todas as props do TextInput
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
