import React, { useState, useCallback } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {} // Заглушка для будущего расширения

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

// Компонент редактора параметров
const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues || []);

  // Обработчик изменения поля
  const handleInputChange = useCallback((paramId: number, value: string) => {
    setParamValues((prev) => {
      const updated = prev.map((pv) =>
        pv.paramId === paramId ? { ...pv, value } : pv
      );
      return updated.some((pv) => pv.paramId === paramId)
        ? updated
        : [...updated, { paramId, value }];
    });
  }, []);

  // Получение актуальной модели
  const getModel = (): Model => ({
    paramValues,
    colors: model.colors || [],
  });

  return (
    <div>
      {params.map((param) => {
        const currentValue =
          paramValues.find((pv) => pv.paramId === param.id)?.value || '';

        return (
          <div key={param.id} style={{ marginBottom: '10px' }}>
            <label>{param.name}:</label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => handleInputChange(param.id, e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </div>
        );
      })}
      <button
        onClick={() => console.log('Сохраненная модель: ', getModel())}
        style={{ marginTop: '20px' }}
      >
        Сохранить модель
      </button>
    </div>
  );
};

// Пример использования
const ExampleUsage: React.FC = () => {
  const initialParams: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
  ];

  const initialModel: Model = {
    paramValues: [
      { paramId: 1, value: 'повседневное' },
      { paramId: 2, value: 'макси' },
    ],
    colors: [],
  };

  return (
    <div>
      <h1>Редактор параметров</h1>
      <ParamEditor params={initialParams} model={initialModel} />
    </div>
  );
};

export default ExampleUsage;
