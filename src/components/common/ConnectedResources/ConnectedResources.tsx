import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IConnectedAreaResource } from 'src/shared/interfaces/ConnectedAreaResource';
import { IConnectedAvailabilityResource } from 'src/shared/interfaces/ConnectedAvailabilityResource';

import { ConnectedResource } from './components/ConnectedResource';

interface IConnectedResourcesProps<T extends IConnectedAvailabilityResource | IConnectedAreaResource> {
  connectedResources: T[];
  getResourceName: (resource: T) => string;
  onChange: (connectedResources: T[]) => void;
}

const ConnectedResources = <T extends IConnectedAvailabilityResource | IConnectedAreaResource>({
  connectedResources,
  getResourceName,
  onChange,
}: IConnectedResourcesProps<T>) => {
  const orderedConnectedResources = Array.from(connectedResources).sort((a, b) => a.order - b.order);

  const handleRemove = (removeIndex: number) => {
    const result = Array.from(orderedConnectedResources);
    result.splice(removeIndex, 1);

    const orderedResult = result.map((el, index) => ({ ...el, order: index }));

    onChange(orderedResult);
  };

  const handleMoveRow = (dragIndex: number, hoverIndex: number) => {
    const result = Array.from(orderedConnectedResources);
    const [removed] = result.splice(dragIndex, 1);
    result.splice(hoverIndex, 0, removed);

    const orderedResult = result.map((el, index) => ({ ...el, order: index }));

    onChange(orderedResult);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {orderedConnectedResources.map((connectedResource, index) => (
        <ConnectedResource
          key={connectedResource.order}
          index={index}
          name={getResourceName(connectedResource)}
          moveRow={handleMoveRow}
          onRemove={handleRemove}
        />
      ))}
    </DndProvider>
  );
};

export default ConnectedResources;
