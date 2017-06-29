import { initializeProperties } from './Utils';
import { MongoModelBase } from '../MongoModelBase';

/**
 * Represents the @MongoCollectionClass<TModel>() decorator.
 * @function
 */
export function MongoCollection<TModel extends MongoModelBase>(ctor: { new (): TModel }) {
  const name = ctor.name.substring(0, ctor.name.lastIndexOf('Model')) + 's';
  return initializeProperties('collectionName', name);
}
